import React, { useState } from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';
import { getThemeStyles } from '../components/styles/ThemeStyles';
import { useTheme } from '../context/ThemeContext';
import  useChamados  from '../hooks/useChamados'
import ChamadosStyles from './styles/ChamadosStyles';
import useFiliais from '../hooks/useFiliais';
import MapService from '../fixtures/mapService';
import Toast from 'react-native-toast-message';

export default function Chamados (){
  //Modo escuro
  const { isDarkMode } = useTheme(); 
  const themeStyles = getThemeStyles(isDarkMode);

  const { filiais } = useFiliais();
  const { chamados } = useChamados();

  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionChamados, setSelectedOptionChamados] = useState('');

  const traceRoute = (item) => {
    const existsFilial = filiais.find((filial) => filial.nomefilial === item.nomefilial);

    if (existsFilial) {
      const coordenadas = [{ latitude: existsFilial.latitude, longitude: existsFilial.longitude }]
      MapService.openGoogleMapsRoute(coordenadas);
    } return;
  }

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setSelectedOptionChamados(null); //Limpar a seleção ao mudar de lista
  };

  const renderChamados = (data) => (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View key={item.id}>
          
          <TouchableOpacity
            style={[
              themeStyles.sidebar,
              ChamadosStyles.item,
              {
                opacity:
                  selectedOptionChamados && selectedOptionChamados !== item ? 0.1 : 1,
              },
            ]}
            onPress={() =>
              setSelectedOptionChamados(
                selectedOptionChamados?.id === item.id ? null : item
              )
            }
          >
            <View>
              <Text style={[ChamadosStyles.textContent, themeStyles.text]}>
                {item.nomefilial}
              </Text>
              <Text style={[ChamadosStyles.textContent, themeStyles.text]}>
                Título: {item.titulo.split(' ').slice(0, 1).join(' ')}...
              </Text>
              <Text style={[ChamadosStyles.textContent, themeStyles.text, {fontStyle: 'italic'}]}>
                Abertura: {new Date(item.dataabertura).toLocaleDateString("pt-BR")}
              </Text>
            </View>
            <TouchableOpacity
              style={[ChamadosStyles.btnRota, themeStyles.buttonModal]}
              onPress={() => traceRoute(item)}
            >
              <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '600' }}>
                Traçar Rota
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>

          {selectedOptionChamados?.id === item.id && (
            <View style={[ChamadosStyles.detailContainer, themeStyles.sidebar]}>
              <Text style={[ChamadosStyles.textContent, themeStyles.text]}>
                {item.descricao}
              </Text>
              <Text style={[ChamadosStyles.textContent, themeStyles.text]}>
                COLABORADOR: {item.nomeabertura}
              </Text>
              <Text style={[ChamadosStyles.textContent, themeStyles.text]}>
                TÉCNICO: {item.nomeresponsavel || 'Não atribuído'}
              </Text>
            </View>
          )}
        </View>
      )}
      style={ChamadosStyles.content}
    />
  );

  return (
    <View style={[ChamadosStyles.container,themeStyles.screenBackground]}>
      <View style={ChamadosStyles.btnContainer}>
        <TouchableOpacity 
        style={[ChamadosStyles.button, themeStyles.radiusBackground, selectedOption === 'atribuido' && themeStyles.buttonSelected]} 
        onPress={() => handleSelectOption('atribuido')}>
          <Text style={[ChamadosStyles.textTitle, themeStyles.text]}>ATRIBUÍDOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[ChamadosStyles.button, themeStyles.radiusBackground, selectedOption === 'naoAtribuido' && themeStyles.buttonSelected]}
        onPress={() => handleSelectOption('naoAtribuido')}>
          <Text style={[ChamadosStyles.textTitle, themeStyles.text]}>NÃO ATRIBUÍDOS</Text>
        </TouchableOpacity>
      </View>
      <Toast/>
      {selectedOption === 'atribuido' &&
        renderChamados(chamados.filter((chamado) => chamado.situacao === 1))}

      {selectedOption === 'naoAtribuido' &&
        renderChamados(chamados.filter((chamado) => chamado.situacao === 0))}
    </View>
  );
};
