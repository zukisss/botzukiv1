module.exports = {

    event: "message",

    run: async (ctx) => {


        const user =
            ctx.event.senderID;



        ctx.database.createUser(
            user
        );


        const thread =
            ctx.event.threadID;



        ctx.database.createThread(
            thread
        );



        const profile =
            ctx.database.get(
                "users",
                user
            );



        profile.messages++;



        ctx.database.set(

            "users",

            user,

            profile

        );


    }

};
