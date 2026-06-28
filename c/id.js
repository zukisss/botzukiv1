module.exports = {

    meta: {
        name: "id",
        description: "Shows user and thread IDs.",
        usage: "id",
        aliases: [],
        permission: 0,
        cooldown: 3,
        category: "Utility"
    },


    run: async (ctx) => {


        ctx.api.sendMessage(

`🆔 Information

User:
${ctx.event.senderID}

Thread:
${ctx.event.threadID}`,

            ctx.event.threadID,
            ctx.event.messageID
        );


    }

};
