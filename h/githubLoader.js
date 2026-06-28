const path = require("path");
const fs = require("fs-extra");
const simpleGit = require("simple-git");


const config = require("../config.json");

const logger = require("../utils/logger");

const {
    getFiles
} = require("../utils/helper");





class GithubLoader {



    constructor(){


        this.cache =
            path.join(
                process.cwd(),
                "cache",
                "github"
            );


        fs.ensureDirSync(
            this.cache
        );


    }








    async cloneRepo(
        repo,
        index
    ){


        let folder =
            path.join(
                this.cache,
                String(index)
            );



        if(
            fs.existsSync(
                folder
            )
        ){

            return folder;

        }




        logger.info(
            `Cloning external repository ${index}`
        );



        await simpleGit()
            .clone(
                repo.url,
                folder,
                [
                    "--branch",
                    repo.branch || "main"
                ]
            );



        return folder;

    }









    async updateRepo(
        folder
    ){


        try {


            await simpleGit(
                folder
            )
            .pull();



            logger.success(
                "Github repository updated"
            );



        }
        catch(err){


            logger.warn(
                "Github update failed"
            );


        }


    }









    loadCommands(
        folder
    ){



        let commandsFolder =
            path.join(
                folder,
                config.github.commandsFolder
            );



        if(
            !fs.existsSync(
                commandsFolder
            )
        )
            return [];



        return getFiles(
            commandsFolder
        );


    }









    loadEvents(
        folder
    ){


        let eventsFolder =
            path.join(
                folder,
                config.github.eventsFolder
            );



        if(
            !fs.existsSync(
                eventsFolder
            )
        )
            return [];



        return getFiles(
            eventsFolder
        );


    }









    async load(){



        if(
            !config.externalGitRepo ||
            !config.externalGitRepo.length
        ){


            logger.info(
                "No external repositories configured"
            );


            return {
                commands:[],
                events:[]
            };


        }






        let result = {

            commands:[],

            events:[]

        };





        for(
            let i = 0;
            i < config.externalGitRepo.length;
            i++
        ){



            let repo =
                config.externalGitRepo[i];



            if(
                !repo.url
            )
                continue;




            let folder =
                await this.cloneRepo(
                    repo,
                    i
                );



            if(
                config.github.autoUpdate
            ){

                await this.updateRepo(
                    folder
                );

            }




            result.commands.push(
                ...this.loadCommands(
                    folder
                )
            );



            result.events.push(
                ...this.loadEvents(
                    folder
                )
            );



        }






        logger.success(
            `Github commands found: ${result.commands.length}`
        );


        logger.success(
            `Github events found: ${result.events.length}`
        );



        return result;



    }



}





module.exports =
    new GithubLoader();
