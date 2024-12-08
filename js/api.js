// Função para consultar o CEP via API
export const fetchZipCodeInfo = async (ddd) => {
    let response;
    try
    {
        response = await fetch(`https://brasilapi.com.br/api/ddd/v1/${ddd}`);
    }
    catch(e)
    {
        throw new e;
    }
    
    const data = await response.json();
    return data;
};
