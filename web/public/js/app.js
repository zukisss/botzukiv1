
async function register(){


let payload = {

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

};




let res =
await fetch(
"/api/register",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:
JSON.stringify(payload)

}
);



let data =
await res.json();



document.getElementById("message")
.innerText =
data.success
?
"Created bot: "+data.botID
:
data.error;



}







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





async function loadBots(){



let res =
await fetch(
"/api/bots"
);



let data =
await res.json();



let box =
document.getElementById("bots");



if(!box)
return;



box.innerHTML = "";




for(
let bot of data.bots || []
){


box.innerHTML += `

<div class="card">

<h2>${bot.id}</h2>

<p>${bot.status}</p>

</div>

`;


}


}



if(
location.pathname.includes(
"dashboard"
)
){

loadBots();

}
