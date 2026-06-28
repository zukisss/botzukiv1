const fs = require("fs");
const path = require("path");



class Database {



    constructor() {


        this.dir =
            path.join(
                process.cwd(),
                "database"
            );



        if (
            !fs.existsSync(this.dir)
        ) {

            fs.mkdirSync(
                this.dir,
                {
                    recursive: true
                }
            );

        }




        this.files = {

            users:
                "users.json",

            threads:
                "threads.json",

            settings:
                "settings.json",

            economy:
                "economy.json"

        };




        this.data = {};



        for (
            const key in this.files
        ) {


            const file =
                path.join(
                    this.dir,
                    this.files[key]
                );



            if (
                !fs.existsSync(file)
            ) {


                fs.writeFileSync(
                    file,
                    "{}"
                );


            }



            try {


                this.data[key] =
                    JSON.parse(
                        fs.readFileSync(
                            file,
                            "utf8"
                        )
                    );


            } catch {


                this.data[key] = {};

                this.save(key);


            }



        }



    }







    save(type) {


        const file =
            path.join(
                this.dir,
                this.files[type]
            );



        fs.writeFileSync(

            file,

            JSON.stringify(
                this.data[type],
                null,
                4
            )

        );



    }








    get(type, id) {


        return (
            this.data[type][id]
            ||
            null
        );


    }






    set(type, id, value) {


        this.data[type][id] =
            value;



        this.save(type);



        return value;


    }








    has(type, id) {


        return Boolean(
            this.data[type][id]
        );


    }








    delete(type, id) {


        delete this.data[type][id];


        this.save(type);


        return true;


    }






    all(type) {


        return this.data[type];


    }






    createUser(id) {


        if (
            !this.has(
                "users",
                id
            )
        ) {


            this.set(

                "users",

                id,

                {

                    id,

                    created:
                        Date.now(),

                    messages: 0

                }

            );


        }



        return this.get(
            "users",
            id
        );


    }






    createThread(id) {


        if (
            !this.has(
                "threads",
                id
            )
        ) {


            this.set(

                "threads",

                id,

                {

                    id,

                    prefix: null,

                    created:
                        Date.now()

                }

            );


        }



        return this.get(
            "threads",
            id
        );


    }



}



module.exports = Database;
