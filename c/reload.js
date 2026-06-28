const Loader = require("../h/Loader");

module.exports = {

meta:{
name:"reload",
description:"Reload modules.",
usage:"reload [c|e|database|all]",
aliases:[],
permission:3,
cooldown:3,
category:"Admin"
},


run:async(ctx)=>{


const type =
ctx.args[0] || "all";



if(type==="c"){

await Loader.loadCommands(ctx);

}



else if(type==="e"){

await Loader.loadEvents(ctx);

}



else if(type==="database"){

ctx.database =
new (require("../h/Database"))();

}



else {


await Loader.loadAll(ctx);


}



ctx.api.sendMessage(

`♻️ Reloaded: ${type}`,

ctx.event.threadID,

ctx.event.messageID

);


}


};
