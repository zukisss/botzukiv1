class Permission {



    constructor(){}




    check(ctx){



        const level =
            ctx.command.meta.permission || 0;



        const sender =
            String(
                ctx.event.senderID
            );





        /*
            0+
            Everyone
        */

        if(level <= 0){

            return true;

        }







        /*
            3
            Owner only
        */

        if(level === 3){


            const owner =
                String(
                    ctx.config.ownerId
                );



            if(
                sender === owner
            ){

                return true;

            }



            this.denied(ctx);

            return false;


        }









        /*
            Multi bot admin
            only controls own bot
        */


        if(
            ctx.bot
        ){


            if(
                String(
                    ctx.bot.admin
                )
                ===
                sender
            ){


                if(level <= 2){

                    return true;

                }


            }



        }








        /*
            2+
            Config admins
        */


        if(level >= 2){



            const admins =
                ctx.config.admins
                .map(
                    String
                );



            if(
                admins.includes(
                    sender
                )
            ){

                return true;

            }




            this.denied(ctx);

            return false;



        }









        /*
            1+
            Thread admins
        */


        if(level >= 1){



            try{


                const info =
                    ctx.api.getThreadInfo(
                        ctx.event.threadID
                    );



                const admins =
                    info.adminIDs
                    ||
                    [];



                const isAdmin =
                    admins.some(

                        x =>
                        String(
                            x.id
                        )
                        ===
                        sender

                    );




                if(isAdmin){

                    return true;

                }




            }catch(e){}





            this.denied(ctx);

            return false;


        }






        return false;


    }







    denied(ctx){



        ctx.api.sendMessage(

            "❌ You don't have permission.",

            ctx.event.threadID,

            ctx.event.messageID

        );


    }



}


module.exports = Permission;
