module.exports = {


    meta: {

        name: "about",

        description:
            "Shows bot information.",

        usage:
            "about",

        aliases: [
            "info"
        ],

        permission: 0,

        cooldown: 5,

        category:
            "System"

    },





    run: async (ctx) => {


        const commands =
            [
                ...ctx.commands.keys()
            ]
            .length;



        ctx.api.sendMessage(

`🤖 ${ctx.config.botName}

Prefix:
${ctx.config.prefix}

Commands:
${commands}

Owner:
${ctx.config.owner}

Framework:
@tas33n/ws3-fca`,

            ctx.event.threadID,

            ctx.event.messageID

        );



    }


};
