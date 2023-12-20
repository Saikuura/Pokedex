const pokemonData = "https://pokeapi.co/api/v2/pokemon/?limit=386";

async function getPokemon() {
    try {
      //first fetch to get initial data and the url for the second fetch:
      const response = await fetch(pokemonData);
      const data = await response.json();
   
      console.log("data:", data);

    } catch (error) {
      console.error(error);
    }
  }
  getPokemon();


  async function getSingelPokemon(pokemon) {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon/1/')
  }