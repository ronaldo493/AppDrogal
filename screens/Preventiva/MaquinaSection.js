import React from "react";
import { View, Button, Text } from "react-native";
import MaquinaItem from "./MaquinaItem";
import PatrimonioAssinaturaStyles from "../styles/PatrimonioAssinaturaStyles";
import { useTheme } from "../../components/ThemeContext";
import { getThemeStyles } from "../../components/styles/ThemeStyles";

export default MaquinaSection = ({title, items, onAddItem}) => {
    //Modo Escuro
    const { isDarkMode } = useTheme();
    const themeStyles = getThemeStyles(isDarkMode);

    return (
        <View style={[PatrimonioAssinaturaStyles.contentSection, themeStyles.sidebar]}>
            <Text style={[PatrimonioAssinaturaStyles.titleSection, themeStyles.text]}>{title}</Text>
            <View style={PatrimonioAssinaturaStyles.sectionItem}>
                {items.map((item, index) => (
                    <MaquinaItem key={index} item={item} />
                ))}
            </View>
            <Button title="Adicionar mais Item" onPress={onAddItem} />
        </View>
    )
}