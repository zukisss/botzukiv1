const fs = require("fs");
const path = require("path");


class Logger {


    constructor() {

        this.dir = path.join(
            process.cwd(),
            "logs"
        );


        if (!fs.existsSync(this.dir)) {

            fs.mkdirSync(
                this.dir,
                { recursive: true }
            );

        }


        this.file = path.join(
            this.dir,
            `${new Date()
                .toISOString()
                .split("T")[0]}.log`
        );

    }



    time() {

        return new Date()
            .toLocaleString();

    }



    write(level, message) {


        const text =
`[${this.time()}] [${level}] ${message}\n`;


        fs.appendFileSync(
            this.file,
            text
        );


        console.log(
            text.trim()
        );

    }




    info(message) {

        this.write(
            "INFO",
            message
        );

    }



    success(message) {

        this.write(
            "SUCCESS",
            message
        );

    }



    warn(message) {

        this.write(
            "WARN",
            message
        );

    }



    error(message) {

        if (message instanceof Error) {

            message =
                message.stack ||
                message.message;

        }


        this.write(
            "ERROR",
            message
        );

    }



    debug(message) {

        this.write(
            "DEBUG",
            message
        );

    }



}



module.exports = Logger;
