document.addEventListener("DOMContentLoaded", function () {
  const partnerSelect = document.getElementById("partner");
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const partnersApiUrl =
    "https://api-ubt.mukuru.com/taurus/v1/resources/pay-out-partners";

  // Fetching the pay-out partners
  fetch(proxyUrl + partnersApiUrl, {
    method: "GET",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Pay-out partners:", data);
      if (Array.isArray(data)) {
        data.forEach((partner) => {
          const option = document.createElement("option");
          option.value = partner.guid;
          option.textContent = partner.name;
          partnerSelect.appendChild(option);
        });
      } else {
        console.error("Unexpected API response format:", data);
      }
    })
    .catch((error) => console.error("Error fetching pay-out partners:", error));
});

document
  .getElementById("locationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const partnerGuid = document.getElementById("partner").value;
    const locationQuery = document.getElementById("location").value;

    if (!partnerGuid) {
      alert("Please select a partner.");
      return;
    }

    if (!locationQuery) {
      alert("Please enter a location.");
      return;
    }

    // URL for fetching locations based on selected partner
    const locationsApiUrl = `https://api-ubt.mukuru.com/taurus/v1/resources/pay-out-partners/${partnerGuid}/locations`;

    fetch(proxyUrl + locationsApiUrl, {
      method: "GET",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((locations) => {
        console.log("Locations received:", locations);
        const filteredLocations = locations.filter((loc) =>
          loc.address.toLowerCase().includes(locationQuery.toLowerCase())
        );

        const resultsSection = document.getElementById("results");
        resultsSection.innerHTML = `<h3>Results for "${locationQuery}" with ${
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
