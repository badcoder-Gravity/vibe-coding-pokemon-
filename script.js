
const pokemonIds = Array.from({length: 50}, (_, i) => i + 1);
let currentIndex = 0;

const img = document.getElementById('poke-img');
const infoBox = document.getElementById('info-box');
const nameText = document.getElementById('poke-name');
const descText = document.getElementById('poke-desc');
const countText = document.getElementById('poke-count');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

async function updatePokemon() {
    
    img.classList.remove('animate-poke');
    infoBox.classList.remove('animate-text');

    const id = pokemonIds[currentIndex];
    countText.innerText = `${String(currentIndex + 1).padStart(2, '0')} / 50`;

    try {
        const [res, speciesRes] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        ]);

        const data = await res.json();
        const speciesData = await speciesRes.json();
        
        
        const entry = speciesData.flavor_text_entries.find(e => e.language.name === 'en');
        const description = entry ? entry.flavor_text : "Data corrupted in deep space transmission.";

        
        img.src = data.sprites.other['official-artwork'].front_default;
        nameText.innerText = data.name;
        descText.innerText = description.replace(/[\f\n\r]/gm, " ");

        
        requestAnimationFrame(() => {
            img.classList.add('animate-poke');
            infoBox.classList.add('animate-text');
        });
        
    } catch (error) {
        console.error("Signal Lost in Sector:", currentIndex);
    }
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % pokemonIds.length;
    updatePokemon();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + pokemonIds.length) % pokemonIds.length;
    updatePokemon();
});


updatePokemon();