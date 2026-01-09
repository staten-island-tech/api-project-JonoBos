const API_URL = "https://myfakeapi.com/api/cars/";

const searchBtn = document.getElementById("searchBtn");
const makeInput = document.getElementById("makeInput");
const resultsDiv = document.getElementById("results");
const countP = document.getElementById("count");

searchBtn.addEventListener("click", searchCars);
window.addEventListener("load", loadRandomCars);

// Load 50 random cars on page load
async function loadRandomCars() {
  countP.textContent = "Loading cars...";

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const shuffled = data.cars.sort(() => 0.5 - Math.random());
    const randomCars = shuffled.slice(0, 50);

    countP.textContent = "Showing 50 random cars";
    displayCars(randomCars);

  } catch (err) {
    console.error(err);
    countP.textContent = "Error loading cars.";
  }
}

// Search by brand
async function searchCars() {
  const make = makeInput.value.trim().toLowerCase();
  resultsDiv.innerHTML = "";

  if (!make) {
    countP.textContent = "Please enter a car brand.";
    return;
  }

  countP.textContent = "Searching cars...";

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const cars = data.cars.filter(car =>
      car.car.toLowerCase() === make
    );

    if (cars.length === 0) {
      countP.textContent = "No cars found.";
      return;
    }

    countP.textContent = `Found ${cars.length} cars`;
    displayCars(cars);

  } catch (err) {
    console.error(err);
    countP.textContent = "Error fetching car data.";
  }
}

// Reusable card renderer
function displayCars(cars) {
  resultsDiv.innerHTML = "";

  cars.forEach(car => {
    const card = document.createElement("div");
    card.className =
      "bg-gray-50 border rounded-lg p-4 shadow hover:shadow-md transition";

    card.innerHTML = `
      <h3 class="text-lg font-bold mb-2">
        ${car.car} ${car.car_model}
      </h3>
      <p><span class="font-semibold">Year:</span> ${car.car_model_year}</p>
      <p><span class="font-semibold">Color:</span> ${car.car_color}</p>
      <p class="mt-2 text-blue-600 font-bold">${car.price}</p>
    `;

    resultsDiv.appendChild(card);
  });
}
