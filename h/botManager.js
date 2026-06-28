const path = require("path");
const fs = require("fs-extra");


const {
    readJSON
} = require("../utils/helper");


const logger = require("../utils/logger");

const {
    createDatabase
} = require("./database");


const fca =
    require("@tas33n/ws3-fca");






class BotManager {



    constructor(){


        this.bots =
            new Map();


    }







    async startBot(
        botID,
        botFolder
    ){


        if(
            this.bots.has(botID)
        ){

            logger.warn(
                `Bot already running ${botID}`
            );

            return;

        }






        let configPath =
            path.join(
                botFolder,
                "config.json"
            );



        let appstatePath =
            path.join(
                botFolder,
                "appstate.json"
            );




        let botConfig =
            readJSON(
                configPath,
                {}
            );





        if(
            !fs.existsSync(
                appstatePath
            )
        ){

            logger.warn(
                `Missing appstate for ${botID}`
            );

            return;

        }






        let appState =
            readJSON(
                appstatePath,
                []
            );





        let database =
            createDatabase(
                botID
            );






        let instance = {

            id: botID,

            path: botFolder,

            config: botConfig,

            database,

            api: null,

            status:"starting"

        };






        this.bots.set(
            botID,
            instance
        );








        fca.login(
            {
                appState
            },

            {
                selfListen:false,

                listenEvents:true,

                autoMarkRead:false

            },

            (
                err,
                api
            ) => {


                if(err){


                    instance.status =
                        "error";


                    logger.error(
                        err,
                        botID
                    );


                    return;

                }






                instance.api =
                    api;


                instance.status =
                    "online";





                logger.success(
                    "Bot connected",
                    botID
                );




                this.attachEvents(
                    instance
                );



            }

        );



    }









    attachEvents(
        bot
    ){



        bot.api.listenMqtt(
            async(
                err,
                event
            ) => {



                if(err){

                    logger.error(
                        err,
                        bot.id
                    );

                    return;

                }






                for(
                    let [
                        name,
                        handler
                    ]
                    of global.EVENTS
                ){



                    try {


                        await handler.run(
                            {
                                api:bot.api,

                                event,

                                bot,

                                config:bot.config,

                                database:bot.database

                            }
                        );


                    }
                    catch(error){


                        logger.error(
                            error,
                            bot.id
                        );


                    }


                }






                this.handleCommands(
                    bot,
                    event
                );



            }
        );



    }









    async handleCommands(
        bot,
        event
    ){



        if(
            !event.body
        )
            return;





        let prefix =
            bot.config.prefix || "";





        if(
            prefix &&
            !event.body.startsWith(
                prefix
            )
        )
            return;





        let text =
            prefix
            ?
            event.body.slice(
                prefix.length
            )
            :
            event.body;






        let args =
            text
            .trim()
            .split(/\s+/);




        let name =
            args.shift()
            .toLowerCase();





        let command =
            global.COMMANDS.get(
                name
            );





        if(
            !command
        )
            return;






        try {



            await command.run(
                {

                    api:bot.api,

                    event,

                    args,

                    bot,

                    config:bot.config,

                    database:bot.database,

                    commands:global.COMMANDS,

                    utils:require("../utils/helper")

                }
            );



        }
        catch(err){


            logger.error(
                err,
                bot.id
            );


        }



    }









    async startAll(){



        let databaseFolder =
            path.join(
                process.cwd(),
                "database"
            );




        fs.ensureDirSync(
            databaseFolder
        );




        let folders =
            fs.readdirSync(
                databaseFolder
            );





        for(
            let folder of folders
        ){



            let full =
                path.join(
                    databaseFolder,
                    folder
                );



            if(
                !fs.statSync(full)
                .isDirectory()
            )
                continue;





            await this.startBot(
                folder,
                full
            );



        }


    }









    stop(
        botID
    ){


        let bot =
            this.bots.get(
                botID
            );


        if(!bot)
            return false;



        bot.status =
            "stopped";



        this.bots.delete(
            botID
        );



        return true;

    }






}






module.exports =
    new BotManager();
