/* DOM ELEMENTS */
const buscarPokemon = document.getElementById('buscarPokemon')
const pokemonName = document.getElementById('pokemonName');
const pokeId = document.getElementById('pokeId');
const pokeType1 = document.getElementById('pokeType1');
const pokeType2 = document.getElementById('pokeType2');
const pokeWeight = document.getElementById('pokeWeight');
const pokeHeight = document.getElementById('pokeHeight');
const pokedexScreen = document.getElementById('pokedex__screenContent');
const pokeBackground = document.getElementById('poke-background');
const pokeListItems = document.querySelectorAll(".pokemon__list-item");
const prev = document.getElementById("prev");
const next = document.getElementById("next");



/* Variables */

const types = ['normal', 'fighting', 'flying' , 'poison', 'ground', 'rock' , 'bug', 'ghost', 'steel', 'fire', 'water', 'grass' , 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy' ]
const rangepokemon = 0;

let prevUrl = null;
let nextUrl = null;

/* Functions */

const resetScreen = () =>{
    for(type of types){
        pokeBackground.classList.remove(type)
    }
}


const pokeImage = (url)=>{
    const pokeImg = document.getElementById('pokeImg');
    pokeImg.src = url;
}

const pokeImageBack = (url)=>{
    const pokeImgBack = document.getElementById('pokeImgBack');
    pokeImgBack.src = url;
}

const capitalize = str => str[0].toUpperCase() + str.substr(1);

/* const actualizarPokemon = () =>{
    pokeName.value = "test";

} */

/* Llamada de Api para lista */

const fetchPokeList = (rangeURL) =>{
    fetch(rangeURL)
    .then(response => response.json())
    .then((resData)=>{
        const {results, previous , next} = resData; // destructur, esto se hace cuando la propiedad que queremos queremos conseguir se llama igual que nuestra variable
        prevUrl = previous;
        nextUrl = next;


        for(let i = 0; i < pokeListItems.length; i++){
            const pokeListItem = pokeListItems[i];
            const resultsData = results[i];
            pokeListItem.addEventListener('click', ()=>{
                const pokeSelector = pokeListItem.innerHTML;
                const pokeSelected = pokeSelector.split('.-')
                pokeName.value = pokeSelected[1];
                buscarPokemon.click()
            })
            

            if(resultsData){
                const {name , url} = resultsData; 
                const urlArray = url.split('/');
                const pokeIdList = urlArray[6];
                pokeListItem.textContent = pokeIdList + ".-" +  capitalize(name);

            }
            else{
                pokeListItem.textContent = "";
            }
        }

    })
}

/* Funciones de los  botones */



const prev20 = () =>{
    if(prevUrl){
        fetchPokeList(prevUrl)
    }
}

const next20 = () =>{
    if(nextUrl){
        fetchPokeList(nextUrl)
    }
}


/* Llamado de APi  buscar pokemon*/

function fetchPokemon() {
    const pokeName = document.getElementById("pokeName");
    let pokeInput = pokeName.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    fetch(url).then((resApi) => {
        if (resApi.status != 200) {
            pokeImage("https://c.tenor.com/Ih8bQ8iIlDUAAAAC/pikachu-sad.gif");
        } else {
            return resApi.json();
        }
    }).then((data) => {

        resetScreen();

        let pokeImg = data.sprites.front_default;
        pokeImage(pokeImg);
        let pokeImgBack = data.sprites.back_default;
        pokeImageBack(pokeImgBack);
        pokemonName.textContent = capitalize(data['name']);
        pokeId.textContent = `# ${data['id'].toString().padStart(4, 0)}`;
        pokeWeight.textContent = data['weight'];
        pokeHeight.textContent = data['height'];

        const dataTypes = data['types'];
        const dataFirstType = dataTypes[0];
        const dataSecondType = dataTypes[1];

        pokeType1.textContent = capitalize(dataFirstType['type']['name']);

        if (dataSecondType) {
            pokeType2.textContent = capitalize(dataSecondType['type']['name']);
            pokeType2.classList.remove('hide');
        } else {
            pokeType2.classList.add('hide');
        }

        const pokeBg = dataFirstType['type']['name'];
        pokeBackground.classList.add(pokeBg);
        pokedexScreen.classList.remove("hide");
    });
}



    /* Eventlisteners */

prev.addEventListener('click', prev20);
next.addEventListener('click', next20);

buscarPokemon.addEventListener('click', fetchPokemon)

//inicialize app

fetchPokeList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
