module.exports = {


meta:{

name:"login",

description:"Add another bot account.",

usage:"login <prefix|none> <adminID> <appstate>",

aliases:[],

permission:0,

cooldown:10,

category:"utils"

},




run:async(ctx)=>{



const prefix =
ctx.args[0];


const admin =
ctx.args[1];


const appstate =
ctx.args[2];



if(
!prefix ||
!admin ||
!appstate
){

return ctx.api.sendMessage(

"Usage: login <prefix|none> <adminID> <appstate>",

ctx.event.threadID,

ctx.event.messageID

);

}




let state;



try{


state =
JSON.parse(
appstate
);



}catch{


return ctx.api.sendMessage(

"Invalid appstate JSON.",

ctx.event.threadID,

ctx.event.messageID

);


}



const file =
ctx.botManager.add(

admin,

prefix==="none" ? "" : prefix,

state

);




ctx.botManager.loadSaved();




ctx.api.sendMessage(

`✅ Bot saved

${file}`,

ctx.event.threadID,

ctx.event.messageID

);


}


};
