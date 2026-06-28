module.exports = {


    meta:{


        name:"ping",


        description:
            "Check bot latency",


        usage:
            "ping",


        aliases:[
            "p"
        ],


        permission:0,


        category:
            "utility",


        cooldown:3


    },





    run:async({


        api,

        event,

        bot


    })=>{


        let start =
            Date.now();



        api.sendMessage(

            `Pong!\n${Date.now()-start}ms`,

            event.threadID

        );


    }


};
