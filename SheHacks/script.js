document.addEventListener("DOMContentLoaded", function () {
  const partnerSelect = document.getElementById("partner");

  // fetching the partners

  fetch("https://api-ubt.mukuru.com/taurus/v1/resources/pay-out-partners")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((partner) => {
        const option = document.createElement("option");
        option.value = partner.guid; // Assuming 'guid' is the unique identifier
        option.textContent = partner.name;
        partnerSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching pay-out partners:", error));
});

document
  .getElementById("locationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const partnerGuid = document.getElementById("partner").value;
    const location = document.getElementById("location").value;

    //    Fetching the location

    fetch(
      `https://api-ubt.mukuru.com/taurus/v1/resources/pay-out-partners/${partnerGuid}/locations`
    )
      .then((response) => response.json())
      .then((locations) => {
        const filteredLocations = locations.filter((loc) =>
          loc.address.toLowerCase().includes(location.toLowerCase())
        );

        const resultsSection = document.getElementById("results");
        resultsSection.innerHTML = `<h3>Results for "${location}" with ${
          partnerSelect.options[partnerSelect.selectedIndex].text
        }:</h3>`;
        const resultsList = document.createElement("ul");
        filteredLocations.forEach((loc) => {
          const listItem = document.createElement("li");
          listItem.textContent = `${loc.name} - ${loc.address}`;
          resultsList.appendChild(listItem);
        });
        resultsSection.appendChild(resultsList);
      })
      .catch((error) => console.error("Error fetching locations:", error));
  });


  document.getElementById('locationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const location = document.getElementById('location').value;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const latitude = data[0].lat;
                const longitude = data[0].lon;
                document.getElementById('result').innerHTML = `
                    <h2>Coordinates:</h2>
                    Latitude: ${latitude}<br>
                    Longitude: ${longitude}
                `;
            } else {
                document.getElementById('result').innerHTML = 'No results found.';
            }
        })
        .catch(error => {
            document.getElementById('result').innerHTML = 'Error fetching coordinates: ' + error.message;
        });
});
