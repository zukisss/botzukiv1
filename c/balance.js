const format = require("../utils/format");

module.exports = {

    meta: {
        name: "balance",
        description: "Shows your money balance.",
        usage: "balance",
        aliases: ["bal"],
        permission: 0,
        cooldown: 3,
        category: "Economy"
    },


    run: async (ctx) => {

        const money =
            ctx.economy.balance(
                ctx.event.senderID
            );


        ctx.api.sendMessage(

`💰 Balance

Wallet:
${format.money(money.wallet)}

Bank:
${format.money(money.bank)}

Total:
${format.money(money.total)}`,

            ctx.event.threadID,
            ctx.event.messageID
        );

    }

};
