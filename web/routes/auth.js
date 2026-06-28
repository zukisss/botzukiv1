const express = require("express");
const path = require("path");
const fs = require("fs-extra");

const bcrypt =
    require("bcrypt");

const jwt =
    require("jsonwebtoken");

const { v4: uuidv4 } =
    require("uuid");


const router =
    express.Router();



const config =
    require("../../config.json");



const DATA =
    path.join(
        process.cwd(),
        "database"
    );



function usersFile(){


    return path.join(
        DATA,
        "users.json"
    );


}





function readUsers(){


    if(
        !fs.existsSync(
            usersFile()
        )
    ){

        return [];

    }



    return fs.readJSONSync(
        usersFile()
    );


}





function saveUsers(users){


    fs.writeJSONSync(
        usersFile(),
        users,
        {
            spaces:4
        }
    );


}







router.post(
"/register",
async(req,res)=>{


try{


const {

username,

password,

appstate,

prefix,

admins


} = req.body;







if(
!username ||
!password ||
!appstate
){

return res.json({

error:
"Missing fields"

});

}







let users =
    readUsers();





if(
users.find(
u=>u.username === username
)
){

return res.json({

error:
"Username already exists"

});

}









let parsedAppstate;


try{


parsedAppstate =
JSON.parse(
    appstate
);


}

catch(e){


return res.json({

error:
"Invalid appstate JSON"

});


}









let botID =
uuidv4();




let botFolder =
path.join(
DATA,
botID
);



fs.ensureDirSync(
botFolder
);







fs.writeJSONSync(

path.join(
botFolder,
"appstate.json"
),

parsedAppstate,

{
spaces:4
}

);







let botConfig = {


id:
botID,


prefix:
prefix || "",



admins:
admins
?
admins
.split("\n")
.filter(Boolean)
:
[]


};







fs.writeJSONSync(

path.join(
botFolder,
"config.json"
),

botConfig,

{
spaces:4
}

);









let hash =
await bcrypt.hash(
password,
10
);






users.push({

username,

password:hash,


bots:[
botID
]


});






saveUsers(
users
);








res.json({

success:true,

botID

});




}

catch(err){


console.log(err);


res.json({

error:
"Register failed"

});


}


});









router.post(
"/login",
async(req,res)=>{


const {

username,

password


} = req.body;






let users =
readUsers();




let user =
users.find(
u=>u.username === username
);






if(!user){


return res.json({

error:
"Invalid login"

});


}







let ok =
await bcrypt.compare(

password,

user.password

);







if(!ok){


return res.json({

error:
"Invalid login"

});


}








let token =
jwt.sign(

{

username,

bots:
user.bots

},

config.security.jwtSecret,

{

expiresIn:
"7d"

}

);







res.cookie(
"token",
token,
{

httpOnly:true

}
);







res.json({

success:true

});



});






module.exports =
router;
