const apiUrl = 'http://localhost:3000/api';

// Function to get flight count from a specific country
function getFlightCount() {
    const country = document.getElementById('countryInput').value;
    fetch(`${apiUrl}/flights/country/count?country=${encodeURIComponent(country)}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('flightCount').innerText = `Number of flights: ${data.count}`;
        })
        .catch(error => console.error('Error fetching flight count:', error));
}

// Function to get the most popular destination
function getPopularDestination() {
    fetch(`${apiUrl}/flights/destination/popular`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('popularDestination').innerText = `Most popular destination: ${data.city}`;
        })
        .catch(error => console.error('Error fetching popular destination:', error));
}

// Function to get quick getaway flights
function getQuickGetaway() {
    fetch(`${apiUrl}/flights/getaway`)
        .then(response => response.json())
        .then(data => {
            const departure = data.departure || 'None';
            const arrival = data.arrival || 'None';
            document.getElementById('quickGetaway').innerText = `Departure flight: ${departure}, Arrival flight: ${arrival}`;
        })
        .catch(error => console.error('Error fetching quick getaway flights:', error));
}
