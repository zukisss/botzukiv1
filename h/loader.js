const path = require("path");
const fs = require("fs-extra");
const chokidar = require("chokidar");


const {
    getFiles
} = require("../utils/helper");


const logger = require("../utils/logger");




class Loader {



    constructor(){


        this.commands =
            global.COMMANDS;


        this.events =
            global.EVENTS;


        this.handlers =
            global.HANDLERS;


    }








    async loadFolder(
        folder,
        type
    ){


        if(
            !fs.existsSync(folder)
        ){

            fs.ensureDirSync(folder);

        }



        let files =
            getFiles(folder);



        for(
            let file of files
        ){

            await this.loadFile(
                file,
                type
            );

        }


    }









    async loadFile(
        file,
        type
    ){


        try {



            delete require.cache[
                require.resolve(file)
            ];



            let module =
                require(file);




            if(type === "command"){


                if(
                    !module.meta ||
                    !module.run
                )
                    return;



                this.commands.set(
                    module.meta.name
                    .toLowerCase(),
                    module
                );


            }






            if(type === "event"){


                if(
                    !module.name ||
                    !module.run
                )
                    return;



                this.events.set(
                    module.name,
                    module
                );


            }







            if(type === "handler"){



                let name =
                    path.basename(
                        file,
                        ".js"
                    );


                this.handlers.set(
                    name,
                    module
                );


            }





            logger.success(
                `Loaded ${type}: ${path.basename(file)}`
            );



        }
        catch(err){


            logger.error(
                err
            );


        }


    }









    removeFile(
        file,
        type
    ){


        let name;



        if(
            type === "command"
        ){

            let command =
                require(file);


            name =
                command.meta?.name;


            this.commands.delete(
                name
            );

        }





        if(
            type === "event"
        ){

            let event =
                require(file);


            this.events.delete(
                event.name
            );

        }





        if(
            type === "handler"
        ){

            name =
                path.basename(
                    file,
                    ".js"
                );


            this.handlers.delete(
                name
            );

        }



        logger.warn(
            `Removed ${type}: ${file}`
        );

    }









    watch(
        folder,
        type
    ){


        let watcher =
            chokidar.watch(
                folder,
                {
                    ignoreInitial:true
                }
            );





        watcher.on(
            "add",
            file =>
                this.loadFile(
                    file,
                    type
                )
        );



        watcher.on(
            "change",
            file =>
                this.loadFile(
                    file,
                    type
                )
        );



        watcher.on(
            "unlink",
            file =>
                this.removeFile(
                    file,
                    type
                )
        );



        logger.info(
            `Watching ${folder}`
        );


    }





    async initialize(){



        await this.loadFolder(
            "./c",
            "command"
        );


        await this.loadFolder(
            "./e",
            "event"
        );


        await this.loadFolder(
            "./h",
            "handler"
        );




        this.watch(
            "./c",
            "command"
        );


        this.watch(
            "./e",
            "event"
        );


        this.watch(
            "./h",
            "handler"
        );


    }



}




module.exports =
    new Loader();
