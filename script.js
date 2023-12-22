const card0 = document.getElementById("card0");
const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");

const prevButton = document.getElementById("arrowLeft");
const nextButton = document.getElementById("arrowRight");
const search = document.getElementById("searchInput");

const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=151";

// Pages
let currentPage = 1;
let prevPage = currentPage - 1;
let nextPage = currentPage + 1;
let scrollLength = 3;
const totalPages = Math.floor(151);

//! FUNCTIONAL MEDIA QUERIES ///
const mediaQuery = window.matchMedia("(min-width: 1440px)");
console.log(mediaQuery);

function findScrollLength() {
  if (mediaQuery.matches) {
    scrollLength = 3;
  } else {
    scrollLength = 1;
  }
}

//! MANIPULATE PAGES //
prevButton.addEventListener("click", () => {
  findScrollLength();
  if (currentPage > 1) {
    currentPage -= scrollLength;
    getPokemon(apiUrl);
  }
});

nextButton.addEventListener("click", () => {
  findScrollLength();
  if (currentPage < totalPages - 1) {
    currentPage += scrollLength;
    getPokemon(apiUrl);
  }
});

document.addEventListener("keydown", function (event) {
  findScrollLength();
  if (currentPage > 1 && event.keyCode === 37) {
    currentPage -= scrollLength;
    getPokemon(apiUrl);
  }
  if (currentPage < totalPages - 1 && event.keyCode === 39) {
    findScrollLength();
    currentPage += scrollLength;
    getPokemon(apiUrl);
  }
});

//! FUNCTION FOR GETTING THE POKEMON DATA ///

async function getPokemon(url) {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      if ((response, status === 404)) {
        alert("Bruh wtf happened? I can't find anything!");
      }

      return;
    }
    const data = await response.json();

    console.log(data.count, data.next, data.previous);
    console.log(data);

    displayPokemon(data.results[currentPage - 1], card0);
    displayPokemon(data.results[currentPage], card1);
    displayPokemon(data.results[currentPage + 1], card2);
  } catch (error) {
    alert("Something went terribly wrong! HIDE THE CHILDREN!!!", error);
  }
}

getPokemon(apiUrl);

//!                           ///
//* INSERT POKEMON INTO CARDS ///
//!                           ///

async function displayPokemon(pokemonNr, theCard) {
  theCard.innerHTML = "";
  // console.log(pokemonNr);

  //! FETCHING THE INFORMATION ///

  if (currentPage >= 1) {
    const response = await fetch(pokemonNr.url);
    const pokeDetails = await response.json();
    console.log(pokeDetails);
    const pokeName = pokeDetails.name.toUpperCase(pokeDetails.name);
    console.log(pokeName);

    //! CREATING THE CONTENT ///

    const containerEl = document.createElement("div");
    const titleEl = document.createElement("h2");
    titleEl.textContent = `#${pokeDetails.id}: ${pokeName}`;
    const imageEl = document.createElement("img");
    imageEl.src = pokeDetails.sprites.other["official-artwork"].front_default;
    imageEl.alt = "Image of " + pokemonNr.name;
    const typeContainer = document.createElement("h3");
    typeContainer.class = "typeContainer";

    //! TYPES ///

    if (pokeDetails.types.length === 2) {
      const type1name = pokeDetails.types[0].type.name.toUpperCase(
        pokeDetails.types[0].type.name
      );
      const type2name = pokeDetails.types[1].type.name.toUpperCase(
        pokeDetails.types[1].type.name
      );
      typeContainer.append("h3");
      typeContainer.textContent = `TYPE: ${type1name} and ${type2name}`;
    } else {
      const type1name = pokeDetails.types[0].type.name.toUpperCase(
        pokeDetails.types[0].type.name
      );
      typeContainer.textContent =`TYPE: ${type1name}`;
    }

    //! INSERTION INTO HTML ///

    containerEl.append(titleEl, imageEl, typeContainer);
    theCard.append(containerEl);
  }
}


let nameList = [];

async function fetchNameList() {
  try{
    const response = await fetch(apiUrl);
    if(!response.ok) {
      throw new Error('Failed to fetch names');
    }
    const data = await response.json();
    pokemonList = data.results;
  } catch (error) {
    console.error('Error fetching names', error);
  }
}

fetchNameList();

function handleSearch() {
  const searchTerm = search.value.toLowerCase().trim();

  if (searchTerm === '') {
    alert('Please enter a Pokemon name or ID for search.');
    return;
  }

  
  const isNumeric = /^\d+¤/.test(searchTerm);
  
  
  if (isNumeric) {
    const pokemonId = parseInt(searchTerm);
    if (pokemonId >= 1 && pokemonId <= totalPages) {
      currentPage = pokemonId;
      getPokemon(apiUrl);
    } else {
      alert('Please enter a valid Pokemon ID.');
    }
  } else {
    const foundPokemon = nameList.find(pokemon => pokemon.name === searchTerm);
    if(foundPokemon) {
      const url = foundPokemon.url;
      getPokemon(url);
    } else {
      alert('Pokemon not found. Please enter a valid Pokemon name');
    }
  }
}
search.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});

// ...
/*function pokemonId(id) {
  if (id < 10) {
    return `#00${id}`;
  } else if (id < 100) {
    return `#0${id}`
  } else {
    return `#${id}`
  }
}

async function searchPokemon(term) {
  const isNumber = /^\d+$/.test(term);
  if (isNumber) {
    const id = parseInt(term);
    if (id > 0 && id <= 151) {
      displayPokemon(id);
    } else {
      return null;
    }
  } else {
    const pokemon = await getPokemon(term.toLowerCase());
    if (pokemon && pokemon.id <= 151) {
      displaySearchedPokemon(pokemon, card0);
    } else{
      return null;
    }
  }
}

async function displaySearchedPokemon(pokemon) {
  theCard.innerHTML = "";
  // console.log(pokemonNr);

  //! FETCHING THE INFORMATION ///
  if (theCard){
    theCard.innerHTML = "";
  }
  if (currentPage >= 1) {
    const response = await fetch(pokemonNr.url);
    const pokeDetails = await response.json();
    console.log(pokeDetails);
    const pokeName = pokeDetails.name.toUpperCase(pokeDetails.name);
    console.log(pokeName);

    //! CREATING THE CONTENT ///

    const containerEl = document.createElement("div");
    const titleEl = document.createElement("h2");
    titleEl.textContent = `#${pokeDetails.id}: ${pokeName}`;
    const imageEl = document.createElement("img");
    imageEl.src = pokeDetails.sprites.other["official-artwork"].front_default;
    imageEl.alt = "Image of " + pokemonNr.name;
    const typeContainer = document.createElement("h3");
    typeContainer.class = "typeContainer";

    //! TYPES ///

    if (pokeDetails.types.length === 2) {
      const type1name = pokeDetails.types[0].type.name.toUpperCase(
        pokeDetails.types[0].type.name
      );
      const type2name = pokeDetails.types[1].type.name.toUpperCase(
        pokeDetails.types[1].type.name
      );
      typeContainer.append("h3");
      typeContainer.textContent = `TYPE: ${type1name} and ${type2name}`;
    } else {
      const type1name = pokeDetails.types[0].type.name.toUpperCase(
        pokeDetails.types[0].type.name
      );
      typeContainer.textContent =`TYPE: ${type1name}`;
    }

    //! INSERTION INTO HTML ///

    containerEl.append(titleEl, imageEl, typeContainer);
    theCard.append(containerEl);
  }
}

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const searchTerm = search.value.trim().toLowerCase();
    if(searchTerm !== "") {
      searchPokemon(searchTerm);
    }
  }
});*/