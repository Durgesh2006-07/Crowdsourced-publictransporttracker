/* =========================
   LOGIN WITH VALIDATION
========================= */
function login(){

let email = document.getElementById("email").value;
let password = document.getElementById("password").value;

fetch("http://127.0.0.1:5000/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email:email,
password:password
})
})
.then(res=>res.json())
.then(data=>{

if(data.success){

localStorage.setItem("loggedIn","true");

if(data.role === "admin"){
window.location="admin.html";
}
else{
window.location="index.html";
}

}
else{
alert("Invalid login");
}

});

}


/* =========================
   LOGOUT
========================= */
function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("userEmail");

  window.location.replace("login.html");
}
