const swiper = new Swiper(".swiper", {
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },

    loop: true,

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const slides = document.querySelectorAll(".slide");

var counter = 0;

slides.forEach((slide,index)=>{
    slide.style.left = `${index*100}%`
})

const slideImage =()=>{
    counter++;
    if(counter>2){
        counter=0;
    }
    slides.forEach((slide)=>{
        slide.style.transform=`translateX(-${counter*100}%)`;
    })
}
setInterval(slideImage,5000);
