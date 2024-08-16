const apiUrl = window.location.origin + '/api';
console.log('scripts.js is loaded');

// Function to get total flight count
function getFlightCount() {
    console.log('Getting flight count');
    fetch(`${apiUrl}/flights/count`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('flightCount').innerText = `Total number of flights: ${data}`;
        })
        .catch(error => console.error('Error fetching flight count:', error));
}

// Function to get outbound flight count
function getOutboundFlightCount() {
    console.log('Getting outbound flight count');
    fetch(`${apiUrl}/flights/outbound/count`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('outboundFlightCount').innerText = `Number of outbound flights: ${data}`;
        })
        .catch(error => console.error('Error fetching outbound flight count:', error));
}


// Function to get inbound flight count
function getInboundFlightCount() {
    console.log('Getting inbound flight count');
    fetch(`${apiUrl}/flights/inbound/count`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('inboundFlightCount').innerText = `Number of inbound flights: ${data}`;
        })
        .catch(error => console.error('Error fetching inbound flight count:', error));
}

// Function to count flights from a specific country
async function countFlightsByCountry() {
    const country = document.getElementById('countryInput').value.toUpperCase();
    if (!country) {
        alert('Please enter a country name');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/flights/country/count?country=${country}`);
        const data = await response.json();
        if (response.ok) {
            document.getElementById('flightCountByCountry').innerText = `Number of flights from country: ${data}`;
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Failed to fetch flight data');
    }
}

// Function to outbound count flights from a specific country
async function outboundCountFlightsByCountry() {
    const country = document.getElementById('outboundCountryInput').value.toUpperCase();
    if (!country) {
        alert('Please enter a country name');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/flights/country/outbound/count?country=${country}`);
        const data = await response.json();
        if (response.ok) {
            document.getElementById('outboundFlightCountByCountry').innerText = `Number of outbound flights from country: ${data}`;
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Failed to fetch flight data');
    }
}

// Function to inbound count flights from a specific country
async function inboundCountFlightsByCountry() {
    const country = document.getElementById('inboundCountryInput').value.toUpperCase();
    if (!country) {
        alert('Please enter a country name');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/flights/country/inbound/count?country=${country}`);
        const data = await response.json();
        if (response.ok) {
            document.getElementById('inboundFlightCountByCountry').innerText = `Number of inbound flights from country: ${data}`;
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Failed to fetch flight data');
    }
}

// Function to get delayed flight count
function getDelayedFlightCount() {
    console.log('Getting delayed flight count');
    fetch(`${apiUrl}/flights/delayed/count`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('delayedFlightsCount').innerText = `Number of delayed flights: ${data}`;
        })
        .catch(error => console.error('Error fetching delayed flight count:', error));
}

// Function to get the most popular destination
function getPopularDestination() {
    fetch(`${apiUrl}/flights/destination/popular`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('popularDestination').innerText = `Most popular destination: ${data}`;
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
            document.getElementById('quickGetaway').innerText = `Departure flight: ${departure}\n\nArrival flight: ${arrival}`;
        })
        .catch(error => console.error('Error fetching quick getaway flights:', error));
}
