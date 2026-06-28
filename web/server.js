const express = require("express");
const path = require("path");
const http = require("http");
const fs = require("fs-extra");

const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const { Server } =
    require("socket.io");


const config =
    require("../config.json");


const logger =
    require("../utils/logger");


const auth =
    require("./middleware/auth");





class PanelServer {


constructor(){


this.app =
    express();


this.server =
    http.createServer(
        this.app
    );


this.io =
    new Server(
        this.server,
        {
            cors:{
                origin:true,
                credentials:true
            }
        }
    );


global.PANEL =
    this.io;


this.setup();


}






setup(){



this.app.use(
    helmet({
        contentSecurityPolicy:false
    })
);



this.app.use(
    cors({
        credentials:true,
        origin:true
    })
);



this.app.use(
    cookieParser()
);



this.app.use(
    express.json({
        limit:"50mb"
    })
);



this.app.use(
    express.urlencoded({
        extended:true
    })
);







this.app.get(
"/",
(req,res)=>{

res.sendFile(
path.join(
__dirname,
"views",
"login.html"
)
);

});







this.app.get(
"/register.html",
(req,res)=>{


res.sendFile(
path.join(
__dirname,
"public",
"register.html"
)
);


});







this.app.get(
"/dashboard.html",
auth,
(req,res)=>{


res.sendFile(
path.join(
__dirname,
"public",
"dashboard.html"
)
);


});






this.app.use(
express.static(
path.join(
__dirname,
"public"
)
)
);





this.loadRoutes();






this.io.on(
"connection",
socket=>{


logger.info(
"Panel connected"
);


});




}







loadRoutes(){


let folder =
path.join(
__dirname,
"routes"
);



if(!fs.existsSync(folder))
return;




for(
let file of fs.readdirSync(folder)
){


if(!file.endsWith(".js"))
continue;



let route =
require(
path.join(
folder,
file
)
);



this.app.use(
"/api",
route
);



logger.success(
"Loaded panel route "+file
);



}



}







start(){


this.server.listen(
config.panel.port,
config.panel.host,
()=>{


logger.success(
"Panel running"
);


}
);


}




}





module.exports =
new PanelServer();
