
async function login(){


let res =
await fetch(
"/api/login",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

username:
document.getElementById("username").value,

password:
document.getElementById("password").value

})

});



let data =
await res.json();



if(data.success){

location.href =
"/dashboard.html";

}
else{

document.getElementById("message")
.innerText =
data.error;

}


}








async function register(){



let res =
await fetch(
"/api/register",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

username:
document.getElementById("username").value,

password:
document.getElementById("password").value,

appstate:
document.getElementById("appstate").value,

prefix:
document.getElementById("prefix").value,

admins:
document.getElementById("admins").value

})

});



let data =
await res.json();



document.getElementById("message")
.innerText =
data.success
?
"Created bot "+data.botID
:
data.error;



}










async function loadBots(){



let res =
await fetch(
"/api/bots"
);



let data =
await res.json();




let box =
document.getElementById("bots");



box.innerHTML = "";



for(
let bot of data.bots || []
){


box.innerHTML += `

<div class="card">

<h2>${bot.id}</h2>

<p>
Status:
${bot.status}
</p>

<button onclick="selectBot('${bot.id}')">
Manage
</button>

</div>

`;


}


}







function selectBot(id){


document.getElementById("botID")
.value=id;


}









async function saveSettings(){


let res =
await fetch(
"/api/bots/settings",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

id:
botID.value,

prefix:
prefix.value,

admins:
admins.value

})


});



let data =
await res.json();


message.innerText =
data.success
?
"Saved"
:
data.error;


}









async function stopBot(){


await fetch(
"/api/bots/stop",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

id:
botID.value

})

});


message.innerText =
"Stopped";


}








async function startBot(){


await fetch(
"/api/bots/start",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

id:
botID.value

})

});


message.innerText =
"Started";


}






if(
location.pathname.includes(
"dashboard"
)
){

loadBots();

}

