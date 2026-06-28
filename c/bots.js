module.exports = {


meta:{

name:"bots",

description:"List running bots.",

usage:"bots",

aliases:[],

permission:0,

cooldown:5,

category:"utils"

},




run:async(ctx)=>{



const bots =
[
...ctx.botManager.bots.values()
];




let text =
"🤖 Active Bots\n\n";



if(!bots.length){

text += "No extra bots.";

}else{



for(
const bot of bots
){

text +=

`ID: ${bot.id}
Prefix: ${bot.prefix || "none"}
Admin: ${bot.admin}

`;

}



}




ctx.api.sendMessage(

text,

ctx.event.threadID,

ctx.event.messageID

);



}


};
