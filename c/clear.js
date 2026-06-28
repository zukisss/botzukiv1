module.exports = {

    meta: {
        name: "clear",
        description: "Clear bot messages.",
        usage: "clear",
        aliases: [],
        permission: 2,
        cooldown: 5,
        category: "Moderation"
    },


    run: async (ctx) => {


        ctx.api.sendMessage(

            "🧹 Clear command executed.",

            ctx.event.threadID,
            ctx.event.messageID

        );


    }

};
