module.exports = {

    event: "log:subscribe",

    run: async (ctx) => {


        const added =
            ctx.event.logMessageData
            ?.addedParticipants
            || [];



        const bot =
            added.find(
                user =>
                String(user.userFbId)
                ===
                String(ctx.api.getCurrentUserID())
            );



        if (!bot)
            return;




        ctx.api.sendMessage(

`👋 Thank you for adding me here!

Type:
${ctx.config.prefix}help

to see my commands.`,

            ctx.event.threadID

        );


    }

};
