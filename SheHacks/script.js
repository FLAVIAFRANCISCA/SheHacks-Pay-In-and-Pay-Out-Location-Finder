document
  .getElementById("locationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const location = document.getElementById("location").value;

    // Here you'd call the API to get the locations based on user input.
    // For now, we'll just simulate a result.
    const resultsSection = document.getElementById("results");
    resultsSection.innerHTML = `
        <h3>Results for "${location}"</h3>
        <ul>
            <li>Location 1 - Address 1</li>
            <li>Location 2 - Address 2</li>
            <li>Location 3 - Address 3</li>
        </ul>
    `;
  });
