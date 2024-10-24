const fs = require('fs');
const axios = require('axios');

// Função para obter as coordenadas a partir do endereço completo usando a API do Nominatim
const getCoordinatesFromAddress = async (endereco, numero, nomecidade, uf) => {
    const fullAddress = `${endereco.trim()} ${numero.trim()}, ${nomecidade.trim()}, ${uf.trim()}, Brasil`;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fullAddress)}&format=json&addressdetails=1`;

    try {
        const response = await axios.get(url);
        if (response.data.length > 0) {
            const { lat, lon } = response.data[0];
            return { lat: parseFloat(lat), lng: parseFloat(lon) };
        } else {
            console.warn(`Nenhum resultado encontrado para: ${fullAddress}`);
        }
    } catch (error) {
        console.error(`Erro ao obter coordenadas para ${fullAddress}:`, error.message);
    }
    return null; 
};

// Função para verificar se a descrição do local contém "Farmácia Drogal"
const verifyPlaceName = async (lat, lng) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`;

    try {
        const response = await axios.get(url);
        if (response.data && response.data.display_name && response.data.display_name.includes("Farmácia Drogal")) {
            return true;
        }
    } catch (error) {
        console.error(`Erro ao verificar o nome do local para coordenadas (${lat}, ${lng}):`, error.message);
    }
    return false;
};

// Função para validar coordenadas com uma tolerância de erro
const areCoordinatesCloseEnough = (lat1, lon1, lat2, lon2, tolerance = 0.001) => {
    return Math.abs(lat1 - lat2) < tolerance && Math.abs(lon1 - lon2) < tolerance;
};

// Função para validar as coordenadas
const validateCoordinates = async () => {
    const filiaisData = JSON.parse(fs.readFileSync('./data/filiais.json', 'utf-8'));
    const lojasNaoEncontradas = [];
    const resultadosIncorretos = [];

    const updatedFiliais = filiaisData.map(filial => ({ ...filial }));

    for (let filial of updatedFiliais) {
        const { endereco, numero, nomecidade, uf, latitude, longitude, nomefilial } = filial;

        console.log(`Validando coordenadas para: ${nomefilial}`);
        
        const correctCoordinates = await getCoordinatesFromAddress(endereco, numero, nomecidade, uf);
        
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (correctCoordinates) {
            const currentLat = parseFloat(latitude);
            const currentLon = parseFloat(longitude);
            if (!areCoordinatesCloseEnough(currentLat, currentLon, correctCoordinates.lat, correctCoordinates.lng)) {
                console.warn(`Coordenadas incorretas para ${nomefilial}. Esperado: ${correctCoordinates.lat}, ${correctCoordinates.lng}. Encontrado: ${latitude}, ${longitude}`);
                resultadosIncorretos.push(`Filial: ${nomefilial}, Esperado: ${correctCoordinates.lat}, ${correctCoordinates.lng}, Encontrado: ${latitude}, ${longitude}`);
                
                filial.latitude = correctCoordinates.lat;
                filial.longitude = correctCoordinates.lng;

                // Verifica se o nome do local corresponde a "Farmácia Drogal"
                const isCorrectName = await verifyPlaceName(correctCoordinates.lat, correctCoordinates.lng);
                if (!isCorrectName) {
                    console.warn(`Nome do local não corresponde para ${nomefilial}. Coordenadas: ${correctCoordinates.lat}, ${correctCoordinates.lng}`);
                    resultadosIncorretos.push(`Filial: ${nomefilial}, Nome incorreto para coordenadas: ${correctCoordinates.lat}, ${correctCoordinates.lng}`);
                }
            } else {
                console.log(`Coordenadas válidas para ${nomefilial}: ${latitude}, ${longitude}`);
            }
        } else {
            console.warn(`Não foi possível obter coordenadas para ${nomefilial}`);
            lojasNaoEncontradas.push(`Filial: ${nomefilial}, Endereço: ${endereco}, ${numero}, ${nomecidade}, ${uf}`);
        }
    }

    fs.writeFileSync('./data/filiais_atualizadas.json', JSON.stringify(updatedFiliais, null, 2));
    console.log('Arquivo "filiais_atualizadas.json" criado com sucesso!');

    if (lojasNaoEncontradas.length > 0) {
        fs.writeFileSync('lojas_nao_encontradas.txt', lojasNaoEncontradas.join('\n'));
        console.log('Arquivo "lojas_nao_encontradas.txt" criado com sucesso!');
    } else {
        console.log('Todas as lojas possuem coordenadas válidas.');
    }

    if (resultadosIncorretos.length > 0) {
        fs.writeFileSync('resultados_incorretos.txt', resultadosIncorretos.join('\n'));
        console.log('Arquivo "resultados_incorretos.txt" criado com sucesso!');
    }
};

// Iniciar a validação das coordenadas
validateCoordinates();
