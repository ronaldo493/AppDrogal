import React, { useState } from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';
import { getThemeStyles } from '../components/styles/ThemeStyles';
import { useTheme } from '../context/ThemeContext';
import  useChamados  from '../hooks/useChamados'
import ChamadosStyles from './styles/ChamadosStyles';
import useFiliais from '../hooks/useFiliais';
import MapService from '../fixtures/mapService';

export default function Chamados (){
  //Modo escuro
  const { isDarkMode } = useTheme(); 
  const themeStyles = getThemeStyles(isDarkMode);

  const { filiais } = useFiliais();
  const { chamados} = useChamados();

  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionChamados, setSelectedOptionChamados] = useState('');

  const traceRoute = (item) => {
    const existsFilial = filiais.find((filial) => filial.nomefilial === item.nomefilial);

    if (existsFilial) {
      const coordenadas = [{ latitude: existsFilial.latitude, longitude: existsFilial.longitude }]
      MapService.openGoogleMapsRoute(coordenadas);
    } return;
  }

  return (
    <View style={[ChamadosStyles.container,themeStyles.screenBackground]}>
      <View style={ChamadosStyles.btnContainer}>
        <TouchableOpacity 
        style={[ChamadosStyles.button, themeStyles.radiusBackground, selectedOption === 'atribuido' && themeStyles.buttonSelected]} 
        onPress={() => setSelectedOption('atribuido')}>
          <Text style={[ChamadosStyles.textTitle, themeStyles.text]}>ATRIBUÍDOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[ChamadosStyles.button, themeStyles.radiusBackground, selectedOption === 'naoAtribuido' && themeStyles.buttonSelected]}
        onPress={() => setSelectedOption('naoAtribuido')}>
          <Text style={[ChamadosStyles.textTitle, themeStyles.text]}>NÃO ATRIBUÍDOS</Text>
        </TouchableOpacity>
      </View>
      {selectedOption === 'atribuido' && (
         <FlatList
            data={chamados.filter((chamado) => chamado.situacao === 1)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View key={item.id}>
                <TouchableOpacity
                  style={[
                    themeStyles.sidebar,
                    ChamadosStyles.item,
                    {
                      opacity:
                        selectedOptionChamados && selectedOptionChamados !== item ? 0.2 : 1,
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
                      {item.dataabertura}
                    </Text>
                    <Text style={[ChamadosStyles.textContent, themeStyles.text]}>
                      {item.nomefilial}
                    </Text>
                    <Text style={[ChamadosStyles.textContent, themeStyles.text]} >
                      Título: {item.titulo.split(' ').slice(0, 3).join(' ')}...
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[ ChamadosStyles.btnRota, themeStyles.buttonModal]}
                    onPress={() => traceRoute(item)}
                  >
                    <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '600' }}>
                      Traçar Rota
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>

                {selectedOptionChamados?.id === item.id && (
                  <View
                    style={[ChamadosStyles.detailContainer, themeStyles.sidebar]}
                  >
                    <Text style={[ChamadosStyles.textContent, themeStyles.text]}>
                      {item.descricao}
                    </Text>
                  </View>
                )}
              </View>
            )}
            style={ChamadosStyles.content}
          />
      )}

          
      {/* {selectedOption === 'naoAtribuido' && (
        <View style={ChamadosStyles.content}>
          {chamados
          .filter((chamado) => chamado.situacao !== 1)
          .map((chamado, index) => (
            <View key={index} style={[themeStyles.sidebar, ChamadosStyles.item]}>
              <Text style={[ChamadosStyles.textContent, themeStyles.text]} >
                {chamado.dataabertura}
              </Text>
              <Text style={[ChamadosStyles.textContent, themeStyles.text]}>
                {chamado.nomefilial}
              </Text>
              <Text style={[ChamadosStyles.textContent, themeStyles.text]}>
                {chamado.descricao}
              </Text>
            </View>
            
          ))}
        </View>
      )} */}
    </View>
  );
};
