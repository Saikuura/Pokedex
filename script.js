const midSect = document.getElementById("mid-sect");

const pokemonData = 'https://pokeapi.co/api/v2/pokemon?limit=151';

let arr = [];

// async function getPokemon() {
//   fetch(pokemonData).then(response => response.json()).then(allpokemon => console.log(allpokemon))
// }

async function getPokemon(url) {
  try {

    const response = await fetch(url);
    const data = await response.json();

    if (data.count) {
      lastPage = data.count;
    }
    await fetchAndDisplayThreePokemon(data.results);

    console.log("data:", data);
  } catch (error) {
    console.error(error);
  }
}

async function getSingelPokemon(pokemon) {
  try {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

const fetchEachPokemon = async (pokemonList) => {
  for (let i = 0; i < pokemonList.length; i++) {
    arr.push(await getSingelPokemon(pokemonList[i].name));
  }
  console.log(arr)
  showPokemon(arr)
};

const fetchAndDisplayThreePokemon = async (pokemonList) => {
  for (let i = 0; i < pokemonList.length; i += 3) {
    const threePokemon = pokemonList.slice(i, i + 3)
    await fetchThreePokemon(threePokemon)
  }
  console.log(arr)
  showPokemon(arr)
};

async function fetchThreePokemon(pokemonList) {
  for (let i = 0; i < pokemonList.length; i++) {
    arr.push(await getSingelPokemon(pokemonList[i].name));
  }
  console.log(arr);
}

const showPokemon = (pokemon) => {
  pokemon.forEach((each) => {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card');
    cardContainer.innerHTML = `
      <h1>${each.name}</h1>
    `;
    midSect.appendChild(cardContainer);
  });
};

getPokemon(pokemonData);