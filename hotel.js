let boxPackageContainer=document.getElementsByClassName("box-package-container")[0];

const apiUrl='https://myfinalapi.onrender.com/destinations';
const travelUrl=`${apiUrl}`


let pageNumber=1;

//fetchData
async function fetchHotels(travelUrl,condition,pageNumber){
    try{
        let res=await fetch(`${travelUrl}?${condition || ""}_page=${pageNumber || 1}&_limit=4`);
        let data=await res.json();
         renderHotel(data);
    }
    catch(error){
        console.log(error);
    }
}
fetchHotels(travelUrl,pageNumber);

//createMoreCard
function renderHotel(data){
    // boxPackageContainer.innerHTML="";
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
    fetchHotels(apiUrl, pageNumber);;
    boxPackageContainer.style.transform = `translate(${moveit}px)`;
    boxPackageContainer.style.transition = "transform 0.7s cubic-bezier(.22,.44,.06,1)";
});

// Append Load More button to the correct container
// document.querySelector('.load-more').appendChild(loadMoreBtn);



//add functionality to drop down.



/// Function to sort hotels by price in ascending order (low to high)
function sortHotelsByPriceAsc(data) {
    data.sort((a, b) => {
        // Assuming prices are in the format "$499", converting them to numbers for comparison
        const priceA = parseInt(a.price.replace(/\D/g, ''));
        const priceB = parseInt(b.price.replace(/\D/g, ''));
        return priceA - priceB;
    });
    return data;
}

// Function to sort hotels by price in descending order (high to low)
function sortHotelsByPriceDesc(data) {
    data.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/\D/g, ''));
        const priceB = parseInt(b.price.replace(/\D/g, ''));
        return priceB - priceA;
    });
    return data;
}

// Event listener for the "High to Low Price" button
let highToLow = document.getElementById("high-to-low");
highToLow.addEventListener("click", async () => {
    try {
        pageNumber = 1; 
        let res = await fetch(`${travelUrl}?_sort=price&_order=desc&_page=${pageNumber || 1}&_limit=4`);
        let data = await res.json();
        data = sortHotelsByPriceDesc(data);
        renderHotel(data);
    } catch (error) {
        console.log(error);
    }
});

// Event listener for the "Low to High Price" button
let lowToHigh = document.getElementById("low-to-high");
lowToHigh.addEventListener("click", async () => {
    try {
        pageNumber = 1;
        let res = await fetch(`${travelUrl}?_sort=price&_order=asc&_page=${pageNumber || 1}&_limit=4`);
        let data = await res.json();
        data = sortHotelsByPriceAsc(data);
        renderHotel(data);
        // console.log("ok");
    } catch (error) {
        console.log(error);
    }
});
