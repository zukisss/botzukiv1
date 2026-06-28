const fs = require("fs-extra");
const path = require("path");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");



/**
 * Safe JSON reader
 */
function readJSON(file, fallback = {}){


    try {

        if(!fs.existsSync(file))
            return fallback;


        let data =
            fs.readFileSync(
                file,
                "utf8"
            );


        if(!data.trim())
            return fallback;


        return JSON.parse(data);


    } catch(err){


        return fallback;

    }

}





/**
 * Safe JSON writer
 */
function writeJSON(file,data){


    fs.ensureDirSync(
        path.dirname(file)
    );


    fs.writeFileSync(
        file,
        JSON.stringify(
            data,
            null,
            4
        ),
        "utf8"
    );


}





/**
 * Recursive file loader
 */
function getFiles(folder,extension=".js"){


    if(!fs.existsSync(folder))
        return [];


    let result = [];



    for(
        let item of fs.readdirSync(folder)
    ){


        let full =
            path.join(
                folder,
                item
            );



        let stat =
            fs.statSync(full);



        if(stat.isDirectory()){


            result.push(
                ...getFiles(
                    full,
                    extension
                )
            );


        }
        else if(
            full.endsWith(extension)
        ){

            result.push(full);

        }

    }



    return result;

}





/**
 * Generate unique ID
 */
function createID(prefix=""){


    return (
        prefix +
        uuidv4()
        .replace(/-/g,"")
        .slice(0,12)
    );

}





/**
 * Password hashing helper
 */
function hash(text){


    return crypto
        .createHash("sha256")
        .update(text)
        .digest("hex");

}





/**
 * Async error wrapper
 */
function asyncHandler(fn){


    return async function(...args){


        try {

            return await fn(
                ...args
            );


        } catch(err){


            throw err;

        }

    };


}





/**
 * Delay helper
 */
function sleep(ms){

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                ms
            )
    );

}





/**
 * Check object
 */
function isObject(value){

    return (
        value &&
        typeof value === "object" &&
        !Array.isArray(value)
    );

}





/**
 * Ensure folder exists
 */
function ensure(folder){

    fs.ensureDirSync(folder);

}





/**
 * Normalize prefix
 */
function cleanPrefix(prefix){


    if(
        prefix === null ||
        prefix === undefined
    )
        return "";


    return String(prefix)
        .trim();

}





/**
 * Random string
 */
function randomString(length=10){


    return crypto
        .randomBytes(length)
        .toString("hex")
        .slice(0,length);

}





module.exports = {


    readJSON,

    writeJSON,

    getFiles,

    createID,

    hash,

    asyncHandler,

    sleep,

    isObject,

    ensure,

    cleanPrefix,

    randomString

};
