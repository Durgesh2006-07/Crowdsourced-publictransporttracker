/* =========================
   LOGIN
========================= */
async function login(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try{

const response = await fetch("/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email:email,
password:password
})
});

const data = await response.json();

if(data.success){

localStorage.setItem("loggedIn","true");
localStorage.setItem("userRole",data.role);

/* Redirect based on role */

if(data.role === "admin"){
window.location.href="/admin";
}else{
window.location.href="/index";
}

}
else{
alert("Invalid email or password");
}

}catch(error){
console.error("Login error:",error);
}

}


/* =========================
   LOGOUT
========================= */
function logout(){

localStorage.removeItem("loggedIn");
localStorage.removeItem("userRole");

window.location.href="/";

}
/* =========================
   SIGNUP
========================= */
async function signup(){

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try{

const response = await fetch("/signup",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name:name,
email:email,
password:password
})
});

const data = await response.json();

if(data.success){

alert("Account created successfully");

window.location.href="/";

}else{

alert("Signup failed");

}

}catch(error){

console.error("Signup error:",error);

}

}