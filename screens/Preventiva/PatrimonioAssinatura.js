import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "../../components/ThemeContext";
import { getThemeStyles } from "../../components/styles/ThemeStyles";
import PatrimonioAssinaturaStyles from "../styles/PatrimonioAssinaturaStyles";
import MaquinaSection from "./MaquinaSection";
import { Button } from "react-native-paper";

export default function PatrimonioAssinatura() {
    // Modo Escuro
    const { isDarkMode } = useTheme();
    const themeStyles = getThemeStyles(isDarkMode);

    const route = useRoute();
    // Pega a filial passada como parâmetro
    const { filial } = route.params;

    // Estado para gerenciar a opção selecionada
    const [selectedOption, setSelectedOption] = useState(null);

    const [caixas, setCaixas] = useState([
        {
            title: 'CAIXA G',
            items: [
                { label: 'Máquina:', requiresSelection: false },
                { label: 'Nobreak:', requiresSelection: false },
                { label: 'SAT:', requiresSelection: false },
                {
                    label: 'Leitor:',
                    options: [
                        { label: 'QD', value: 'qd' },
                        { label: 'VSI', value: 'vsi' }
                    ],
                    requiresSelection: true,
                },
                {
                    label: 'Impressora:',
                    options: [
                        { label: 'Daruma', value: 'daruma' },
                        { label: 'Epson', value: 'epson' }
                    ],
                    requiresSelection: true,
                },
                { label: 'Monitor:', requiresSelection: false }
            ],
        },
        {
            title: 'CAIXA H',
            items: [
                { label: 'Máquina:', requiresSelection: false },
                { label: 'Nobreak:', requiresSelection: false },
                { label: 'SAT:', requiresSelection: false },
                {
                    label: 'Leitor:',
                    options: [
                        { label: 'QD', value: 'qd' },
                        { label: 'VSI', value: 'vsi' }
                    ],
                    requiresSelection: true,
                },
                {
                    label: 'Impressora:',
                    options: [
                        { label: 'Daruma', value: 'daruma' },
                        { label: 'Epson', value: 'epson' }
                    ],
                    requiresSelection: true,
                },
                { label: 'Monitor:', requiresSelection: false }
            ],
        },
        {
            title: 'CAIXA I',
            items: [
                { label: 'Máquina:', requiresSelection: false },
                { label: 'Nobreak:', requiresSelection: false },
                { label: 'SAT:', requiresSelection: false },
                {
                    label: 'Leitor:',
                    options: [
                        { label: 'QD', value: 'qd' },
                        { label: 'VSI', value: 'vsi' }
                    ],
                    requiresSelection: true,
                },
                {
                    label: 'Impressora:',
                    options: [
                        { label: 'Daruma', value: 'daruma' },
                        { label: 'Epson', value: 'epson' }
                    ],
                    requiresSelection: true,
                },
                { label: 'Monitor:', requiresSelection: false }
            ],
        },
    ]);

    // Renderizar as Seções
    const renderMaquinaSection = (section) => {
        return (
            <View style={PatrimonioAssinaturaStyles.sectionContainer}>
                <MaquinaSection
                    title={section.title}
                    items={section.items}
                    onAddItem={() => {}}
                />
            </View>
        );
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(prevOption => (prevOption === option ? null : option));
    };

    return (
        <ScrollView style={[PatrimonioAssinaturaStyles.container, themeStyles.screenBackground]}>
            <Text style={[PatrimonioAssinaturaStyles.title, themeStyles.text]}>REGISTRO DE PATRIMÔNIO</Text>
            <Text style={[PatrimonioAssinaturaStyles.filialText, themeStyles.text]}>
                FILIAL: {filial}
            </Text>

            <View style={PatrimonioAssinaturaStyles.optionContainer}>
                {['CAIXA', 'BALCAO', 'SERVIDOR', 'GERENTE', 'CLINICA', 'RACK'].map(option => (
                    <View key={option}>
                        <Button 
                            mode="contained" 
                            onPress={() => handleOptionSelect(option)}
                            style={[PatrimonioAssinaturaStyles.optionButton, themeStyles.buttonBackgroundSide]}
                            labelStyle={{ color: isDarkMode ? '#fff' : '#111' }}
                        >
                            {option}
                        </Button>

                        {/* Renderiza a seção correspondente ao item selecionado */}
                        {selectedOption === option && option === 'CAIXA' && (
                            <View>
                                {caixas.map((caixa, index) => (
                                    <View key={index}>
                                        {renderMaquinaSection(caixa)}
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                ))}
            </View>
            <Button 
                title="Adicionar nova Máquina" 
                style={PatrimonioAssinaturaStyles.addButton}
            />
        </ScrollView>
    );
}
