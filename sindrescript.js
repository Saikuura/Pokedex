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
    currentPage = -3;
  getPokemon(apiUrl);
} 
});

nextButton.addEventListener("click", () => {
  if (currentPage >= 1) {
    currentPage = +3;
  getPokemon(apiUrl);
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
    console.log(data.results[currentPage - 1])
    displayPokemon(data.results[currentPage - 1], card0);
    displayPokemon(data.results[currentPage], card1);
    displayPokemon(data.results[currentPage + 1], card2);

  } catch (error) {
    alert("Something went terribly wrong! HIDE THE CHILDREN!!!", error);
  }
}

getPokemon(apiUrl);

// async function displayPokemon() {
//     cards.innerHTML = ""
//     for ()
// }

//! INSERT POKEMON INTO CARDS ///

async function displayPokemon(pokemonNr, theCard) {
  theCard.innerHTML = ""

  const response = await fetch(pokemonNr.url)
  const pokeDetails = await response.json()

  const containerEl = document.createElement("div")
    const titleEl = document.createElement("h2")
  titleEl.textContent = `${pokeDetails.id}, ${pokeDetails.name}`
    const imageEl = document.createElement("img")
  imageEl.src = pokeDetails.sprites.other["official-artwork"].front_default
  imageEl.alt = "Image of " + pokemonNr.name

  containerEl.append(titleEl, imageEl)
  theCard.append(containerEl)
}




// displayPokemon()

