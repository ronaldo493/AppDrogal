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
}