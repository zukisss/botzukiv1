const fs = require("fs");
const path = require("path");

const Loader = require("./Loader");



class Watcher {



    static start(state) {


        const folders = [

            "c",

            "e"

        ];





        for (
            const folder of folders
        ) {



            const dir =
                path.join(
                    process.cwd(),
                    folder
                );



            if (
                !fs.existsSync(dir)
            )
                continue;






            fs.watch(

                dir,

                async (
                    event,
                    filename
                ) => {



                    if (
                        !filename ||
                        !filename.endsWith(".js")
                    )
                        return;





                    state.logger.info(

                        `Reloading ${folder}/${filename}`

                    );






                    try {



                        if (
                            folder === "c"
                        ) {


                            await Loader.loadCommands(
                                state
                            );


                        }



                        if (
                            folder === "e"
                        ) {


                            await Loader.loadEvents(
                                state
                            );


                        }





                        state.logger.success(

                            `${filename} reloaded`

                        );





                    } catch(err) {



                        state.logger.error(
                            err
                        );


                    }



                }

            );





        }





        state.logger.success(
            "Hot reload enabled"
        );



    }




}



module.exports = Watcher;
