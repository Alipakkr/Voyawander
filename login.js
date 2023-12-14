document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    emailLogin = document.getElementById("email").value;
    passwordLogin = document.getElementById("password").value;

    let userData = JSON.parse(localStorage.getItem("signupDetails"));

    userData.forEach(function (elem) {
        if (
            elem.email === emailLogin &&
            elem.password === passwordLogin
        ) {
            window.location.href = "index.html";
        } else {
            alert("Enter correct credentials to login");
        }
    });
});
