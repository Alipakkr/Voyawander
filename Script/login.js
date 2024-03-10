// const { log } = require("console");

let userUrl=`https://quasarapi.onrender.com/users`;

let emailLogin=document.getElementById("email");
let passwordLogin=document.getElementById("password");
let loginButton=document.getElementById("submitLogin");

async function loginData(){
  try{
    let res=await fetch(`https://quasarapi.onrender.com/users?email_like=${emailLogin.value}`);
    let data=await res.json();
    // console.log(data[0]);
    if(emailLogin.value==data[0].email && passwordLogin.value==data[0].password){
        alert("login Succesful");
        location.href="index.html";
    }else if(emailLogin.value==data[0].email || passwordLogin.value==data[0].password){
        alert("Invalid Username or password");
    }else {
        alert("Fill input part");
    }
  }
  catch(error){
    console.log(error);
  }
}

loginButton.addEventListener("click",(e)=>{
    e.preventDefault();
    loginData(userUrl);
})