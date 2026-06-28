const fs = require("fs");
const path = require("path");

const { login } = require("@tas33n/ws3-fca");
const Loader = require("./Loader");


class BotManager {



    constructor(state){

        this.state = state;

        this.bots = new Map();

        this.dir =
            path.join(
                process.cwd(),
                "bots"
            );


        if(!fs.existsSync(this.dir)){

            fs.mkdirSync(
                this.dir,
                {
                    recursive:true
                }
            );

        }

    }







    loadSaved(){


        const files =
            fs.readdirSync(this.dir)
            .filter(
                x=>x.endsWith(".json")
            );



        for(
            const file of files
        ){


            const data =
                JSON.parse(
                    fs.readFileSync(
                        path.join(
                            this.dir,
                            file
                        )
                    )
                );



            this.start(data);


        }


    }









    start(data){



        login(

            {
                appState:
                data.appState
            },


            {

                selfListen:false,

                listenEvents:true,

                autoReconnect:true,

                online:true

            },


            (err,api)=>{


                if(err){

                    return this.state.logger.error(err);

                }





                const id =
                    api.getCurrentUserID();





                const bot = {


                    id:String(id),

                    api,


                    prefix:
                    data.prefix || "",


                    admin:
                    data.admin,


                    file:
                    `${data.admin}|${data.prefix}.json`


                };




                this.bots.set(
                    bot.id,
                    bot
                );





                this.state.logger.success(
                    `Bot online ${bot.id}`
                );







                api.listenMqtt(

                    async(
                        err,event
                    )=>{



                        if(err)
                            return;



                        try{


                            await Loader.dispatch(

                                {
                                    ...this.state,

                                    api,


                                    bot

                                },

                                event,

                                true

                            );



                        }catch(e){

                            this.state.logger.error(e);

                        }



                    }

                );





            }

        );



    }










    add(
        admin,
        prefix,
        appState
    ){


        const name =
            `${admin}|${prefix}.json`;



        fs.writeFileSync(

            path.join(
                this.dir,
                name
            ),

            JSON.stringify(

                {

                    admin,

                    prefix,

                    appState

                },

                null,
                4

            )

        );


        return name;


    }









    remove(id){



        const bot =
            this.bots.get(
                String(id)
            );



        if(bot){


            try{


                bot.api.logout();


            }catch{}



            this.bots.delete(
                String(id)
            );

        }






        const files =
            fs.readdirSync(
                this.dir
            );



        for(
            const file of files
        ){


            if(
                file.startsWith(
                    id
                )
            ){


                fs.unlinkSync(
                    path.join(
                        this.dir,
                        file
                    )
                );


            }


        }



        return true;


    }



}


module.exports = BotManager;
