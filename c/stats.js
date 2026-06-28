module.exports = {

    meta: {
        name: "stats",
        description: "Bot statistics.",
        usage: "stats",
        aliases: [],
        permission: 0,
        cooldown: 5,
        category: "Utility"
    },


    run: async (ctx) => {


        const users =
            Object.keys(
                ctx.database.all("users")
            ).length;


        const threads =
            Object.keys(
                ctx.database.all("threads")
            ).length;



        ctx.api.sendMessage(

`📊 Bot Stats

Users:
${users}

Threads:
${threads}

Commands:
${ctx.commands.size}`,

            ctx.event.threadID,
            ctx.event.messageID
        );


    }

};
