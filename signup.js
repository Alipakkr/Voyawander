let userUrl=`https://quasarapi.onrender.com/users`;

let firstNameInput=document.getElementById("firstName");
let lastNameInput=document.getElementById("lastName");
let emainInput=document.getElementById("email");
let passwordInput=document.getElementById("password");
let submitButton=document.getElementById("submitRegister");

async function fetchUserData(url){
    try{
        let res=await fetch(`${url}`);

        let data= await res.json();
        console.log(data);
    }
    catch(error){
        console.log(error);
    }
}

fetchUserData(userUrl);

async function postData(url){
    try{
        const newUserData={
                firstname:firstNameInput.value,
                lastname:lastNameInput.value,
                email:emainInput.value,
                password:passwordInput.value,

        }
        let res=await fetch(url,{
            method:"POST",
            headers:{
                "Content-type":"application/json",
            },
            body:JSON.stringify(newUserData),
        })
        // const updateData=await res.json();
        fetchUserData(userUrl);
    }
    catch(error){
        console.log(error);
    }
}
submitButton.addEventListener("click",(e)=>{
    e.preventDefault();
    postData(userUrl);
    alert("Signup successfull");
})

