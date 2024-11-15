import React, { useState, useRef } from "react";
import { View, Button, Text, TextInput, Modal, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import PatrimonioAssinaturaStyles from "../styles/PatrimonioAssinaturaStyles";
import { useTheme } from "../../components/ThemeContext";
import { getThemeStyles } from "../../components/styles/ThemeStyles";
import { CameraView, useCameraPermissions } from "expo-camera";

export default MaquinaItem = ({ item }) => {
  //Modo Escuro
  const { isDarkMode } = useTheme();
  const themeStyles = getThemeStyles(isDarkMode);

  const { label, options = [], requiresSelection } = item;

  //Estado para o valor selecionado no Picker
  const [selectedValue, setSelectedValue] = useState(options[0]?.value);

  //Estado para permissão, abrir o scanner, armazenar o patrimonio
  const [permission, requestPermission] = useCameraPermissions();
  const [isScannerVisible, setScannerVisible] = useState(false);

  //Estado para armazenar o número do patrimônio escaneado
  const [patrimonio, setPatrimonio] = useState("");
  
  //Estado para controle do flash
  const [flashEnabled, setFlashEnabled] = useState('off')
  
  //Estado para bloquear a câmera em caso de erro
  const [isCameraActive, setIsCameraActive] = useState(true); // Câmera ativa por padrão

  //Evitar múltiplas leituras
  const codigoLock = useRef(false)

  //Função para scanear o patrimonio
  const handleScan = async () => {
    const { granted } = await requestPermission();
    if (!granted) {
      return Alert.alert("Câmera", "Você precisa habilitar o uso da câmera!");
    }
    codigoLock.current = false;
    setScannerVisible(true);
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
    }

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
    console.log("Patrimônio escaneado:", data);
  };

  return (
    <View>
      <View style={PatrimonioAssinaturaStyles.itemRowContainer}>
        <Text style={[PatrimonioAssinaturaStyles.itemLabel, themeStyles.text]}>{label}</Text>
        
        <TextInput
          style={[PatrimonioAssinaturaStyles.PatrimonioInput, themeStyles.inputPatrimonio]}
          value={patrimonio}
          onChangeText={(text) => setPatrimonio(text.replace(/\D/g, '').slice(0, 6))} //Restringir a 6 dígitos
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
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
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