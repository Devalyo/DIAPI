import { fetchCountries } from './countries.js';
import { fetchZipCodeInfo } from './api.js';

const displayCountryInfo = (countryData) => {
    const countryInfoDiv = document.getElementById("countryInfo");
    countryInfoDiv.innerHTML = `
        <h3>Informações de ${countryData.nome_pais}</h3>
        <p><strong>Gentílico:</strong> ${countryData.gentilico}</p>
        <p><strong>Sigla:</strong> ${countryData.sigla}</p>
        <p><strong>Nome Internacional:</strong> ${countryData.nome_pais_int}</p>
    `;
};

//**Destructuring**
const displayCountries = (countries) => {
    const countrySelect = document.getElementById('countrySelect');

    countries.forEach(({ nome_pais, sigla }) => {
        const option = document.createElement('option');
        option.value = sigla;
        option.textContent = nome_pais;
        countrySelect.appendChild(option);
    });

    countrySelect.addEventListener('change', (event) => {
        const selectedCountry = countries.find(country => country.sigla === event.target.value);
        if (selectedCountry) {
            displayCountryInfo(selectedCountry);
        }
    });
};

const loadCountries = async () => {
    try {
        const countries = await fetchCountries();
        displayCountries(countries);
    } catch (error) {
        console.error('Erro ao carregar os países:', error);
    }
};

document.getElementById("dddForm").addEventListener('submit', async (e) => {
    e.preventDefault();
    const ddd = document.getElementById("ddd").value;
    if (ddd) {
        try {
            const data = await fetchZipCodeInfo(ddd);
            const dddInfoDiv = document.getElementById("dddInfo");
            dddInfoDiv.innerHTML = `
                <h3>Informações do DDD ${ddd}</h3>
                <h2><strong>Estado: </strong> ${data.state}</h2>
                <ul class="list-group">
                <li class="list-group-item active"> CIDADES </li>
            `;

            data.cities.forEach(city =>
            {
                dddInfoDiv.innerHTML += `\n<li class="list-group-item">${city}</li>`;
            })

            dddInfoDiv.innerHTML += "</ul>"

        } catch (error) {
            console.error('Erro ao consultar o CEP:', error);
        }
    }
});

loadCountries();
