export const fetchCountries = async () => {

    let response;
    try
    {
        response = await fetch('https://raw.githubusercontent.com/Devalyo/DIAPI/refs/heads/main/js/paises.json');

    }
    catch(e)
    {
       throw new Error('Falha ao carregar os países');

    }

    console.log("uuh");
    const countries = await response.json();
    return countries;
};
