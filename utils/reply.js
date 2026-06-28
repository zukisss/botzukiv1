module.exports = {


    send(
        api,
        message,
        event
    ) {


        return api.sendMessage(

            message,

            event.threadID,

            event.messageID

        );


    },






    reply(ctx, message) {


        return this.send(

            ctx.api,

            message,

            ctx.event

        );


    }





};
