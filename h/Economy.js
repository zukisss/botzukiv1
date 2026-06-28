class Economy {



    constructor(database) {


        this.db = database;


    }






    create(id) {


        let user =
            this.db.get(
                "economy",
                id
            );



        if (!user) {


            user = {


                id,

                coins: 0,

                bank: 0,

                lastDaily: 0,

                created:
                    Date.now()


            };



            this.db.set(

                "economy",

                id,

                user

            );


        }



        return user;


    }









    get(id) {


        return this.create(id);


    }








    balance(id) {


        const user =
            this.create(id);



        return {


            wallet:
                user.coins,


            bank:
                user.bank,



            total:
                user.coins +
                user.bank



        };


    }










    add(id, amount) {


        const user =
            this.create(id);



        user.coins +=
            Number(amount);



        this.db.set(

            "economy",

            id,

            user

        );



        return user.coins;


    }










    remove(id, amount) {


        const user =
            this.create(id);



        amount =
            Number(amount);




        if (
            user.coins < amount
        ) {


            return false;


        }




        user.coins -= amount;



        this.db.set(

            "economy",

            id,

            user

        );



        return true;


    }









    deposit(id, amount) {


        const user =
            this.create(id);



        amount =
            Number(amount);




        if (
            user.coins < amount
        )
            return false;




        user.coins -= amount;

        user.bank += amount;




        this.db.set(

            "economy",

            id,

            user

        );



        return true;


    }








    withdraw(id, amount) {


        const user =
            this.create(id);



        amount =
            Number(amount);




        if (
            user.bank < amount
        )
            return false;




        user.bank -= amount;

        user.coins += amount;



        this.db.set(

            "economy",

            id,

            user

        );



        return true;


    }










    daily(id) {


        const user =
            this.create(id);



        const cooldown =
            86400000;



        if (
            Date.now()
            -
            user.lastDaily
            <
            cooldown
        ) {



            const left =
                cooldown -
                (
                    Date.now()
                    -
                    user.lastDaily
                );



            return {

                success:false,

                remaining:left

            };


        }






        const reward =
            Math.floor(
                Math.random()
                *
                500
            )
            +
            100;





        user.coins += reward;



        user.lastDaily =
            Date.now();





        this.db.set(

            "economy",

            id,

            user

        );




        return {


            success:true,

            reward


        };



    }








    leaderboard() {


        return Object
            .values(
                this.db.all(
                    "economy"
                )
            )
            .sort(
                (a,b)=>
                    b.coins -
                    a.coins
            );


    }





}



module.exports = Economy;
