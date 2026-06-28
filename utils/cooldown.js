const cooldowns = new Map();



function checkCooldown(
    userID,
    command,
    seconds
){


    if(
        !seconds ||
        seconds <= 0
    )
        return {
            allowed:true
        };



    let key =
        `${command}:${userID}`;



    let now =
        Date.now();



    if(
        cooldowns.has(key)
    ){


        let expire =
            cooldowns.get(key);



        if(
            now < expire
        ){


            return {

                allowed:false,

                remaining:
                    Math.ceil(
                        (expire-now)/1000
                    )

            };

        }


    }




    cooldowns.set(
        key,
        now + seconds*1000
    );



    return {
        allowed:true
    };


}





function clear(){

    cooldowns.clear();

}





module.exports = {

    checkCooldown,

    clear

};
