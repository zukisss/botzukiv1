module.exports = {


meta:{

name:"setbal",

description:"Set user balance by UID.",

usage:"setbal uid amount",

aliases:[],

permission:2,

cooldown:5,

category:"Admin"

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

"Usage: setbal uid amount",

ctx.event.threadID,
ctx.event.messageID

);

}



const user =
ctx.economy.create(uid);



user.coins =
amount;



ctx.database.set(

"economy",

uid,

user

);



ctx.api.sendMessage(

`✅ Balance updated

User:
${uid}

Coins:
${amount}`,

ctx.event.threadID,
ctx.event.messageID

);


}


};
