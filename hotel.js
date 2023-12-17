let boxPackageContainer=document.getElementsByClassName("box-package-container")[0];
const apiUrl='https://quasarapi.onrender.com/destinations';
const travelUrl=`${apiUrl}`


let pageNumber=1;

//fetchData
async function fetchHotels(travelUrl,condition,pageNumber){
    try{
        let res=await fetch(`${travelUrl}?${condition || ""}_page=${pageNumber || 1}`);
        let data=await res.json();
         renderHotel(data);
    }
    catch(error){
        console.log(error);
    }
}
fetchHotels(apiUrl,pageNumber);

//createMoreCard
function renderHotel(data){

    data.forEach(item=>{
        let totalHotel=oneHotelCard(item);
        boxPackageContainer.appendChild(totalHotel);
    });
}


//one hotel card.

function oneHotelCard(item){
    let boxPackage=document.createElement("div");
    boxPackage.className="box-package";

    let imagePackage=document.createElement("div");
    imagePackage.className="image-package";

    let imageHo =document.createElement("img");
    imageHo.className="imageHotel";
    imageHo.src=item.hotelPhoto;
    imageHo.alt=item.name;

    imagePackage.appendChild(imageHo);

    let contentDiv=document.createElement("div");
    contentDiv.className="content";

    let destinationsHotel=document.createElement("h3");
    destinationsHotel.innerText=item.description;

    contentDiv.appendChild(destinationsHotel);
    
    let hotelPrice=document.createElement("h3");
    hotelPrice.innerText=item.price;
    contentDiv.appendChild(hotelPrice);

    let countryHotel=document.createElement("p");
    countryHotel.innerText=item.country;
    contentDiv.appendChild(countryHotel);

    let anchorHotel=document.createElement("a");
    anchorHotel.className="btn";
    anchorHotel.innerText="Book now";

    anchorHotel.addEventListener("click",function(){
        window.location.href='payment.html';
    });

     contentDiv.appendChild(anchorHotel);

    boxPackage.appendChild(imagePackage);
    boxPackage.appendChild(contentDiv);

    return boxPackage;
}

let moveit = 0;
// Append Load More button
// const loadMoreBtn = document.createElement("span");
const loadMoreBtn = document.getElementsByClassName("load-more")[0];
loadMoreBtn.className = "btn";
loadMoreBtn.innerText = ">";
loadMoreBtn.addEventListener("click", () => {
    pageNumber++;
    moveit-=500;
    fetchHotels(apiUrl,"",pageNumber);
    boxPackageContainer.style.transform = `translate(${moveit}px)`;
    boxPackageContainer.style.transition = "transform 0.7s cubic-bezier(.22,.44,.06,1)";
});



//add functionality to drop down.

//add sort to button.
let highToLow = document.getElementById("high-to-low");
highToLow.addEventListener("click", (e)=> {
    boxPackageContainer.innerHTML = "";
    fetchHotels(apiUrl, "_sort=price&_order=desc&",pageNumber);
  
});

//add sort to button.
let lowToHigh = document.getElementById("low-to-high");
lowToHigh.addEventListener("click", (e)=> {
    boxPackageContainer.innerHTML = "";
    fetchHotels(apiUrl, "_sort=price&_order=asc&",pageNumber);
  
});
