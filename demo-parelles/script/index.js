const URL_POKEMON = "https://pokeapi.co/api/v2/pokemon?limit=10";

const containerObj = document.getElementById("container-pokemons");

const selectElement = document.getElementById("contador-pokemon");

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let limit = parseInt(selectElement.value);
let offset = 0;

selectElement.addEventListener('change', (event) => {
    limit = parseInt(event.target.value);
    offset = 0;
    fetchPokemons();
});

prevBtn.addEventListener("click", () => {
    if (offset > 0) {
        offset -= limit;
        fetchPokemons();
    }
});


nextBtn.addEventListener("click", () => {
    offset += limit;
    fetchPokemons();
});

async function fetchPokemons() {
    try {
        containerObj.innerHTML = '';
        
        const URL_POKEMON = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
        const response = await fetch(URL_POKEMON);
        
        if (!response.ok) {
            throw new Error("Error al obtener la lista de Pokémon");
        }

        const data = await response.json();
        fillContainer(data);

        prevBtn.disabled = offset === 0;

        nextBtn.disabled = data.results.length < limit;

    } catch (error) {
        console.error("Error al cargar la lista de Pokémon:", error);
    }
}

async function fillContainer(data) {
    for (const pokemon of data.results) {
        try {
            const pokemonData = await getPokemon(pokemon.url);
            if (pokemonData) {
                const card = document.createElement("div");
                card.className = "pokemon-card";
                
                const pokename = document.createElement("h2");
                pokename.textContent = pokemonData.name;

                const imgObj = document.createElement("img");
                imgObj.src = pokemonData.sprites.front_shiny;
                imgObj.alt = `Imagen de ${pokemonData.name}`;

                card.appendChild(imgObj);
                card.appendChild(pokename);
                containerObj.appendChild(card);
            }
        } catch (error) {
            console.error("Error al obtener los datos de un Pokémon:", error);
        }
    }
}

async function getPokemon(urlEndPoint) {
    try {
        const response = await fetch(urlEndPoint);
        if (!response.ok) {
            throw new Error("La petición no ha funcionado correctamente");
        }
        return await response.json();
    } catch (error) {
        console.error("Error al obtener el Pokémon:", error);
        return null;
    }
}



fetchPokemons();