const path = require("path");
const fs = require("fs-extra");

const config = require("../config.json");

const {
    readJSON,
    writeJSON,
    ensure
} = require("../utils/helper");

const logger = require("../utils/logger");



class JSONDatabase {


    constructor(botID){


        this.botID = botID;


        this.folder =
            path.join(
                process.cwd(),
                "database",
                botID
            );


        ensure(this.folder);


        this.file =
            path.join(
                this.folder,
                "data.json"
            );


        if(
            !fs.existsSync(this.file)
        ){

            writeJSON(
                this.file,
                {}
            );

        }

    }





    getAll(){


        return readJSON(
            this.file,
            {}
        );

    }





    get(key){


        let data =
            this.getAll();


        return data[key];

    }






    set(key,value){


        let data =
            this.getAll();


        data[key] =
            value;


        writeJSON(
            this.file,
            data
        );


        return value;

    }






    delete(key){


        let data =
            this.getAll();


        delete data[key];


        writeJSON(
            this.file,
            data
        );


        return true;

    }






    has(key){


        let data =
            this.getAll();


        return (
            key in data
        );

    }






    push(key,value){


        let data =
            this.getAll();



        if(
            !Array.isArray(
                data[key]
            )
        ){

            data[key] = [];

        }


        data[key].push(value);



        writeJSON(
            this.file,
            data
        );



        return data[key];

    }


}





class MongoDatabase {


    constructor(botID){


        this.botID = botID;

        this.connected = false;

        this.memory = {};


        /*
          Mongo connection will be
          initialized here.

          Commands don't care.
        */

    }





    get(key){

        return this.memory[key];

    }




    set(key,value){


        this.memory[key] =
            value;


        return value;

    }




    delete(key){


        delete this.memory[key];


        return true;

    }




    has(key){

        return (
            key in this.memory
        );

    }




    push(key,value){


        if(
            !Array.isArray(
                this.memory[key]
            )
        ){

            this.memory[key] = [];

        }


        this.memory[key].push(value);


        return this.memory[key];

    }



}









function createDatabase(botID){


    if(
        config.database.type === "mongo"
        &&
        config.database.mongoURI !== "NONE"
    ){


        logger.info(
            `Mongo database created for ${botID}`
        );


        return new MongoDatabase(
            botID
        );

    }



    logger.info(
        `JSON database created for ${botID}`
    );


    return new JSONDatabase(
        botID
    );


}






module.exports = {
    createDatabase
};
