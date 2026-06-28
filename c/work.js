const format = require("../utils/format");

module.exports = {

    meta: {
        name: "work",
        description: "Work to earn coins.",
        usage: "work",
        aliases: [],
        permission: 0,
        cooldown: 30,
        category: "Economy"
    },


    run: async (ctx) => {


        const jobs = [

            "developer",
            "designer",
            "teacher",
            "farmer",
            "chef"

        ];


        const job =
            jobs[
                Math.floor(
                    Math.random()
                    *
                    jobs.length
                )
            ];


        const reward =
            Math.floor(
                Math.random()
                *
                300
            )
            + 50;



        ctx.economy.add(

            ctx.event.senderID,

            reward

        );



        ctx.api.sendMessage(

`👷 Work complete

Job:
${job}

Earned:
${format.money(reward)}`,

            ctx.event.threadID,
            ctx.event.messageID
        );


    }

};
