import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import LoginStyles from '../styles/LoginStyles';

export default function Login ()  {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(username, password);
    } catch (err) {
      setError(err.message || 'Erro ao fazer login');
    }
  };

  return (
    <View style={LoginStyles.container}>
        <Text style={LoginStyles.title}>Login</Text>
        <TextInput
            style={LoginStyles.input}
            placeholder="Usuário"
            keyboardType="numeric"
            value={user}
            onChangeText={setUser}
        />
        <TextInput
            style={LoginStyles.input}
            placeholder="Senha"
            keyboardType="default"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
        />
        <TouchableOpacity
            style={LoginStyles.button}
            onPress={handleLogin}
        >
            <Text style={LoginStyles.buttonText}>Entrar</Text>
        </TouchableOpacity>
    </View>
);

}
