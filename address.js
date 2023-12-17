let saveBtn = document.querySelector('form');
saveBtn.addEventListener('submit', function (e) {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let mobile = document.getElementById('mobile').value;
    let area = document.getElementById('area').value;
    let landmark = document.getElementById('landmark').value;
    let pincode = document.getElementById('pincode').value;
    let email = document.getElementById('email').value;
    let addressType = document.getElementById('addressType').value;

    let obj = { name, mobile, area, landmark, pincode, email, addressType };

    localStorage.setItem('address', JSON.stringify(obj))

    window.location.href='payment.html';

})