module.exports = {

    meta: {
        name: "announce",
        description: "Send announcement.",
        usage: "announce text",
        aliases: ["bc"],
        permission: 2,
        cooldown: 10,
        category: "Admin"
    },


    run: async (ctx) => {


        const message =
            ctx.args.join(" ");



        if (!message) {

            return ctx.api.sendMessage(
                "Provide message.",
                ctx.event.threadID,
                ctx.event.messageID
            );

        }



        const threads =
            ctx.database.all(
                "threads"
            );



        for (
            const id in threads
        ) {

            try {

                ctx.api.sendMessage(
                    message,
                    id
                );

            } catch {}

        }



        ctx.api.sendMessage(

            "✅ Announcement sent.",

            ctx.event.threadID,
            ctx.event.messageID

        );



    }

};
