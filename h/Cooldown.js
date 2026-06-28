class Cooldown {


    constructor() {

        this.cache = new Map();

    }




    check(ctx) {


        if (
            !ctx.config.cooldowns
        ) {

            return true;

        }



        const time =
            ctx.command.meta.cooldown;



        if (
            !time ||
            time <= 0
        ) {

            return true;

        }




        const user =
            ctx.event.senderID;



        const key =
            `${ctx.command.meta.name}:${user}`;





        const now =
            Date.now();



        if (
            this.cache.has(key)
        ) {


            const expire =
                this.cache.get(key);



            if (
                now < expire
            ) {



                const remaining =
                    Math.ceil(
                        (expire - now) / 1000
                    );



                ctx.api.sendMessage(
                    `⏳ Cooldown: ${remaining}s`,
                    ctx.event.threadID,
                    ctx.event.messageID
                );



                return false;


            }



        }




        this.cache.set(
            key,
            now + (time * 1000)
        );



        return true;


    }



    clear() {

        this.cache.clear();

    }


}



module.exports = Cooldown;
