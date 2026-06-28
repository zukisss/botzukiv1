module.exports={


meta:{


name:"kick",

description:"Remove user by UID.",

usage:"kick uid",

aliases:["remove"],

permission:1,

cooldown:10,

category:"Moderation"


},



run:async(ctx)=>{



const uid =
ctx.args[0];



if(!uid){

return ctx.api.sendMessage(

"Usage: kick uid",

ctx.event.threadID,
ctx.event.messageID

);

}



ctx.api.removeUserFromGroup(

uid,

ctx.event.threadID

);



ctx.api.sendMessage(

`✅ Removed ${uid}`,

ctx.event.threadID,
ctx.event.messageID

);



}


};
