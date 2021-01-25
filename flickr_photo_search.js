const searchButton = document.querySelector(".search-button");
const searchQuery = document.querySelector("#query");
const imgList = document.querySelector("#images");
const overlay = document.querySelector(".overlay");
const prevPage = document.querySelector(".prev-page");
const nextPage = document.querySelector(".next-page");
const pagination = document.querySelector(".pagination");
const catButton = document.querySelector(".cats");
const tigerButton = document.querySelector(".tigers");
const lionButton = document.querySelector(".lions");

const url = "https://api.flickr.com/services/rest";
const key = "";

let currentPage = 1;
let lastSearched = "";

// KOMMA ÅT KNAPPARNA 1 2 3 4
document.querySelectorAll(".links").forEach((item) => {
  item.addEventListener("click", (event) => {
    currentPage = event.target.innerHTML;
getImages(lastSearched);
  });
});

//NEXT PAGE
nextPage.addEventListener("click", () => {
  currentPage++;
  pagination.classList.toggle("active");
  getImages(lastSearched);
});

//PREVIOUS PAGE
prevPage.addEventListener("click", () => {
  currentPage--;
  getImages(lastSearched);
});

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  let query = searchQuery.value;
  //kallar på funktionen som hämtar bilder från API
  getImages(query);
});

//funktionen som hämtar bilder från API
async function getImages(query) {
  imgList.innerHTML = "";
  lastSearched = query;
  // Hämta per page 
  const perPage = document.getElementById('number-of-photos').value;
  const response = await fetch(
    url +
      `?api_key=${key}&method=flickr.photos.search&text=${query}&sort=relevance&per_page=${perPage}&page=${currentPage}&format=json&nojsoncallback=1`
  );
  const data = await response.json();
  //kallar på funktionen för att visa bildena från API
  showPhotos(data.photos.photo);
}

//funktionen som visar bildena från API
function showPhotos(images) {
  images.forEach((image) => {
    let listUrl = `https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}_b.jpg`;
    const item = document.createElement("figure");
    //klicka på bild för att se i större format
    item.addEventListener("click", () => {
      //kallar på funktionen för att kunna se större format
      showBigImage(listUrl);
    });
    item.innerHTML = `<img src="${listUrl}" alt="${image.title}">`;
    imgList.appendChild(item);
  });
}

//visa bild i större format
function showBigImage(listUrl) {
  overlay.innerHTML = `<img src="${listUrl}" alt="${listUrl.title}">`;
  overlay.classList.toggle("hide");
}

// KLicka på den större bilden och den stängs
overlay.onclick = function () {
  overlay.classList.toggle("hide");
};

// HÄMTA KATTBILDER
catButton.addEventListener("click", () => {
  getImages("cats")
});

// HÄMTA TIGERBILDER
tigerButton.addEventListener("click", () => {
  getImages("tigers");
});

// HÄMTA LEJONBILDER
lionButton.addEventListener("click", () => {
  getImages("lions");
});