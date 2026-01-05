const API_KEY = "096e8e4277mshdee0ee152f4a453p1740bfjsnba51aa22202c";

async function searchCars() {
  const make = document.getElementById("makeInput").value.trim();
  const resultsDiv = document.getElementById("results");
  const countP = document.getElementById("count");

  resultsDiv.innerHTML = "";
  countP.textContent = "";

  if (!make) {
    countP.textContent = "Please enter a car brand.";
    return;
  }

  countP.textContent = "Loading models...";

  try {
    // Step 1: Get all makes to find the makeId
    const makesRes = await fetch("https://api.carspecsapi.com/v2/cars/makes", {
      headers: { "X-Api-Key": API_KEY }
    });
    const makesData = await makesRes.json();

    // Find the makeId for the entered brand
    const makeObj = makesData.data.find(m => m.name.toLowerCase() === make.toLowerCase());
    if (!makeObj) {
      countP.textContent = "Brand not found.";
      return;
    }

    const makeId = makeObj.id;

    // Step 2: Get models for this make
    const modelsRes = await fetch(`https://api.carspecsapi.com/v2/cars/makes/${makeId}/models`, {
      headers: { "X-Api-Key": API_KEY }
    });
    const modelsData = await modelsRes.json();
    const models = modelsData.data;

    if (!models || models.length === 0) {
      countP.textContent = "No models found for this brand.";
      return;
    }

    countP.textContent = `Found ${models.length} models`;

    // Step 3: Get details for each model (limit first 10 to avoid too many requests)
    for (const model of models.slice(0, 10)) {
      const detailsRes = await fetch(`https://api.carspecsapi.com/v2/cars/models/${model.id}/details`, {
        headers: { "X-Api-Key": API_KEY }
      });
      const detailsData = await detailsRes.json();
      const car = detailsData.data;

      const pre = document.createElement("pre");
      pre.textContent =
`Make: ${car.make || "N/A"}
Model: ${car.model || "N/A"}
Year: ${car.year || "N/A"}
Engine: ${car.engine || "N/A"}
Horsepower: ${car.horsepower || "N/A"}
Torque: ${car.torque || "N/A"}
Transmission: ${car.transmission || "N/A"}
Fuel Type: ${car.fuel_type || "N/A"}
Weight: ${car.weight || "N/A"}
Dimensions: ${car.dimensions || "N/A"}
-----------------------------`;

      resultsDiv.appendChild(pre);
    }

    countP.textContent = `Showing details for ${Math.min(models.length, 10)} models`;

  } catch (error) {
    console.error(error);
    countP.textContent = "Error fetching car data.";
  }
}

#car specs api last
