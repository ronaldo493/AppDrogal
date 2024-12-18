import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default Login = () => {
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
    <View style={PreventivaStyles.container}>
        <Text style={PreventivaStyles.title}>Login</Text>
        <TextInput
            style={PreventivaStyles.input}
            placeholder="Usuário"
            keyboardType="numeric"
            value={user}
            onChangeText={setUser}
        />
        <TextInput
            style={PreventivaStyles.input}
            placeholder="Senha"
            keyboardType="default"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
        />
        <TouchableOpacity
            style={PreventivaStyles.button}
            onPress={handleLogin}
        >
            <Text style={PreventivaStyles.buttonText}>Entrar</Text>
        </TouchableOpacity>
    </View>
);


