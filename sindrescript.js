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

//! MANIPULATE PAGES //
prevButton.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage -= 3;
      getPokemon(apiUrl);
    }
  });
  
  nextButton.addEventListener("click", () => {
    const totalPages = Math.floor(151);
    if (currentPage < totalPages - 1) {
      currentPage += 3;
      getPokemon(apiUrl);
    }
  });

let scrollLength = 3;
const totalPages = Math.floor(151);

//! FUNCTIONAL MEDIA QUERIES ///
const mediaQuery = window.matchMedia("(min-width: 768px)");
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
    // console.log(data.results[currentPage - 1])
    displayPokemon(data.results[currentPage - 1], card0);
    displayPokemon(data.results[currentPage], card1);
    displayPokemon(data.results[currentPage + 1], card2);
  } catch (error) {
    alert("Something went terribly wrong! HIDE THE CHILDREN!!!", error);
  }
}

getPokemon(apiUrl);

//! INSERT POKEMON INTO CARDS ///

async function displayPokemon(pokemonNr, theCard) {
  theCard.innerHTML = "";

  console.log(pokemonNr);

  if (currentPage >= 1) {
    const response = await fetch(pokemonNr.url);
    const pokeDetails = await response.json();
console.log(pokeDetails)

    const containerEl = document.createElement("div");
    const titleEl = document.createElement("h2");
    titleEl.textContent = `${pokeDetails.id}, ${pokeDetails.name}`;
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