module.exports = {

    meta: {
        name: "say",
        description: "Make the bot say something.",
        usage: "say text",
        aliases: [],
        permission: 2,
        cooldown: 5,
        category: "Admin"
    },


    run: async (ctx) => {

        if (!ctx.args.length) {

            return ctx.api.sendMessage(
                "Usage: say text",
                ctx.event.threadID,
                ctx.event.messageID
            );

        }


        ctx.api.sendMessage(

            ctx.args.join(" "),

            ctx.event.threadID

        );

    }

};
