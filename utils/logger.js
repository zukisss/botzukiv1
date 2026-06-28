const fs = require("fs-extra");
const path = require("path");
const dayjs = require("dayjs");
const chalk = require("chalk");


const config = require("../config.json");


const logFolder = path.join(
    process.cwd(),
    "logs"
);


fs.ensureDirSync(logFolder);


function timestamp(){

    return dayjs().format(
        "YYYY-MM-DD HH:mm:ss"
    );

}



function logFile(){

    return path.join(
        logFolder,
        `${dayjs().format("YYYY-MM-DD")}.log`
    );

}



function writeFile(text){

    if(!config.logs?.file)
        return;


    fs.appendFileSync(
        logFile(),
        text + "\n",
        "utf8"
    );

}




function format(level,message,bot){

    let tag = bot
        ? `[${bot}]`
        : "";


    return (
        `[${timestamp()}] ` +
        `[${level}] ` +
        tag +
        " " +
        message
    );

}




function send(level,message,bot){


    let output =
        format(
            level,
            message,
            bot
        );


    if(config.logs?.console){


        switch(level){


            case "INFO":
                console.log(
                    chalk.cyan(output)
                );
                break;


            case "SUCCESS":
                console.log(
                    chalk.green(output)
                );
                break;


            case "WARN":
                console.log(
                    chalk.yellow(output)
                );
                break;


            case "ERROR":
                console.log(
                    chalk.red(output)
                );
                break;


            default:
                console.log(output);

        }

    }


    writeFile(output);



    return output;

}





const logger = {



    info(message,bot){

        return send(
            "INFO",
            message,
            bot
        );

    },



    success(message,bot){

        return send(
            "SUCCESS",
            message,
            bot
        );

    },



    warn(message,bot){

        return send(
            "WARN",
            message,
            bot
        );

    },



    error(error,bot){


        let message;


        if(error instanceof Error){

            message =
                error.stack ||
                error.message;

        }
        else {

            message =
                String(error);

        }



        return send(
            "ERROR",
            message,
            bot
        );


    },




    debug(message,bot){

        if(
            process.env.DEBUG
        ){

            return send(
                "DEBUG",
                message,
                bot
            );

        }

    },


    raw(message){

        console.log(message);

        writeFile(
            String(message)
        );

    }

};



module.exports = logger;
