var apiUrl = "https://rickandmortyapi.com/api/character";
var nextUrl = undefined;
var prevUrl = undefined;

async function fetchCharacterJSON() {
    const response = await fetch(apiUrl);
    const characters = await response.json();
    allItems = [];

        nextUrl = characters.info.next;
        prevUrl = characters.info.prev;

        characters.results.forEach((item) => {

            //Create img
            const image = document.createElement("img");
            image.classList.add('character-img');
            image.src = item.image;

            //Create info container
            const infoContainer = document.createElement("div");
            infoContainer.classList.add("card-info");

            //Create name container
            const charNameContainer = document.createElement("div");
            charNameContainer.classList.add('character-name--container');

            //Create name h2
            const charName = document.createElement("h2");
            charName.classList.add('character-name');
            charName.textContent = item.name;

        
            charNameContainer.append(charName);


            //Create status-specie container
            const statusContainer = document.createElement("div");
            statusContainer.classList.add("status")
            const statusIcon = document.createElement("div");
            const status = document.createElement("h5");
            status.textContent = item.status + " - " + item.species;

            if (item.status == "Alive") {
                statusIcon.style.background = 'rgb(85 204 68)';
            } else if (item.status == "Dead") {
                statusIcon.style.background = "#ff0100";
            } else {
                statusIcon.style.background = "#ffffff";
            }

            statusContainer.append(statusIcon, status);


            //Create location
            const locationContainer = document.createElement("div");
            locationContainer.classList.add("location")
            const locationIcon = document.createElement("img");
            locationIcon.src = "./images/location-icon.png";
            const locationText = document.createElement("h5");
            locationText.textContent = item.location.name;

            locationContainer.append(locationIcon, locationText);

            //Create flex container
            const flexContainer = document.createElement("div");
            flexContainer.classList.add("flex-location--container")
            flexContainer.append(statusContainer, locationContainer);

            
            infoContainer.append(charNameContainer, flexContainer);

            //create card container

            const container = document.createElement("article");
            container.classList.add('character-card');
            container.append(image, infoContainer);

            allItems.push(container);
           });

           document.querySelector(".main-cards--container").append(...allItems)
    }

fetchCharacterJSON();

function loadMore() {
    if (nextUrl != undefined) {
    apiUrl = nextUrl;
    fetchCharacterJSON();
    } else {
        console.log("No more characters!")
    }
}