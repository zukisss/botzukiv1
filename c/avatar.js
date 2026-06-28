module.exports = {

    meta: {

        name: "avatar",

        description:
            "Shows profile picture.",

        usage:
            "avatar",

        aliases: [
            "pfp"
        ],

        permission: 0,

        cooldown: 5,

        category:
            "Utility"

    },



    run: async (ctx) => {


        const id =
            ctx.args[0]
            ||
            ctx.event.senderID;



        ctx.api.sendMessage(

            `Profile ID:\n${id}`,

            ctx.event.threadID,
            ctx.event.messageID

        );


    }

};
