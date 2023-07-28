// Write your helper functions here!
//scriptHelper.js

require('isomorphic-fetch');

// scriptHelper.js
function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    document.getElementById("missionTarget").innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
    `;
}


function validateInput(testInput) {
    if (String(testInput).trim() === '') {
        return 'Empty';
    } else if (isNaN(testInput)) {
        return 'Not a Number';
    } else {
        return 'Is a Number';
    }
}

function formSubmission(document, planets, pilot, copilot, fuelLevel, cargoLevel) {
    // Validating user inputs
    let pilotValidation = validateInput(pilot);
    let copilotValidation = validateInput(copilot);
    let fuelLevelValidation = validateInput(fuelLevel);
    let cargoLevelValidation = validateInput(cargoLevel);

    // Checking if empty fields
    if (pilotValidation === 'Empty' || copilotValidation === 'Empty' || fuelLevelValidation === 'Empty' || cargoLevelValidation === 'Empty') {
        alert('All fields are required!');
        return;
    }

    // Checking if fuel level and cargo level are numbers
    if (fuelLevelValidation === 'Not a Number' || cargoLevelValidation === 'Not a Number') {
        alert('Fuel Level and Cargo Mass must be numbers!');
        return;
    }

    // Converting fuelLevel and cargoLevel to numbers
    let fuelLevelNumber = Number(fuelLevel);
    let cargoLevelNumber = Number(cargoLevel);

    // Update shuttle requirements
    document.getElementById('pilotStatus').textContent = `Pilot ${pilot} is ready for launch`;
    document.getElementById('copilotStatus').textContent = `Co-pilot ${copilot} is ready for launch`;

    if (fuelLevelNumber < 10000) {
        document.getElementById('faultyItems').style.visibility = 'visible';
        document.getElementById('fuelStatus').textContent = 'Fuel level too low for launch';
        document.getElementById('launchStatus').textContent = 'Shuttle Not Ready for Launch';
        document.getElementById('launchStatus').style.color = 'rgb(199, 37, 78)';
    } else {
        document.getElementById('fuelStatus').textContent = 'Fuel level high enough for launch';
    }

    if (cargoLevelNumber > 10000) {
        document.getElementById('faultyItems').style.visibility = 'visible';
        document.getElementById('cargoStatus').textContent = 'Cargo mass too heavy for launch';
        document.getElementById('launchStatus').textContent = 'Shuttle Not Ready for Launch';
        document.getElementById('launchStatus').style.color = 'rgb(199, 37, 78)';
    } else {
        document.getElementById('cargoStatus').textContent = 'Cargo mass low enough for launch';
    }

    if (fuelLevelNumber >= 10000 && cargoLevelNumber <= 10000) {
        document.getElementById('launchStatus').textContent = 'Shuttle is Ready for Launch';
        document.getElementById('launchStatus').style.color = 'rgb(65, 159, 106)';
    }
}

async function myFetch() {
    let planetsReturned;
    try {
        let response = await fetch("https://handlers.education.launchcode.org/static/planets.json");
        planetsReturned = await response.json();
    } catch (error) {
        console.log(error);
    }
    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random() * planets.length);
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
