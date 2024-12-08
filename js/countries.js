export const fetchCountries = async () => {

    let response;
    try
    {
        response = await fetch('./js/paises.json');

    }
    catch(e)
    {
       throw new Error('Falha ao carregar os países');

    }

    console.log("uuh");
    const countries = await response.json();
    return countries;
};
