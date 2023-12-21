const midSect = document.getElementById("mid-sect");
const baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';
let currentPokemonIndex = 0;
const pokemonPerPage = 3;


async function getPokemonList(url) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    // update page variabels:
    lastPage = data.count
    console.log(data)
    console.log(lastPage, "next: ", data.next, "previous: ", data.previous)
    displayPokemonList(data.results)
    // return data
  }
  catch (error) {
    console.log(error)
  }
}

getPokemonList(baseUrl)

async function displayPokemonList(pokemonList) {
  midSect.innerHTML = ""

  for (let i = currentPokemonIndex; i < currentPokemonIndex + pokemonPerPage; i++) {
    if (i >= pokemonList.length) {
      break;
    }
    const pokemon = pokemonList[i]
    const container = document.createElement("div")
    container.classList.add("card")

    const response = await fetch(pokemon.url)
    const pokemonDetails = await response.json()
    console.log(pokemonDetails)

    const sprite = pokemonDetails.sprites.other["official-artwork"].front_default
    const image = document.createElement("img")
    image.src = sprite
    image.classList.add("sprite")

    const name = document.createElement("h2")
    name.textContent = `${pokemonDetails.id} ${pokemonDetails.name}`
    name.id = pokemon.name
    container.appendChild(name)
    container.appendChild(image)
    midSect.appendChild(container)
  }
}
