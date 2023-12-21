const card = document.getElementById("Card1");


const pokemonData = 'https://pokeapi.co/api/v2/pokemon?limit=151';



let arr = [];

async function getPokemon() {
  fetch(pokemonData).then(response => response.json()).then(allpokemon =>console.log(allpokemon))
}



async function getPokemon(url) {
  try {
    
    const response = await fetch(url);
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