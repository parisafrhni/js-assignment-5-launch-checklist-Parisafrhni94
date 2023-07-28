// Write your JavaScript code here!
//script.js
// Write your JavaScript code here!
//script.js
window.addEventListener("load", function () {

    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet from the list of planets and add that information to your destination.
        let destination = pickPlanet(listedPlanets);
        addDestinationInfo(
            document,
            destination.name,
            destination.diameter,
            destination.star,
            destination.distance,
            destination.moons,
            destination.image
        );

        // Get the form and add a submit event listener
        let form = document.querySelector("form");
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            // Rest of the formSubmission code here...
            let pilot = document.querySelector("input[name=pilotName]").value;
            let copilot = document.querySelector("input[name=copilotName]").value;
            let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
            let cargoLevel = document.querySelector("input[name=cargoMass]").value;

            formSubmission(document, listedPlanets, pilot, copilot, fuelLevel, cargoLevel);
        });
    });

});
