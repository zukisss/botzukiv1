const globalConfig =
    require("../config.json");





function getLevel(
    userID,
    bot
){


    let id =
        String(userID);





    /*
        Global owner
        Always level 2
    */

    if(
        Array.isArray(
            globalConfig.ownerID
        )
        &&
        globalConfig.ownerID
        .map(String)
        .includes(id)
    ){

        return 2;

    }






    /*
        Bot admin
        Level 1
    */

    if(
        bot &&
        bot.config &&
        Array.isArray(
            bot.config.admins
        )
        &&
        bot.config.admins
        .map(String)
        .includes(id)
    ){

        return 1;

    }






    /*
        Normal user
        Level 0
    */

    return 0;


}








function allowed(
    userID,
    requiredLevel,
    bot
){


    let userLevel =
        getLevel(
            userID,
            bot
        );




    /*
        0 and up
        1 and up
        2 only

        Example:

        user 0:
          allowed >=0

        admin 1:
          allowed >=0 and >=1

        owner 2:
          allowed everything
    */


    return (
        userLevel >= Number(requiredLevel || 0)
    );


}






module.exports = {

    getLevel,

    allowed

};
