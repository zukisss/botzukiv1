const format = require("../utils/format");

module.exports = {

    meta: {
        name: "leaderboard",
        description: "Top richest users.",
        usage: "leaderboard",
        aliases: ["top"],
        permission: 0,
        cooldown: 10,
        category: "Economy"
    },


    run: async (ctx) => {


        const top =
            ctx.economy
            .leaderboard()
            .slice(0,10);



        let text =
`🏆 Economy Leaderboard\n\n`;



        top.forEach(
            (user, i) => {

                text +=
`${i+1}. ${user.id}
${format.money(user.coins)}

`;

            }
        );



        ctx.api.sendMessage(

            text,

            ctx.event.threadID,
            ctx.event.messageID
        );


    }

};
