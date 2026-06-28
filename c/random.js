module.exports = {

    meta: {
        name: "random",
        description: "Random number.",
        usage: "random",
        aliases: ["rand"],
        permission: 0,
        cooldown: 3,
        category: "Fun"
    },


    run: async (ctx) => {


        const num =
            Math.floor(
                Math.random()
                *
                100
            ) + 1;



        ctx.api.sendMessage(

            `🎲 Random number: ${num}`,

            ctx.event.threadID,
            ctx.event.messageID

        );


    }

};
