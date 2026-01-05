const manufacturers = [
  "Boeing",
  "Airbus",
  "Lockheed",
  "Embraer",
  "Bombardier",
  "Dassault"
];

const headers = {
  "X-Api-Key": "Yp9oy59INOIyPeLPS5OCaA==EGp9wUtpORuYbG7s"
};

async function getAircraftByManufacturers() {
  let allAircraft = [];

  for (const company of manufacturers) {
    const res = await fetch(
      `https://api.api-ninjas.com/v1/aircraft?manufacturer=${company}`,
      { headers }
    );

    const data = await res.json();

    console.log(` ${company}:`, data.length, "aircraft");
    console.log(data);

    allAircraft.push(...data);

    // small delay to avoid rate limits
    await new Promise(r => setTimeout(r, 300));
  }

  console.log(" TOTAL AIRCRAFT COLLECTED:", allAircraft.length);
  console.log(allAircraft);
}

getAircraftByManufacturers();