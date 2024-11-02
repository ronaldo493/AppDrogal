import React, { useState } from "react";
import { View, Button, Text, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import PatrimonioAssinaturaStyles from "../styles/PatrimonioAssinaturaStyles";
import { useTheme } from "../../components/ThemeContext";
import { getThemeStyles } from "../../components/styles/ThemeStyles";

export default MaquinaItem = ({ item }) => {
  //Modo Escuro
  const { isDarkMode } = useTheme();
  const themeStyles = getThemeStyles(isDarkMode);

  const { label, options, requiresSelection, selectedValue } = item;

  //Estado para armazenar o número do patrimônio escaneado
  const [patrimonio, setPatrimonio] = useState("");

  //Função para scanear o patrimonio
  const handleScan = () => {

  };

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
          color={isDarkMode ? '#777' : '#999'} 
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
    </View>
  );
};

