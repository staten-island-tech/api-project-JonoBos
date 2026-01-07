const API_URL = "https://myfakeapi.com/api/cars/";

document.getElementById("searchBtn").addEventListener("click", searchCars);

async function searchCars() {
  const make = document.getElementById("makeInput").value.trim().toLowerCase();
  const resultsDiv = document.getElementById("results");
  const countP = document.getElementById("count");

  resultsDiv.innerHTML = "";
  countP.textContent = "";

  if (!make) {
    countP.textContent = "Please enter a car brand.";
    return;
  }

  countP.textContent = "Loading cars...";

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const cars = data.cars.filter(
      car => car.car.toLowerCase() === make
    );

    if (cars.length === 0) {
      countP.textContent = "No cars found.";
      return;
    }

    countP.textContent = `Found ${cars.length} cars`;

    cars.forEach(car => {
      const pre = document.createElement("pre");
      pre.textContent = `
Make: ${car.car}
Model: ${car.car_model}
Year: ${car.car_model_year}
Color: ${car.car_color}
Price: ${car.price}
---------------------------
      `;
      resultsDiv.appendChild(pre);
    });

  } catch (err) {
    console.error(err);
    countP.textContent = "Error fetching car data.";
  }
}
