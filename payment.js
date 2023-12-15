let cartData = JSON.parse(localStorage.getItem("cart-data"));

let total=document.getElementById("total");
let totalPrice=localStorage.getItem("totalPrice");
total.innerText=` ₹ ${totalPrice}`
let form=document.querySelector("form")

let btn=document.getElementById("check");
btn.addEventListener("click",(e)=>{
    e.preventDefault()
    localStorage.removeItem("cart-data");
    alert("Your Payment is successfull");
    window.location.href="../index.html"
})