import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import MaquinaItem from "./MaquinaItem";
import PatrimonioAssinaturaStyles from "../styles/PatrimonioAssinaturaStyles";
import { useTheme } from "../../components/ThemeContext";
import { getThemeStyles } from "../../components/styles/ThemeStyles";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function MaquinaSection({ title, items, selectedItems, onAddItem, onDelete }) {
    const { isDarkMode } = useTheme();
    const themeStyles = getThemeStyles(isDarkMode);

    return (
        <View style={[PatrimonioAssinaturaStyles.contentSection, themeStyles.sidebar]}>
            <View style={PatrimonioAssinaturaStyles.sectionHeader}>
                <Text style={[PatrimonioAssinaturaStyles.titleSection, themeStyles.text]}>
                    {title}
                </Text>
                <TouchableOpacity onPress={onDelete}>
                    <Icon name="delete" size={24} color={isDarkMode ? '#B0B3B8' : '#000'} />
                </TouchableOpacity>
            </View>
            <View style={PatrimonioAssinaturaStyles.sectionItem}>
                {items.map((item, index) => (
                    <MaquinaItem key={index} item={item} />
                ))}
                {selectedItems.map((item, index) => (
                    <MaquinaItem key={`added-${index}`} item={item} />
                ))}
            </View>
            <Button 
                title="Adicionar Item" 
                onPress={onAddItem}
                color={isDarkMode ? '#777' : '#BB5059'} 
            />
        </View>
    );
}
