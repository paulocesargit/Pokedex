
const pokemonName = document.querySelector('.pokemonName');
const pokemonNumber = document.querySelector('.pokemonNumber');
const pokemonImage = document.querySelector('.pokemonImage');

const form = document.querySelector('.form');
const input = document.querySelector('.inputSearch');

const buttonPrev = document.querySelector('.btnPrev');
const buttonNext = document.querySelector('.btnNext');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {

        const data = await APIResponse.json();

    return data; 
    }
}

const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);

    if (data && data.id <= 649) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    }else {

        pokemonName.innerHTML = 'Not found :&#40;';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
    }    
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
      searchPokemon -= 1;
      renderPokemon(searchPokemon);
      buttonNext.disabled = false
      buttonNext.style.background = 'white'
    }
    
});

buttonNext.addEventListener('click', () => {
    if (searchPokemon >= 649){
        buttonNext.disabled = true
        buttonNext.style.background = 'darkgray'
        renderPokemon(searchPokemon);
    }else {
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    }
});

renderPokemon(searchPokemon);
