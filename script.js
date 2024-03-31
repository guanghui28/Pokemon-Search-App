const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const image = document.getElementById("image");
const weightText = document.getElementById("weight");
const heightText = document.getElementById("height");
const typesText = document.getElementById("types");
const hpText = document.getElementById("hp");
const attackText = document.getElementById("attack");
const defenseText = document.getElementById("defense");
const specialAttackText = document.getElementById("special-attack");
const specialDefenseText = document.getElementById("special-defense");
const speedText = document.getElementById("speed");

const URL = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const generateMarkup = (data) => {
    const { height, weight, id, stats, types, name, sprites } = data;
    console.log(data);
    weightText.textContent = `Weight: ${weight}`;
    heightText.textContent = `Height: ${height}`;
    pokemonName.textContent = name.toUpperCase();
    pokemonId.textContent = `#${id}`;
    image.innerHTML = `<img id="sprite" src="${sprites.front_default}" alt="">`;
    // typesText.innerHTML = types.
    typesText.innerHTML = types
        .map(
            (type) => `<span class="${type.type.name}">${type.type.name}</span>`
        )
        .join("");
    hpText.textContent = stats[0].base_stat;
    attackText.textContent = stats[1].base_stat;
    defenseText.textContent = stats[2].base_stat;
    specialAttackText.textContent = stats[3].base_stat;
    specialDefenseText.textContent = stats[4].base_stat;
    speedText.textContent = stats[5].base_stat;
};

const clearMarkUp = () => {
    weightText.textContent = "";
    heightText.textContent = "";
    pokemonName.textContent = "";
    pokemonId.textContent = "";
    image.innerHTML = "";
    typesText.innerHTML = "";
    hpText.textContent = "";
    attackText.textContent = "";
    defenseText.textContent = "";
    specialAttackText.textContent = "";
    specialDefenseText.textContent = "";
    speedText.textContent = "";
};

const fetchData = async (nameOrId) => {
    try {
        const res = await fetch(`${URL}/${nameOrId}`);
        if (res.status === 404) {
            alert("Pokémon not found");
            searchInput.value = "";
            clearMarkUp();
            return;
        }
        const data = await res.json();
        generateMarkup(data);
    } catch (err) {
        alert(err);
    }
};

const searchPokemon = () => {
    const nameOrId = searchInput.value.toLowerCase();
    fetchData(nameOrId);
};

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchPokemon;
    }
});
searchBtn.addEventListener("click", searchPokemon);
