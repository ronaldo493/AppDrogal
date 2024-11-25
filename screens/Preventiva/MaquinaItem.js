import React, { useState, useRef } from "react";
import { View, Button, Text, TextInput, Modal, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import PatrimonioAssinaturaStyles from "../styles/PatrimonioAssinaturaStyles";
import { useTheme } from "../../components/ThemeContext";
import { getThemeStyles } from "../../components/styles/ThemeStyles";
import { CameraView, useCameraPermissions} from "expo-camera";

export default MaquinaItem = ({ item, onUpdate }) => {
  //Modo Escuro
  const { isDarkMode } = useTheme();
  const themeStyles = getThemeStyles(isDarkMode);

  const { label, options = [], requiresSelection } = item;

    //Estado para permissão, abrir o scanner, armazenar o patrimonio
  const [permission, requestPermission] = useCameraPermissions();  
  const [selectedValue, setSelectedValue] = useState(options[0]?.value); //Estado para o valor selecionado no Picker
  const [isScannerVisible, setScannerVisible] = useState(false); //Estado para abrir o scanner
  const [patrimonio, setPatrimonio] = useState("");   //Estado para armazenar o número do patrimônio escaneado
  const [isCameraActive, setIsCameraActive] = useState(true); //Estado para bloquear a câmera em caso de erro //Câmera ativa por padrão

  //Evitar múltiplas leituras
  const codigoLock = useRef(false)

  //Função para scanear o patrimonio
  const handleScan = async () => {
    if (!permission?.granted) {
    if (permission?.canAskAgain) {
      const result = await requestPermission();
      if (result.granted) {
        Alert.alert("Permissão concedida!", "Agora você pode acessar a câmera.");
      } else {
        Alert.alert("Permissão necessária", "Você precisa conceder permissão para usar a câmera.");
      }
    } else {
      Alert.alert(
        "Permissão necessária",
        "A permissão foi desativada permanentemente. Ative-a manualmente nas configurações."
      );
    }
  } else {
    Alert.alert("Permissão já concedida!", "A câmera está pronta para ser usada.");
  }
    codigoLock.current = false;
    setScannerVisible(true);
  };

  
  //Função para lidar com alterações na entrada de texto
  const handleInputChange = (text) => {
    const sanitizedText = text.replace(/\D/g, '').slice(0, 6); //Limita a 6 dígitos
    setPatrimonio(sanitizedText); //Atualiza o estado local com o texto limpo
    onUpdate(label, sanitizedText, selectedValue); //Notifica o componente pai com o valor atualizado
  };

  //Função Patrimônio Lido
  const handleScanRead = ({ data }) => {
    if (codigoLock.current) return; //Ignorar se já foi lido

    //Se o código for maior que 6 dígitos, não realiza a leitura
    if (data.length > 6) {
      Alert.alert("Código inválido", "O código de barras deve ter no máximo 6 dígitos.", [
        {
          text: "OK",
          onPress: () => {
            setIsCameraActive(true); //Reativar a câmera após o alerta
            setScannerVisible(true); //Continuar escaneando
          },
        },
      ]);
      setIsCameraActive(false); //Bloquear a câmera até o usuário clicar em "OK"
      return;
    };

    //Se o código já foi lido, exibe um alerta
    if (patrimonio && patrimonio === data) {
      Alert.alert("Código já lido", "Este código de barras já foi escaneado.", [
        {
          text: "OK",
          onPress: () => {
            setIsCameraActive(true); //Reativar a câmera após o alerta
            setScannerVisible(true); //Continuar escaneando
          },
        },
      ]);
      setIsCameraActive(false); //Bloquear a câmera até o usuário clicar em "OK"
      return;
    }

    codigoLock.current = true; //Bloquear para leituras futuras
    setPatrimonio(data); //Atualizar o valor de patrimônio
    setScannerVisible(false); //Desativa a visualização da câmera após o código válido ser lido
    onUpdate(label, data, selectedValue);//Notifica o componente pai com o novo valor do patrimônio
    console.log("Patrimônio escaneado:", data);
  };

  return (
    <View>
      <View style={PatrimonioAssinaturaStyles.itemRowContainer}>
        <Text style={[PatrimonioAssinaturaStyles.itemLabel, themeStyles.text]}>{label}</Text>
        
        <TextInput
          style={[PatrimonioAssinaturaStyles.PatrimonioInput, themeStyles.inputPatrimonio]}
          value={patrimonio}
          onChangeText={handleInputChange}
          placeholder="PATRIMÔNIO"
          placeholderTextColor={isDarkMode ? '#ccc' : '#666'}
          keyboardType="numeric" 
        />
        <Button 
          title="Escanear" 
          onPress={handleScan} 
          style={PatrimonioAssinaturaStyles.scanButton} 
          color={isDarkMode ? '#777' : '#BB5059'} 
        />
      </View>

      {requiresSelection ? (
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => {
            setSelectedValue(itemValue)
            onUpdate(label, patrimonio, itemValue);
          }}
          style={{ color: isDarkMode ? '#ccc' : '#000' }}
        >
          {options.map((option, index) => (
            <Picker.Item key={index} label={option.label} value={option.value} />
          ))}
        </Picker>
      ) : null}

      <Modal visible={isScannerVisible}>
        {isCameraActive && (
          <CameraView 
            facing="back" 
            style={PatrimonioAssinaturaStyles.modalScan}
            onBarcodeScanned={handleScanRead}
          >
            <View style={PatrimonioAssinaturaStyles.viewButton}>
              <Button 
                title="Cancelar"
                style={PatrimonioAssinaturaStyles.modalButton} 
                color={isDarkMode ? '#777' : '#BB5059'} 
                onPress={() => setScannerVisible(false)} />
            </View>
          </CameraView>
        )}
      </Modal>
    </View>
  );
};