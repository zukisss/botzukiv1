const format = require("../utils/format");


module.exports = {


    meta: {

        name: "uptime",

        description:
            "Shows bot running time.",

        usage:
            "uptime",

        aliases: [
            "up"
        ],

        permission: 0,

        cooldown: 3,

        category:
            "System"

    },





    run: async (ctx) => {



        const time =
            Date.now()
            -
            ctx.started;



        ctx.api.sendMessage(

`⏱ Bot Uptime

${format.uptime(time)}

Started:
${new Date(
    ctx.started
).toLocaleString()}`,

            ctx.event.threadID,

            ctx.event.messageID

        );



    }



};
