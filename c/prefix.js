module.exports = {


    meta: {

        name: "prefix",

        description:
            "Shows current prefix.",

        usage:
            "prefix",

        aliases: [],

        permission: 0,

        cooldown: 3,

        category:
            "System"

    },





    run: async (ctx) => {


        const thread =
            ctx.database
            .createThread(
                ctx.event.threadID
            );



        const prefix =
            thread.prefix
            ||
            ctx.config.prefix;





        ctx.api.sendMessage(

`Current prefix:

${prefix}`,

            ctx.event.threadID,

            ctx.event.messageID

        );



    }



};
