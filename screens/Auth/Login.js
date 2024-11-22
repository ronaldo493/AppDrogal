import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import PreventivaStyles from "../styles/LoginStyles";

export default function Login () {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!user || !password) {
            Alert.alert('Atenção, Usuário ou senha incorretos')
            return;
        }
    }

    <View>
        <Text>Login</Text>
        <TextInput
            placeholder="Usuário"
            keyboardType="numeric"
            value="user"
            onChangeText={setUser}
        />
        <TextInput
            placeholder="Senha"
            keyboardType="numeric"
            secureTextEntry
            value="password"
            onChangeText={setPassword}
        />
        <TouchableOpacity
            onPress={handleLogin}
        >
            <Text>Entrar</Text>
        </TouchableOpacity>
    </View>
}