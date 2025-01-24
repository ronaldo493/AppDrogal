import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import useAuth from '../../hooks/useAuth';
import ChamadosStyles from '../styles/ChamadosStyles';

export default function EditProfile() {
  const { user, resetPassword } = useAuth();

  const [selectedOption, setSelectedOption] = useState();
  const [passAntiga, setPassAntiga] = useState();
  const [newPassword, setNewPassword] = useState();

  const handlePassword = () => {
    resetPassword(passAntiga, newPassword);
  }
  
  return (
    <View>
        <View>
            <Text>Email: {user?.email} </Text>
            <Text>Usuário: {user?.username} </Text>
            <Text>Email de Recuperação: </Text>
            <TouchableOpacity
                onPress={() => setSelectedOption('troca')}
            >
                <Text>Trocar Senha</Text>
            </TouchableOpacity>
        </View>
        {selectedOption === 'troca' && (
        <View>
          <TextInput
            style={[ChamadosStyles.pass]}
            secureTextEntry
            placeholder="Digite a senha antiga"
            value={passAntiga}
            onChangeText={(text) => setPassAntiga(text)}
          />
          <TextInput
            style={[ChamadosStyles.pass]}
            secureTextEntry
            placeholder="Digite a senha nova"
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
          />
          <TouchableOpacity onPress={handlePassword}>
            <Text>Confirmar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
    
  )
}
