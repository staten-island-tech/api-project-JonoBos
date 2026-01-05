fetch("https://api.api-ninjas.com/v1/aircraft?model=A320", {
  headers: {
    "X-Api-Key": "Yp9oy59INOIyPeLPS5OCaA==EGp9wUtpORuYbG7s"
  }
})
  .then(response => response.json())
  .then(data => {
    console.log("Aircraft data:", data);
  })
  .catch(error => {
    console.error("Error:", error);
  });
