const cards  = document.getElementById("card");
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
  if (currentPage <= 151) {
    let currentPage = +1;
  }
});

nextButton.addEventListener("click", () => {
  if (currentPage >= 1) {
    let currentPage = -1;
  }
});

// search.addEventListener("keypress", ()

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
    displayPokemon(data.result);
  } catch (error) {
    alert("Something went terribly wrong! HIDE THE CHILDREN!!!", error);
  }
}

// getPokemon(apiUrl);

// async function displayPokemon() {
//     cards.innerHTML = ""
//     for ()
// }

//! INSERT POKEMON INTO CARDS ///

async function displayPokemon(PokemonNr, theCard) {
    
    // theCard.innerHTML = ""

    const pokemonDetails = getPokemon(apiUrl).url

    const containerEL = document.createElement("div")
    const titleEl = document.createElement("h2")
    titleEl.textContent = `${PokemonNr.pokemonDetails.id}, ${PokemonNr.name}`
    const imageEl = document.createElement("img")
    imageEl.src = pokemonDetails.sprites.other["official-artwork"].front_default
    

}

// displayPokemon()

