const pokemonName = document.querySelector(".pokemon-name");
const pokemonNumber = document.querySelector(".pokemon-number");
const pokemonImage = document.querySelector(".pokemon-image");
const pokemonInput = document.querySelector(".input-search");
const buttonNext = document.querySelector(".btn-next");
const buttonPrev = document.querySelector(".btn-prev");
const keyPressed = document.querySelector(".form");
const url = "https://pokeapi.co/api/v2/pokemon/";

async function fetchPokemon(pokemon) {
  const response = await fetch(`${url}${pokemon}`);
  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
}

async function pokemonInfos(pokemon) {
  const renderPokemon = await fetchPokemon(pokemon);
  if (renderPokemon) {
    pokemonName.innerHTML = renderPokemon.name;
    pokemonNumber.innerHTML = renderPokemon.id;
    pokemonImage.src =
      renderPokemon["sprites"]["versions"]["generation-v"]["black-white"][
        "animated"
      ]["front_default"];
  } else {
    pokemonName.innerHTML = "Not found :C";
    pokemonNumber.innerHTML = "";
    pokemonImage.remove();
  }
}

keyPressed.addEventListener("submit", function (e) {
  e.preventDefault();
  pokemonInfos(pokemonInput.value.toLowerCase());
  pokemonInput.value = "";
});

buttonNext.addEventListener("click", function () {
  const id = Number(pokemonNumber.innerHTML) + 1;
  if (id < 649) {
    pokemonInfos(id);
  }
});

buttonPrev.addEventListener("click", function () {
  const id = Number(pokemonNumber.innerHTML);
  if (id > 1) {
    pokemonInfos(id - 1);
  }
});
