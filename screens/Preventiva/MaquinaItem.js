import React, { useState } from "react";
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

  //Estado para armazenar o número do patrimônio escaneado
  

  //Estado para o valor selecionado no Picker
  const [selectedValue, setSelectedValue] = useState(options[0]?.value);

  //Estado para permissão, abrir o scanner, armazenar o patrimonio
  const {permission, requestPermission} = useCameraPermissions();
  const [isScannerVisible, setScannerVisible] = useState(false);
  const [patrimonio, setPatrimonio] = useState("");

  //Função para scanear o patrimonio
  const handleScan = async () => {
    const { granted } = await requestPermission()
    if(!granted){
      return Alert.alert("Câmera, Você precisa habilitar o uso da camêra!")
    }
    setScannerVisible(true);
  };

  //Função Patrimõnio Lido
  const handleScanRead=() =>{

  }

  return (
    <View>
      <View style={PatrimonioAssinaturaStyles.itemRowContainer}>
        <Text style={[PatrimonioAssinaturaStyles.itemLabel, themeStyles.text]}>{label}</Text>
        
        <TextInput
          style={[PatrimonioAssinaturaStyles.PatrimonioInput, themeStyles.inputPatrimonio]}
          value={patrimonio}
          onChangeText={setPatrimonio}
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
          style={{ color: isDarkMode ? '#ccc' : '#000', }}
        >
          {options.map((option, index) => (
            <Picker.Item key={index} label={option.label} value={option.value} />
          ))}
        </Picker>
      ) : null}

      <Modal visible={isScannerVisible}>
        <CameraView facing="back" style={PatrimonioAssinaturaStyles.modalScan}>
          <View style={PatrimonioAssinaturaStyles.viewButton}>
            <Button 
              title="Cancelar"
              style={PatrimonioAssinaturaStyles.modalButton} 
              color={isDarkMode ? '#777' : '#BB5059'} 
              onPress={() => setScannerVisible(false)}>
            </Button>
          </View>

        </CameraView>
      </Modal>
    </View>
  );
};

