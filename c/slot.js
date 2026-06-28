module.exports = {

meta:{
name:"slot",
description:"Slot machine game.",
usage:"slot [amount]",
aliases:["slots"],
permission:0,
cooldown:5,
category:"Fun"
},


run:async(ctx)=>{


const emojis=[
"🍒","🍋","🍉",
"⭐","💎","7️⃣",
"🍇","🍀","🔥",
"🎲","👑","🍎",
"🐉","💰","🎯"
];



const result=[];


for(let i=0;i<5;i++){

result.push(
emojis[
Math.floor(
Math.random()*emojis.length
)
]
);

}



const count={};


for(
const e of result
){

count[e]=(count[e]||0)+1;

}



const win =
Object.values(count)
.some(
x=>x>=2
);



let amount =
Number(
ctx.args[0]
)
|| 10;



if(amount<1)
amount=10;




if(win){


ctx.economy.add(
ctx.event.senderID,
amount*2
);


}else{


ctx.economy.remove(
ctx.event.senderID,
amount
);


}




ctx.api.sendMessage(

`${result.join(" ")}\n\n${
win
?
"🎉 WIN +"+amount*2
:
"❌ Lose -"+amount
}`,

ctx.event.threadID,
ctx.event.messageID

);



}


};
