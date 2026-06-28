const express = require("express");
const path = require("path");
const fs = require("fs-extra");


const router =
    express.Router();



const {
    readJSON,
    writeJSON
} = require("../../utils/helper");



const botManager =
    require("../../h/botManager");







router.get(
"/bots",
(req,res)=>{


    let result = [];



    for(
        let [
            id,
            bot
        ]
        of botManager.bots
    ){


        result.push({

            id,

            status:
                bot.status,


            config:
                bot.config


        });


    }





    res.json({

        bots:result

    });



});









router.post(
"/bots/settings",
(req,res)=>{


    let {

        id,

        prefix,

        admins

    } = req.body;





    if(!id){

        return res.json({

            error:"Missing bot id"

        });

    }







    let folder =
        path.join(

            process.cwd(),

            "database",

            id

        );





    if(
        !fs.existsSync(folder)
    ){

        return res.json({

            error:"Bot not found"

        });

    }






    let config =
        readJSON(
            path.join(
                folder,
                "config.json"
            )
        );







    config.prefix =
        prefix || "";



    config.admins =
        admins
        ?
        admins.split("\n")
        :
        [];







    writeJSON(

        path.join(
            folder,
            "config.json"
        ),

        config

    );






    if(
        botManager.bots.has(id)
    ){

        botManager.bots
        .get(id)
        .config = config;

    }






    res.json({

        success:true

    });



});









router.post(
"/bots/stop",
(req,res)=>{


    let id =
        req.body.id;



    if(!id)
        return res.json({
            error:"No id"
        });





    let result =
        botManager.stop(
            id
        );




    res.json({

        success:
            result

    });


});









router.post(
"/bots/start",
async(req,res)=>{


    let id =
        req.body.id;



    if(!id)
        return res.json({

            error:"No id"

        });







    let folder =
        path.join(

            process.cwd(),

            "database",

            id

        );






    if(
        !fs.existsSync(folder)
    ){

        return res.json({

            error:"Bot not found"

        });

    }






    await botManager.startBot(

        id,

        folder

    );






    res.json({

        success:true

    });



});







module.exports =
    router;
