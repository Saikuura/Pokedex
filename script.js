const card = document.getElementById("Card1");
const arrowLeft = document.getElementById("arr-left")
const arrowRight = document.getElementById("arr-right")

const pokemonData = "https://pokeapi.co/api/v2/pokemon?";
let perPage = 3;

let currentPage = 0;
let lastPage = 0;


arrowRight.addEventListener("click", () => {
  if (currentPage + perPage < lastPage) {
    currentPage += perPage 
    getPokemon(`${pokemonData}offset=${currentPage}&limit=${perPage}`)
  } else {
    currentPage = 0
    getPokemon(pokemonData);
  }
}) 


let arr = [];

async function getPokemon(apiUrl) {
  try {
    
    const response = await fetch(apiUrl);
    const data = await response.json();

    if(data.count) {
      lastPage = data.count;
    }
    await fetchEachPokemon(data.results);

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

/*const createPokemon = () => {
  let pokemon = {
    name: arr.name,
    abilities: arr.abilities
  }
  return pokemon
}*/

const showPokemon = (pokemon) => {
  const output = card;
  const map = pokemon.map((each) => {
    return `
      <div>
        <h1>${each.name}</h1>
      </div>
    `;
  })
  .join('')

  return output.innerHTML = map
};

getPokemon(pokemonData);