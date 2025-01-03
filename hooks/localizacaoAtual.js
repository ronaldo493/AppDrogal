import { useState, useEffect } from "react";
import * as Location from 'expo-location';
import { Alert } from 'react-native';

export default function localizacaoAtual() {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [isLocationLoaded, setIsLocationLoaded] = useState(false);

    useEffect(() => {
        
    })
}