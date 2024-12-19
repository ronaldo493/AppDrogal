import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import LoginStyles from '../styles/LoginStyles';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default function Login ()  {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await login(username, password);
    } catch (err) {
      setError(err.message || 'Erro ao fazer login');
    }
  };

  return (
    <View style={LoginStyles.container}>
      <Image
        source={require('../../assets/img/drogal.png')}
        style={LoginStyles.logo}
        resizeMode="contain"
      />

      <Text style={LoginStyles.title}>
        LOGIN
      </Text>

      {error ? <Text style={LoginStyles.errorText}>{error}</Text> : null}

      <TextInput
            style={LoginStyles.input}
            placeholder="Usuário"
            placeholderTextColor="#A9A9A9"
            keyboardType="numeric"
            value={username}
            onChangeText={setUsername}
        />
        <TextInput
            style={LoginStyles.input}
            placeholder="Senha"
            placeholderTextColor="#A9A9A9"
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

        <TouchableOpacity style={LoginStyles.forgotPassword}>
          <Text style={LoginStyles.forgotText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
    </View>
);

}
