const fs = require('fs');
const axios = require('axios');

// Função para obter as coordenadas a partir do endereço completo
const getCoordinatesFromAddress = async (endereco, numero, nomecidade, uf) => {
    const fullAddress = `${endereco}, ${numero}, ${nomecidade}, ${uf}, Brasil`;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fullAddress)}&format=json&addressdetails=1`;

    try {
        const response = await axios.get(url);
        if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            return { lat, lng: lon }; // Retorna um objeto com as coordenadas
        }
    } catch (error) {
        console.error(`Erro ao obter coordenadas para ${fullAddress}:`, error.message);
    }
    return null; // Retorna null se não conseguir obter coordenadas
};

// Função para validar as coordenadas
const validateCoordinates = async () => {
    const filiaisData = JSON.parse(fs.readFileSync('./data/filiais.json', 'utf-8'));

    for (let filial of filiaisData) {
        const { endereco, numero, bairro, nomecidade, uf, latitude, longitude, nomefilial } = filial;

        console.log(`Validando coordenadas para: ${nomefilial}`);
        
        const correctCoordinates = await getCoordinatesFromAddress(endereco, numero, bairro, nomecidade, uf);
        
        // Atraso entre as requisições
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 segundo de atraso

        if (correctCoordinates) {
            if (correctCoordinates.lat !== latitude || correctCoordinates.lng !== longitude) {
                console.warn(`Coordenadas incorretas para ${nomefilial}. Esperado: ${correctCoordinates.lat}, ${correctCoordinates.lng}. Encontrado: ${latitude}, ${longitude}`);
            } else {
                console.log(`Coordenadas válidas para ${nomefilial}: ${latitude}, ${longitude}`);
            }
        } else {
            console.warn(`Não foi possível obter coordenadas para ${nomefilial}`);
        }
    }
};

// Iniciar a validação das coordenadas
validateCoordinates();
