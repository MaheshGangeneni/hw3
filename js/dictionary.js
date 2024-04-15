const SearchBox = document.getElementById('SearchBox');
const list = document.getElementById('list');

SearchBox.addEventListener('input', fetchDefinitions);

function fetchDefinitions() {
    const word = SearchBox.value.trim();
    if (word === '') {
        list.innerHTML = '';
        return;
    }

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const definitions = data.flatMap(entry => {
                return entry.meanings.flatMap(meaning => {
                    return meaning.definitions.map(def => {
                        return `<li><strong>${meaning.partOfSpeech}</strong>: ${def.definition}</li>`;
                    });
                });
            }).join('');
            list.innerHTML = definitions;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            list.innerHTML = '<li>Error fetching data. Please try again later.</li>';
        });
}