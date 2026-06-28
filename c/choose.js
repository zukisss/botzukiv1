module.exports = {

    meta: {
        name: "choose",
        description: "Choose between options.",
        usage: "choose a | b",
        aliases: [],
        permission: 0,
        cooldown: 3,
        category: "Fun"
    },


    run: async (ctx) => {


        const text =
            ctx.args.join(" ");



        const choices =
            text.split("|");



        if (
            choices.length < 2
        ) {

            return ctx.api.sendMessage(
                "Use: choose a | b",
                ctx.event.threadID,
                ctx.event.messageID
            );

        }



        const pick =
            choices[
                Math.floor(
                    Math.random()
                    *
                    choices.length
                )
            ];



        ctx.api.sendMessage(

            `🤔 I choose:\n${pick.trim()}`,

            ctx.event.threadID,
            ctx.event.messageID

        );


    }

};
