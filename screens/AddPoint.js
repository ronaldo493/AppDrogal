import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../components/ThemeContext';
import { getThemeStyles } from '../../components/styles/ThemeStyles';
import usePontos from '../../hooks/pontosInteresse';
import AddPointStyles from '../styles/AddPointStyles';

export default function AddPoint() {
  //Modo escuro
  const { isDarkMode } = useTheme();
  const themeStyles = getThemeStyles(isDarkMode);

  const { pontos = [], loading, error, postPontos } = usePontos();
  const { currentLocation, mapRegion} = useLocation();

  // const [db, setDb] = useState(null);
  const [isLocationLoaded, setIsLocationLoaded] = useState(false); //Estado para verificar se a localização foi carregada
  const [selectedPoint, setSelectedPoint] = useState(null); //Estado para armazenar o ponto selecionado pelo usuário
  const [description, setDescription] = useState(''); //Estado para armazenar a descrição do ponto
  const [isPontoAdd, setIsPontoAdd] = useState(false); //Estado para controlar se o usuário está no modo de adição de ponto

  // //Função para abrir o banco de dados
  // const openDatabase = async () => {
  //   try {
  //     const database = await openDatabaseAsync('DataStrapi.db');
  //     console.log('Banco de dados aberto com sucesso:', database);
  //     setDb(database); //Armazena o banco de dados no estado
  //     fetchPoints(database);  //Chama a função para buscar os pontos ao abrir o banco
  //   } catch (error) {
  //     console.error('Erro ao abrir o banco de dados:', error);
  //   }
  // };
  
  //Função para buscar pontos das tabelas pontosIfoods e pontosAbastecimentos
  // const fetchPoints = async () => {
  //   try {
  //     //Buscando pontos dos restaurantes
  //     const ifoodPoints = await db.getAllAsync('SELECT * FROM pontosIfoods');
  //     //Buscando pontos dos postos de combustíveis
  //     const abastecimentoPoints = await db.getAllAsync('SELECT * FROM pontosAbastecimentos');

  //     //Adiciona o tipo 'restaurante' ou 'posto' aos pontos
  //     const pointsWithTypes = [
  //       ...ifoodPoints.map((point) => ({ ...point, type: 'restaurante' })),
  //       ...abastecimentoPoints.map((point) => ({ ...point, type: 'posto' })),
  //     ];
      
  //     //Atualiza o estado com todos os pontos
  //     setPoints(pointsWithTypes);
  //   } catch (error) {
  //     console.error('Erro ao buscar pontos no banco de dados:', error);
  //   }
  // };

  // useEffect(() => {
  //   openDatabase(); 
  // }, []);
  

  //Função para salvar um ponto
  const savePoint = async () => {
    //Valida se um ponto foi selecionado e se a descrição está preenchida
    if (!selectedPoint || !description.trim()) {
      Alert.alert('Atenção!', 'Selecione um ponto e adicione uma descrição.');
      return;
    }

    //Pergunta ao usuário se o ponto é um restaurante ou um posto
    Alert.alert(
      'Tipo de Ponto',
      'Esse ponto é um Restaurante ou Posto de Combustível?',
      [
        {
          text: 'Restaurante',
          onPress: async () => {
            const newPoint = {
              latitude: selectedPoint.latitude.toString(),
              longitude: selectedPoint.longitude.toString(),
              descricao: description,
              categoria: 'Restaurante',
            };

            // console.log('Dados enviados:', newPoint);

            try {
              //Adicionar no Strapi
              //Chamando a função do hook usePontos para salvar o ponto
              const response = await postPontos(newPoint);

              // console.log('Resposta da API:', response);

              // //Adicionar ao banco local
              // await db.runAsync(
              //   'INSERT INTO pontosIfoods (latitude, longitude, descricao) VALUES (?, ?, ?)',
              //   [newPoint.latitude, newPoint.longitude, newPoint.descricao]
              // );
            
              resetAddPoint();
            } catch (error) {
              console.error('Erro ao salvar ponto como Restaurante:', error);
              Alert.alert('Erro', 'Não foi possível salvar o ponto.');
            }
          },
        },
        {
          text: 'Posto de Combustível',
          onPress: async () => {
            const newPoint = {
              latitude: selectedPoint.latitude.toString(),
              longitude: selectedPoint.longitude.toString(),
              descricao: description,
              categoria: 'Posto de Combustível',
            };
            // console.log('Dados enviados:', newPoint);

            try {
              //Adicionar no Strapi
              //Chamando a função do hook usePontos para salvar o ponto
              const response = await postPontos(newPoint);
              // console.log('Resposta da API:', response)

              // //Adicionar ao banco local
              // await db.runAsync(
              //   'INSERT INTO pontosAbastecimentos (latitude, longitude, descricao) VALUES (?, ?, ?)',
              //   [newPoint.latitude, newPoint.longitude, newPoint.descricao]
              // );

              resetAddPoint();
            } catch (error) {
              console.error('Erro ao salvar ponto como Posto de Combustível:', error);
              Alert.alert('Erro', 'Não foi possível salvar o ponto.');
            }
          },
        },
      ],
      { cancelable: true } //Permite que o alerta seja fechado tocando fora dele
    );
  };

  const pontosComTipo = pontos.map((ponto) => ({
    ...ponto,
    type: ponto.categoria === 'Restaurante' ? 'restaurante' : 'posto',
  }));

  //Função para resetar o estado de adição de pontos
  const resetAddPoint = () => {
    Alert.alert('Sucesso', 'Ponto salvo com sucesso!');
    setIsPontoAdd(false); //Sai do modo de adição
    setSelectedPoint(null); //Remove o ponto selecionado
    setDescription(''); //Limpa a descrição
  };

  //Função para voltar a secao
  const voltarSecao = () => {
    setIsPontoAdd(false); //Sai do modo de adição
    setSelectedPoint(null); //Remove o ponto selecionado
    setDescription(''); //Limpa a descrição
  };

  //Função para cor dos icones de acordo com o tipo
  const getColor = (pointType) => {
      return pointType === 'restaurante' ? 'red' : 'green';
    }

  return (
    <View style={[AddPointStyles.container, themeStyles.screenBackground]}>
      <Text style={[AddPointStyles.title, themeStyles.text]}>RESTAURANTES & POSTOS</Text>

      <View style={[AddPointStyles.description, themeStyles.sidebar]}>
        <View style={{ display:'flex', flexDirection: 'row' }}>
          <Icon name="fastfood" size={22} color="red" />
          <Text style={[AddPointStyles.subtitle, { color: 'red' }]}>
            RESTAURANTE
          </Text>
        </View>
        
        <View style={{ display:'flex', flexDirection: 'row'}}>
          <Icon name="local-gas-station" size={22} color="green" />
          <Text style={[AddPointStyles.subtitle, { color: 'green' }]}>
            POSTO DE COMBUSTÍVEL
          </Text>
        </View>
      </View>

      
      {/* Exibe o carregamento enquanto os dados estão sendo buscados */}
      {loading && (
        <View >
          <ActivityIndicator size="large" />
        </View>
      )}

      {/* Exibe erro, caso haja */}
      {error && (
        <View >
          <Text style={themeStyles.errorText}>{error}</Text>
        </View>
      )}

      {/* Mapa */}
      <MapView
      provider={MapView.PROVIDER_GOOGLE}
        key={isDarkMode ? 'dark' : 'light'}
        region={mapRegion}
        customMapStyle={themeStyles.mapStyle}
        showsUserLocation={true} //Exibe o ícone de localização do usuário
        zoomEnabled={true} //Permite zoom
        zoomControlEnabled={true} //Exibe controles de zoom no mapa
        style={AddPointStyles.map}
        onPress={(e) => {
          //Permite selecionar um ponto no mapa apenas se estiver no modo de adição
          if (isPontoAdd) {
            setSelectedPoint(e.nativeEvent.coordinate);
          }
        }}
      >
        {/* Marker para a localização atual */}
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: Number(currentLocation.latitude),
              longitude: Number(currentLocation.longitude),
            }}
            title="Minha Localização"
            pinColor="blue"
          />
        )}

        {/* Markers para os pontos salvos */}
        {pontosComTipo.map((point, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: Number(point.latitude),
              longitude: Number(point.longitude),
            }}
            title={point.descricao}
            pinColor={getColor(point.type)}
          >
            {/* <Icon
              name={point.type === 'restaurante' ? 'fastfood' : 'local-gas-station'}
              size={27}
              color={getColor(point.type)}
            /> */}
          </Marker>
        ))}

        {/* Marker para o ponto selecionado */}
        {selectedPoint && isPontoAdd && (
          <Marker
            coordinate={{
              latitude: Number(selectedPoint.latitude),
              longitude: Number(selectedPoint.longitude),
            }}
            title="Novo Ponto"
            pinColor="red"
          />
        )}
      </MapView>

      {/* Controles para adicionar e salvar pontos */}
      <View>
        {!isPontoAdd ? (
          //Botão para ativar o modo de adição de pontos
          <TouchableOpacity
            onPress={() => {
              //Exibe a mensagem explicativa quando o usuário clicar em "Adicionar Ponto"
              Alert.alert(
                'Como Usar a Tela.',
                'Nesta tela, você pode adicionar pontos como restaurantes que passam o Alelo Refeição ou postos de combustíveis que passam o TicketCar.\n\n' +
                '1️⃣ Selecione um local no mapa ou use sua localização atual.\n\n' +
                '2️⃣ Adicione uma descrição para o ponto, como "Restaurante" ou "Posto".\n\n' +
                '3️⃣ Clique em "SALVAR PONTO".\n\n\n' +
                '4️⃣ Escolha o tipo de ponto: Restaurante ou Posto de Combustível.\n\n' +
                'Esses passos são necessários para adicionar corretamente um ponto!',
                [
                  { text: 'OK', onPress: () => setIsPontoAdd(true) },
                ]
              );
            }}
          >
            <Text style={[AddPointStyles.btnAdd, themeStyles.buttonBackgroundScreen, themeStyles.textBackground]}>ADICIONAR PONTO</Text>
          </TouchableOpacity>

        ) : (
          <>
            {/* Campo para inserir a descrição do ponto */}
            <TextInput
              style={[AddPointStyles.inputDesc, themeStyles.input]}
              placeholder="Descrição do Ponto. EX: (Posto, Restaurante)"
              placeholderTextColor={isDarkMode ? '#ccc' : '#333'}
              value={description}
              onChangeText={setDescription}
            />

            <View style={AddPointStyles.containerBtn}>
              {/* Botão para usar a localização atual como ponto */}
              <TouchableOpacity
                onPress={() => {
                  if (currentLocation) {
                    setSelectedPoint(currentLocation);
                  } else {
                    if (!isLocationLoaded) {
                      Alert.alert('Atenção', 'Localização ainda está sendo carregada. Tente novamente em alguns segundos.');
                      return;
                    }
                  }
                }}
                style={AddPointStyles.buttonContainer}
              >
                <Text style={[AddPointStyles.btnFinal, themeStyles.buttonBackgroundScreen, themeStyles.textBackground]}>
                  LOCALIZAÇÃO ATUAL
                </Text>
              </TouchableOpacity>

              {/* Botão para salvar o ponto */}
              <TouchableOpacity onPress={savePoint}>
                <Text style={[AddPointStyles.btnFinal, themeStyles.buttonBackgroundScreen, themeStyles.textBackground]}>
                  SALVAR PONTO
                </Text>
              </TouchableOpacity>

              {/* Botão para voltar a tela */}
              <TouchableOpacity  onPress={voltarSecao}>
                <Text style={[AddPointStyles.btnFinal, themeStyles.buttonBackgroundScreen, themeStyles.textBackground]}>
                  ← VOLTAR
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
}
