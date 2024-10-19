async function fetchPokemon(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Pokémon ${pokemonName} not found`);
    }
    return response.json();
}

async function comparePokemon() {
    const pokemonInput1 = document.getElementById('pokemonInput1').value;
    const pokemonInput2 = document.getElementById('pokemonInput2').value;

    try {
        const [pokemon1, pokemon2] = await Promise.all([fetchPokemon(pokemonInput1), fetchPokemon(pokemonInput2)]);
        displayComparison(pokemon1, pokemon2);
    } catch (error) {
        displayError(error.message);
    }
}

function displayComparison(pokemon1, pokemon2) {
    const comparisonResult = document.getElementById('comparisonResult');
    comparisonResult.innerHTML = `
        <div class="pokemon-card">
            <h2>${pokemon1.name.charAt(0).toUpperCase() + pokemon1.name.slice(1)}</h2>
            <img src="${pokemon1.sprites.front_default}" alt="${pokemon1.name}">
            <p><strong>ID:</strong> ${pokemon1.id}</p>
            <p><strong>Tipo:</strong> ${pokemon1.types.map(type => type.type.name).join(', ')}</p>
            <p><strong>Altura:</strong> ${pokemon1.height / 10} m</p>
            <p><strong>Peso:</strong> ${pokemon1.weight / 10} kg</p>
        </div>
        <div class="pokemon-card">
            <h2>${pokemon2.name.charAt(0).toUpperCase() + pokemon2.name.slice(1)}</h2>
            <img src="${pokemon2.sprites.front_default}" alt="${pokemon2.name}">
            <p><strong>ID:</strong> ${pokemon2.id}</p>
            <p><strong>Tipo:</strong> ${pokemon2.types.map(type => type.type.name).join(', ')}</p>
            <p><strong>Altura:</strong> ${pokemon2.height / 10} m</p>
            <p><strong>Peso:</strong> ${pokemon2.weight / 10} kg</p>
        </div>
    `;
}

function displayError(message) {
    const comparisonResult = document.getElementById('comparisonResult');
    comparisonResult.innerHTML = `<p style="color: red;">${message}</p>`;
}
