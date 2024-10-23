import React, { useState } from "react";
import { View, Button, Text, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default MaquinaItem = ({ item }) => {
  const { label, options, requiresSelection, selectedValue } = item;

  //Estado para armazenar o número do patrimônio escaneado
  const [patrimonio, setPatrimonio] = useState("");

  //Função para scanear o patrimonio
  const handleScan = () => {

  };

  return (
    <View>
      <View>
        <Text>{label}</Text>
        
        <TextInput
          value={patrimonio}
          onChangeText={setPatrimonio}
          placeholder="PATRIMÔNIO"
          keyboardType="numeric" 
        />
        <Button title="Escanear" onPress={handleScan} />
      </View>

      {requiresSelection ? (
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => {

          }}
        >
          {options.map((option, index) => (
            <Picker.Item key={index} label={option.label} value={option.value} />
          ))}
        </Picker>
      ) : null}
    </View>
  );
};

