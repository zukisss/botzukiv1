const format = require("../utils/format");

module.exports = {

    meta: {
        name: "daily",
        description: "Claim daily coins.",
        usage: "daily",
        aliases: [],
        permission: 0,
        cooldown: 5,
        category: "Economy"
    },


    run: async (ctx) => {

        const result =
            ctx.economy.daily(
                ctx.event.senderID
            );


        if (!result.success) {

            return ctx.api.sendMessage(

`⏳ You already claimed today.

Try again later.`,

                ctx.event.threadID,
                ctx.event.messageID
            );

        }


        ctx.api.sendMessage(

`🎁 Daily reward

You received:
${format.money(result.reward)}`,

            ctx.event.threadID,
            ctx.event.messageID
        );


    }

};
