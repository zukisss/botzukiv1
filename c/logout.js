module.exports = {


meta:{

name:"logout",

description:"Remove bot account.",

usage:"logout <id>",

aliases:[],

permission:3,

cooldown:5,

category:"Admin"

},





run:async(ctx)=>{



const id =
ctx.args[0];



if(!id){

return ctx.api.sendMessage(

"Usage: logout <id>",

ctx.event.threadID,

ctx.event.messageID

);

}





ctx.botManager.remove(
id
);




ctx.api.sendMessage(

`✅ Removed bot ${id}

Restarting...`,

ctx.event.threadID,

ctx.event.messageID

);



setTimeout(

()=>process.exit(0),

1000

);



}


};
