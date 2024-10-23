import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "../../components/ThemeContext";
import { getThemeStyles } from "../../components/styles/ThemeStyles";
import PatrimonioAssinaturaStyles from "../styles/PatrimonioAssinaturaStyles";
import MaquinaSection from "./MaquinaSection";
import { Button } from "react-native-paper";

export default function PatrimonioAssinatura() {
    //Modo Escuro
    const { isDarkMode } = useTheme();
    const themeStyles = getThemeStyles(isDarkMode);

    const route = useRoute();
    //Pega a filial passada como parâmetro
    const { filial } = route.params;

    //Estado para gerenciar a opção selecionada
    const [selectedOption, setSelectedOption] = useState(null);

    const [caixas, setCaixas] = useState([
        {
            title: 'CAIXA G',
            items: [
                { label: 'Scanner', requiresSelection: false },
                { label: 'Nobreak', requiresSelection: false },
                { label: 'SAT', requiresSelection: false },
                {
                    label: 'Leitor',
                    options: [
                        { label: 'QD', value: 'qd' },
                        { label: 'VSI', value: 'vsi' }
                    ],
                    requiresSelection: true,
                },
                {
                    label: 'Impressora',
                    options: [
                        { label: 'Daruma', value: 'daruma' },
                        { label: 'Epson', value: 'epson' }
                    ],
                    requiresSelection: true,
                },
                { label: 'Monitor', requiresSelection: false }
            ],
        },
    ]);

    //Renderizar as Seções
    const renderMaquinaSection = (section) => {
        return (
            <View style={PatrimonioAssinaturaStyles.sectionContainer}>
                <Text style={PatrimonioAssinaturaStyles.sectionTitle}>{section.title}</Text>
                <MaquinaSection
                    title={section.title}
                    items={section.items}
                    onAddItem={() => {}}
                />
            </View>
        );
    };


    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    return (
        <ScrollView style={[PatrimonioAssinaturaStyles.container, themeStyles.screenBackground]}>
            <Text style={[PatrimonioAssinaturaStyles.title, themeStyles.text]}>Registro de Patrimônio</Text>
            <Text style={[PatrimonioAssinaturaStyles.filialText, themeStyles.text]}>
                PREVENTIVA FILIAL: {filial}
            </Text>

            <View style={PatrimonioAssinaturaStyles.optionContainer}>
                {['CAIXA', 'BALCAO', 'GERENTE', 'SERVIDOR', 'RACK'].map(option => (
                    <Button 
                        key={option} 
                        mode="contained" 
                        onPress={() => handleOptionSelect(option)}
                        style={PatrimonioAssinaturaStyles.optionButton}
                    >
                        {option}
                    </Button>
                ))}
            </View>

            {/* Renderiza a seção correspondente ao item selecionado */}
            {selectedOption === 'CAIXA' && (
                <View>
                    {renderMaquinaSection(caixas[0])}
                </View>
            )}
            <Button title="Adicionar nova Máquina" onPress={() => addMaquina('caixa')} />
        </ScrollView>
    );
}
