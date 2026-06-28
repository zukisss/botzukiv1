const format = require("../utils/format");

module.exports = {

    meta: {
        name: "pay",
        description: "Send coins to someone.",
        usage: "pay @user amount",
        aliases: [],
        permission: 0,
        cooldown: 5,
        category: "Economy"
    },


    run: async (ctx) => {


        const target =
            Object.keys(
                ctx.event.mentions || {}
            )[0];


        const amount =
            Number(
                ctx.args[0]
            );



        if (!target || !amount) {

            return ctx.api.sendMessage(

                "Usage: pay @user amount",

                ctx.event.threadID,
                ctx.event.messageID
            );

        }




        if (
            !ctx.economy.remove(
                ctx.event.senderID,
                amount
            )
        ) {

            return ctx.api.sendMessage(

                "❌ Not enough coins.",

                ctx.event.threadID,
                ctx.event.messageID
            );

        }




        ctx.economy.add(
            target,
            amount
        );



        ctx.api.sendMessage(

`💸 Payment sent

Amount:
${format.money(amount)}`,

            ctx.event.threadID,
            ctx.event.messageID
        );


    }

};
