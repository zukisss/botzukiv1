module.exports = {



    number(value) {


        return Number(value)
            .toLocaleString();


    },







    money(value) {


        return (
            "💰 " +
            Number(value)
            .toLocaleString()
        );


    },







    uptime(ms) {



        let seconds =
            Math.floor(
                ms / 1000
            );



        let days =
            Math.floor(
                seconds / 86400
            );



        seconds %= 86400;



        let hours =
            Math.floor(
                seconds / 3600
            );



        seconds %= 3600;



        let minutes =
            Math.floor(
                seconds / 60
            );



        seconds %= 60;





        return (

            `${days}d ` +
            `${hours}h ` +
            `${minutes}m ` +
            `${seconds}s`

        );



    }





};
