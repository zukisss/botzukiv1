const format = require("../utils/format");


module.exports = {


    meta: {

        name: "help",

        description:
            "Shows all available commands.",

        usage:
            "help [page]",

        aliases: [
            "menu",
            "commands"
        ],

        permission: 0,

        cooldown: 3,

        category:
            "System"

    },





    run: async (ctx) => {



        const page =
            Number(
                ctx.args[0]
            )
            ||
            1;





        const perPage =
            ctx.config.help.commandsPerPage
            ||
            10;






        const commands =
            [...ctx.commands.values()]

            .filter(
                (cmd, index, arr) =>
                    arr.indexOf(cmd)
                    === index
            );






        const categories = {};




        for (
            const cmd of commands
        ) {



            const cat =
                cmd.meta.category
                ||
                "Other";



            if (
                !categories[cat]
            )
                categories[cat] = [];



            categories[cat]
                .push(cmd);



        }






        const lines = [];




        for (
            const category in categories
        ) {



            lines.push(
                `\n╭─ ${category}`
            );



            for (
                const cmd of
                categories[category]
            ) {


                lines.push(

                    `│ ${cmd.meta.name}`

                );


            }



            lines.push(
                "╰────────"
            );



        }





        const pages =
            Math.ceil(
                lines.length /
                perPage
            );



        const selected =
            lines.slice(

                (page - 1)
                *
                perPage,

                page
                *
                perPage

            );





        let message =

`╭━━━〔 ${ctx.config.botName} 〕━━━╮

${selected.join("\n")}

Page ${page}/${pages}

Use:
${ctx.config.prefix}help <page>

╰━━━━━━━━━━━━━━╯`;






        ctx.api.sendMessage(

            message,

            ctx.event.threadID,

            ctx.event.messageID

        );




    }



};
