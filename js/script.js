//constantes criadas para fazer alterações ao decorrer do projeto
const pokemonName = document.querySelector('.pokemonName');
const pokemonNumber = document.querySelector('.pokemonNumber');
const pokemonImage = document.querySelector('.pokemonImage');
//constantes feitas para pegar o formulário e input para adicionar eventos
const form = document.querySelector('.form');
const input = document.querySelector('.inputSearch');
//constantes para pegar o botão e adicionar eventos
const buttonPrev = document.querySelector('.btnPrev');
const buttonNext = document.querySelector('.btnNext');
//variável feita para iniciar com o primeiro pokemon existente no projeto
let searchPokemon = 1;

// funções assíncronas (async) acessam ou buscam algum tipo de recurso em um dispositivo externo (ex: API)
// arrow function criada para buscar o pokemon e seus dados
const fetchPokemon = async (pokemon) => {
//aviso de carregamento de busca e string vazia ao pesquisar novo
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    
    //buscando API
    //await > enquanto não houver resposta dessa função ele não lê o restante do código
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    //se o status for igual a 200 significa que a busca houve retorno
    if (APIResponse.status === 200) {
        //método para extrair respostas da API (json)
        const data = await APIResponse.json();
    //return finaliza a execução de uma função e especifica os valores que devem ser retornados para onde a função foi chamada
    return data; 
    }
}
//função para buscar e renderizar o pokemon na tela
const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);
    //se encontrar execute isso
    if (data && data.id <= 649) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    }else {
    //se não encontrar execute isso    
        pokemonName.innerHTML = 'Not found :&#40;';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
    }    
}
// os proximos eventos são respectivamente: submeter formulário e adicionar click de previous e next pokemon
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