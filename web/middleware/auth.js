const jwt = require("jsonwebtoken");


const SECRET =
    process.env.JWT_SECRET ||
    "CHANGE_THIS_SECRET";




module.exports = function(req,res,next){


    let token =
        req.cookies?.token ||
        req.headers.authorization
        ?.replace("Bearer ","");



    if(!token){

        return res.status(401).json({

            error:"Unauthorized"

        });

    }



    try{


        req.user =
            jwt.verify(
                token,
                SECRET
            );


        next();


    }
    catch(err){


        return res.status(401).json({

            error:"Invalid token"

        });


    }


};
