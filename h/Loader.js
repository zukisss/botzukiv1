const fs = require("fs");
const path = require("path");

const Cooldown = require("./Cooldown");
const Permission = require("./Permission");
const Database = require("./Database");
const Economy = require("./Economy");


const cooldown = new Cooldown();
const permission = new Permission();

const database = new Database();
const economy = new Economy(database);



class Loader {



    static async loadAll(state) {


        await this.loadCommands(state);

        await this.loadEvents(state);


        state.database = database;

        state.economy = economy;

        state.permission = permission;

        state.cooldown = cooldown;


        state.logger.success(
            `Loaded ${state.commands.size} commands`
        );


        state.logger.success(
            `Loaded ${state.events.size} events`
        );

    }





    static async loadCommands(state) {


        const dir =
            path.join(
                process.cwd(),
                "c"
            );


        if (!fs.existsSync(dir))
            return;



        const files =
            fs.readdirSync(dir)
            .filter(
                f => f.endsWith(".js")
            );



        for (const file of files) {


            const location =
                path.join(
                    dir,
                    file
                );


            try {


                delete require.cache[
                    require.resolve(location)
                ];


                const command =
                    require(location);



                if (
                    !command.meta ||
                    !command.run
                ) {

                    continue;

                }



                state.commands.set(
                    command.meta.name,
                    command
                );


                if (
                    command.meta.aliases
                ) {


                    for (
                        const alias of
                        command.meta.aliases
                    ) {


                        state.commands.set(
                            alias,
                            command
                        );


                    }


                }



            } catch(err) {


                state.logger.error(
                    err
                );

            }

        }


    }







    static async loadEvents(state) {



        const dir =
            path.join(
                process.cwd(),
                "e"
            );


        if (!fs.existsSync(dir))
            return;




        const files =
            fs.readdirSync(dir)
            .filter(
                f => f.endsWith(".js")
            );




        for (const file of files) {


            const location =
                path.join(
                    dir,
                    file
                );



            try {


                delete require.cache[
                    require.resolve(location)
                ];



                const event =
                    require(location);



                if (
                    !event.event ||
                    !event.run
                )
                    continue;



                state.events.set(
                    event.event,
                    event
                );



            } catch(err) {


                state.logger.error(
                    err
                );


            }


        }


    }







    static async dispatch(
        state,
        event
    ) {



        /*
            Send event to
            event handlers first
        */



        const eventName =
            event.type ||
            event.logMessageType;



        const handler =
            state.events.get(
                eventName
            );



        if (handler) {


            await handler.run({

                ...state,

                event

            });


        }






        /*
            Command processing
        */



        if (
            event.type !== "message"
        )
            return;



        const body =
            event.body || "";



        const prefix =
            state.config.prefix;



        let content =
            body;



        if (
            !state.config.allowNoPrefix
        ) {



            if (
                !content.startsWith(prefix)
            )
                return;



            content =
                content.slice(
                    prefix.length
                );


        } else {


            if (
                content.startsWith(prefix)
            ) {


                content =
                content.slice(
                    prefix.length
                );


            }


        }






        const args =
            content
            .trim()
            .split(/\s+/);



        const name =
            args.shift()
            .toLowerCase();




        const command =
            state.commands.get(
                name
            );



        if (!command)
            return;






        const ctx = {


            ...state,


            event,


            body,


            args,


            command



        };






        if (
            !permission.check(
                ctx
            )
        )
            return;






        if (
            !cooldown.check(
                ctx
            )
        )
            return;






        await command.run(
            ctx
        );



    }





}





module.exports = Loader;
