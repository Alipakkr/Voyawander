// Select the container where hotel data will be rendered
const boxPackageContainer = document.querySelector(".box-package-container");
const apiUrl = "https://quasarapi.onrender.com/destinations";
let mainData = [];
let debounceTimer;


// Function to fetch hotels
async function fetchHotels(query,cond,page) {
  try {
    const response = await fetch(`https://quasarapi.onrender.com/destinations?Country=${query ||""}${cond || ""}_page=${page}`);
    if (!response.ok) {
      throw new Error("Failed to fetch hotels");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return [];
  }
}

// Function to create a single hotel card
function createHotelCard(item) {
  const boxPackage = document.createElement("div");
  boxPackage.className = "box-package";

  const imagePackage = document.createElement("div");
  imagePackage.className = "image-package";

  const imageHo = document.createElement("img");
  imageHo.className = "imageHotel";
  imageHo.src = item.hotelPhoto;
  imageHo.alt = item.name;

  imagePackage.appendChild(imageHo);

  const contentDiv = document.createElement("div");
  contentDiv.className = "content";

  const destinationsHotel = document.createElement("h3");
  destinationsHotel.innerText = item.description;

  contentDiv.appendChild(destinationsHotel);

  const hotelPrice = document.createElement("h3");
  hotelPrice.innerText = item.price;
  contentDiv.appendChild(hotelPrice);

  const countryHotel = document.createElement("p");
  countryHotel.innerText = item.country;
  contentDiv.appendChild(countryHotel);

  const anchorHotel = document.createElement("a");
  anchorHotel.className = "btn";
  anchorHotel.innerText = "Book now";

  anchorHotel.addEventListener("click", function () {
    window.location.href = "payment.html";
  });

  contentDiv.appendChild(anchorHotel);

  boxPackage.appendChild(imagePackage);
  boxPackage.appendChild(contentDiv);

  return boxPackage;
}

// Render fetched hotel data
async function renderHotelData() {
  try {
    const hotelData = await fetchHotels(apiUrl);
    mainData = hotelData; // Update mainData with fetched data

    // Clear previous content
    boxPackageContainer.innerHTML = "";

    // Render all hotel cards initially
    hotelData.forEach((hotel) => {
      const hotelCard = createHotelCard(hotel);
      boxPackageContainer.appendChild(hotelCard);
    });
  } catch (error) {
    console.error("Error rendering hotel data:", error);
  }
}

// console.log(mainData);

// Function to render hotel data based on selected country
function renderHotelsByCountry(selectedCountry) {
  const container = document.querySelector(".box-package-container");
  container.innerHTML = ""; // Clear previous content

  // Check if a country is selected
  if (selectedCountry === "") {
    // If no country selected, render all data
    mainData.forEach((hotel) => {
      const hotelCard = createHotelCard(hotel);
      container.appendChild(hotelCard);
    });
  } else {
    // Filter mainData based on the selected country
    const filteredData = mainData.filter(
      (hotel) => hotel.country === selectedCountry
    );

    // Render hotel cards for the filtered data
    filteredData.forEach((hotel) => {
      const hotelCard = createHotelCard(hotel);
      container.appendChild(hotelCard);
    });
  }
}

// Event listener for dropdown change
const locationDropdown = document.getElementById("locationDropdown");
locationDropdown.addEventListener("change", () => {
  const selectedCountry = locationDropdown.value;
  renderHotelsByCountry(selectedCountry);
});

// Function to sort hotel data by price (high to low)
function sortHotelsByPriceHighToLow() {
  mainData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  renderHotelsByCountry(locationDropdown.value,`&_sort=price&_order=desc&`);
}

// Function to sort hotel data by price (low to high)
function sortHotelsByPriceLowToHigh() {
  mainData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  renderHotelsByCountry(locationDropdown.value,`&_sort=price&_order=asc&`);
}

// Event listeners for sorting buttons
const highToLowBtn = document.getElementById("high-to-low");
const lowToHighBtn = document.getElementById("low-to-high");

highToLowBtn.addEventListener("click", sortHotelsByPriceHighToLow);
lowToHighBtn.addEventListener("click", sortHotelsByPriceLowToHigh);

// Initial rendering with default selected country (optional)
const defaultCountry = locationDropdown.value;
renderHotelsByCountry(defaultCountry);

// Call the function to render hotel data when the DOM content is loaded
document.addEventListener("DOMContentLoaded", renderHotelData());


//famous place
// Function to render hotel data based on selected country


///move
let moveit = 0;
// Append Load More button
// const loadMoreBtn = document.createElement("span");
const loadMoreBtn = document.getElementsByClassName("load-more")[0];
loadMoreBtn.className = "btn";
loadMoreBtn.innerText = ">";
let pageNumber=1;
loadMoreBtn.addEventListener("click", () => {
    pageNumber++;
    moveit-=500;
    fetchHotels(apiUrl,pageNumber);
    boxPackageContainer.style.transform = `translate(${moveit}px)`;
    boxPackageContainer.style.transition = "transform 0.7s cubic-bezier(.22,.44,.06,1)";
});
