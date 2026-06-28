const path = require("path");
const fs = require("fs-extra");


const logger =
    require("./utils/logger");



global.COMMANDS =
    new Map();


global.EVENTS =
    new Map();


global.HANDLERS =
    new Map();


global.BOTS =
    new Map();







async function folders(){


    [

        "c",
        "e",
        "h",

        "database",

        "cache",

        "logs",

        "users"

    ]
    .forEach(folder=>{


        fs.ensureDirSync(
            path.join(
                process.cwd(),
                folder
            )
        );


    });


}









async function start(){



    await folders();





    logger.info(
        "Booting framework"
    );







    const loader =
        require("./h/loader");



    await loader.initialize();







    const github =
        require("./h/githubLoader");



    const external =
        await github.load();






    for(
        const file of external.commands
    ){


        await loader.loadFile(
            file,
            "command"
        );


    }







    for(
        const file of external.events
    ){


        await loader.loadFile(
            file,
            "event"
        );


    }









    const botManager =
        require("./h/botManager");



    await botManager.startAll();




    global.BOTS =
        botManager.bots;








    require("./web/server")
        .start();








    logger.success(
        "Everything loaded"
    );



    logger.info(
        `Commands ${COMMANDS.size}`
    );


    logger.info(
        `Events ${EVENTS.size}`
    );


    logger.info(
        `Bots ${BOTS.size}`
    );


}









start()
.catch(
err=>{


    logger.error(err);


    process.exit(1);


});
