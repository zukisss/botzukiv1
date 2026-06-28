const format=require("../utils/format");


module.exports={


meta:{


name:"give",

description:"Give coins using UID.",

usage:"give uid amount",

aliases:[],

permission:0,

cooldown:5,

category:"Economy"


},




run:async(ctx)=>{


const uid =
ctx.args[0];


const amount =
Number(
ctx.args[1]
);



if(!uid || isNaN(amount)){

return ctx.api.sendMessage(

"Usage: give uid amount",

ctx.event.threadID,
ctx.event.messageID

);

}




if(
ctx.economy.remove(
ctx.event.senderID,
amount
)
===false
){

return ctx.api.sendMessage(

"❌ Not enough coins.",

ctx.event.threadID,
ctx.event.messageID

);

}




ctx.economy.add(
uid,
amount
);



ctx.api.sendMessage(

`💸 Sent

${format.money(amount)}

To:
${uid}`,

ctx.event.threadID,
ctx.event.messageID

);


}


};
