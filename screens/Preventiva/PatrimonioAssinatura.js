import React, { useState } from "react";
import { View, Text, ScrollView, Modal, Button, TouchableOpacity, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "../../components/ThemeContext";
import { getThemeStyles } from "../../components/styles/ThemeStyles";
import PatrimonioAssinaturaStyles from "../styles/PatrimonioAssinaturaStyles";
import MaquinaSection from "./MaquinaSection";

export default function PatrimonioAssinatura() {
    // Modo Escuro
    const { isDarkMode } = useTheme();
    const themeStyles = getThemeStyles(isDarkMode);

    const route = useRoute();
    //Pega a filial passada como parâmetro
    const { filial } = route.params;

    //Estado para gerenciar a opção selecionada
    const [selectedOption, setSelectedOption] = useState(null); //Estado para gerenciar a opção selecionada
    const [selectedItems, setSelectedItems] = useState([]);  //Estado para gerenciar os itens selecionados
    const [modalVisible, setModalVisible] = useState(false); //Estado para controlar a visibilidade do modal
    const [selectedSection, setSelectedSection] = useState(null); //Estado para controlar a seção selecionada

    //Itens 
    const allItems = [
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
        {
            label: 'Scanner:',
            options: [
                { label: 'Lide 300', value: 'lide300' },
                { label: 'Scanjet 200', value: 'scanjet200' }
            ],
            requiresSelection: true,
        },
    ];

    //Itens específicos para CAIXA
    const caixaItems = [
        { label: 'Máquina:', requiresSelection: false },
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
        { label: 'Monitor:', requiresSelection: false },
    ];

    
    const [sections, setSections] = useState([
        { title: 'Caixa G', items: [...caixaItems] },
        { title: 'Caixa H', items: [...caixaItems] },
        { title: 'Caixa I', items: [...caixaItems] },
    ]);

    //Renderizar as Seções
    const renderMaquinaSections = () => {
        return sections.map((section, index) => (
            <View key={index}>
                <MaquinaSection
                    title={section.title}
                    items={section.items}
                    selectedItems={selectedItems.filter(item => item.section === section.title)}
                    onAddItem={() => {
                        setSelectedSection(section.title);
                        setModalVisible(true);
                    }}
                    onDelete={() => confirmDeleteSection(section.title)}
                />
            </View>
        ));
    }

    //Função para confirmar a exclusão de uma seção
    const confirmDeleteSection = (sectionTitle) => {
        Alert.alert(
            "Confirmar Exclusão",
            `Você tem certeza que deseja excluir a seção ${sectionTitle}?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Excluir",
                    onPress: () => deleteSection(sectionTitle),
                }
            ]
        );
    };
    
    //Função para excluir uma seção
    const deleteSection = (sectionTitle) => {
        setSections(prevSections => prevSections.filter(section => section.title !== sectionTitle));
        setSelectedItems(prevItems => prevItems.filter(item => item.section !== sectionTitle));
    };

    //Função para alternar a opção selecionada
    const toggleOption = (option) => {
        setSelectedOption(prevOption => (prevOption === option ? null : option)); // Alterna a opção selecionada
    };

    //Função para adicionar um item à seção selecionada
    const addItemToSection = (item) => {
        //Encontre a seção atual onde o item será adicionado
        const section = sections.find(sec => sec.title === selectedSection);

        //Verifica se o item já está em `selectedItems` ou em `items` da seção `sections`
        const itemExistsInSelected = selectedItems.some(
            selectedItem => selectedItem.label === item.label && selectedItem.section === selectedSection
        );
        const itemExistsInSectionItems = section.items.some(
            sectionItem => sectionItem.label === item.label
        );

        if (itemExistsInSelected || itemExistsInSectionItems) {
            Alert.alert("Atenção", "Este item já está na seção.");
        } else {
            setSelectedItems(prevItems => [...prevItems, { ...item, section: selectedSection }]);
        }
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
                        <TouchableOpacity
                            style={[PatrimonioAssinaturaStyles.optionButton, { backgroundColor: isDarkMode ? '#777' : '#aaa' }]}
                            onPress={() => toggleOption(option)}
                        >
                            <Text style={[PatrimonioAssinaturaStyles.optionText, themeStyles.text]}>{option}</Text>
                        </TouchableOpacity>

                        {/* Renderiza a seção correspondente ao item selecionado */}
                        {selectedOption === option && option === 'CAIXA' && renderMaquinaSections()}
                    </View>
                ))}
            </View>
            {/* Modal para Adicionar Itens */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={PatrimonioAssinaturaStyles.modalContainer}>
                    <View style={[PatrimonioAssinaturaStyles.modalContent, themeStyles.contentModal]}>
                        <Text style={[PatrimonioAssinaturaStyles.modalTitle,  themeStyles.titleModal]}>Escolha um item</Text>
                        {allItems.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[PatrimonioAssinaturaStyles.modalButton, themeStyles.buttonModal]}
                                onPress={() => {
                                    addItemToSection(item);
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={[PatrimonioAssinaturaStyles.modalButton, themeStyles.textModal]}>
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        <Button 
                            title="Cancelar" 
                            onPress={() => setModalVisible(false)}
                            color={isDarkMode ? '#BB5059' : '#BB5059'}
                        />
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}
