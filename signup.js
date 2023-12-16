let signupArr = JSON.parse(localStorage.getItem("signupDetails")) || [];
document.querySelector("form").addEventListener("submit",()=>{
    event.preventDefault();
    let signupObj = {
        firstName:document.getElementById("firstName").value,
        lastName:document.getElementById("lastName").value,
        email:document.getElementById("email").value,
        password:document.getElementById("password").value,
    }

    signupArr.push(signupObj);

    localStorage.setItem("signupDetails",JSON.stringify(signupArr));

    window.location.href = "login.html"
})
