/* DOM ELEMENTS */
const pokemonName = document.getElementById('pokemonName');
const pokeId = document.getElementById('pokeId');
const pokeType1 = document.getElementById('pokeType1');
const pokeType2 = document.getElementById('pokeType2');
const pokeWeight = document.getElementById('pokeWeight');
const pokeHeight = document.getElementById('pokeHeight');
const pokedexScreen = document.getElementById('pokedex__screenContent');
const pokeBackground = document.getElementById('poke-background');


/* Variables */

const types = ['normal', 'fighting', 'flying' , 'poison', 'ground', 'rock' , 'bug', 'ghost', 'steel', 'fire', 'water', 'grass' , 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy' ]

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


/* Llamado de APi  buscar pokemon*/

const fetchPokemon = ()=>{
    const pokeName = document.getElementById("pokeName")
    let pokeInput = pokeName.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`; 
    fetch(url).then((resApi) =>{
        if(resApi.status !=  200){
            console.log(resApi);
            pokeImage("https://c.tenor.com/Ih8bQ8iIlDUAAAAC/pikachu-sad.gif");
        }else{            
            return resApi.json();   
        }
    }).then((data) =>{
            
            resetScreen()

            let pokeImg = data.sprites.front_default;
            pokeImage(pokeImg);
            let pokeImgBack = data.sprites.back_default;
            pokeImageBack(pokeImgBack);
            pokemonName.textContent = capitalize(data['name']);
            pokeId.textContent = `# ${data['id'].toString().padStart(3,0)}` 
            pokeWeight.textContent = data['weight']
            pokeHeight.textContent = data['height']

            const dataTypes = data['types']
            const dataFirstType = dataTypes[0];
            const dataSecondType = dataTypes[1];

            pokeType1.textContent = capitalize(dataFirstType['type']['name'])

            if(dataSecondType){
                pokeType2.textContent =capitalize(dataSecondType['type']['name']);
                pokeType2.classList.remove('hide');
            }else{
                pokeType2.classList.add('hide');
            }

            const pokeBg = dataFirstType['type']['name'];
            pokeBackground.classList.add(pokeBg);
            pokedexScreen.classList.remove("hide");
    })
}


/* Llamada de Api para lista */

fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
    .then(response => response.json())
    .then((resData)=>{
        console.log(resData);
        const {results} = resData; // destructur, esto se hace cuando la propiedad que queremos queremos conseguir se llama igual que nuestra variable

        console.log(results)
    })