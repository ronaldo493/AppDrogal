import React, { useState } from "react";
import { View, Text, ScrollView, Button, TouchableOpacity, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "../../components/ThemeContext";
import { getThemeStyles } from "../../components/styles/ThemeStyles";
import PatrimonioAssinaturaStyles from "../styles/PatrimonioAssinaturaStyles";
import MaquinaSection from "./MaquinaSection";
import Modals from "./Modals";

export default function PatrimonioAssinatura() {
    //Modo Escuro
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
    const [newMachineLetter, setNewMachineLetter] = useState(""); //Estado para a letra da nova máquina

    //Itens 
    const allItems = [
        { label: 'Nobreak:', requiresSelection: false },
        { label: 'Roteador:', requiresSelection: false },
        { label: 'Mikrotik:', requiresSelection: false },
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
        {
            label: 'ATA:',
            options: [
                { label: 'Intelbras', value: 'intelbras' },
                { label: 'Leucotron', value: 'leucotron' }
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

    //Itens específicos para BALCAO
    const balcaoItems = [
        { label: 'Máquina:', requiresSelection: false },
        {
            label: 'Leitor:',
            options: [
                { label: 'QD', value: 'qd' },
                { label: 'VSI', value: 'vsi' }
            ],
            requiresSelection: true,
        },
        { label: 'Monitor:', requiresSelection: false },
    ];

    //Itens específicos para SERVIDOR
    const servidorItems = [
        { label: 'Máquina:', requiresSelection: false },
        { label: 'Nobreak:', requiresSelection: false },
        {
            label: 'ATA:',
            options: [
                { label: 'Intelbras', value: 'intelbras' },
                { label: 'Leucotron', value: 'leucotron' }
            ],
            requiresSelection: true,
        },
        {
            label: 'Leitor:',
            options: [
                { label: 'QD', value: 'qd' },
                { label: 'VSI', value: 'vsi' }
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
        { label: 'Monitor:', requiresSelection: false },
    ];

    const clinicaItems = [
        { label: 'Máquina:', requiresSelection: false },
        {
            label: 'Leitor:',
            options: [
                { label: 'QD', value: 'qd' },
                { label: 'VSI', value: 'vsi' }
            ],
            requiresSelection: true,
        },
        { label: 'Monitor:', requiresSelection: false },
    ];
    const gerenteItems = [
        { label: 'Máquina:', requiresSelection: false },
        { label: 'Monitor:', requiresSelection: false },
    ];
    const rackItems = [
        { label: 'Mikrotik:', requiresSelection: false },
        { label: 'Nobreak:', requiresSelection: false },
    ];

    
    const [sections, setSections] = useState([
        { title: 'Caixa G', items: [...caixaItems] },
        { title: 'Caixa H', items: [...caixaItems] },
        { title: 'Caixa I', items: [...caixaItems] },
        { title: 'Balcao J', items: [...balcaoItems] },
        { title: 'Balcao K', items: [...balcaoItems] },
        { title: 'Balcao L', items: [...balcaoItems] },
        { title: 'Servidor', items: [...servidorItems] },
        { title: 'Clinica', items: [...clinicaItems] },
        { title: 'Gerente', items: [...gerenteItems] },
        { title: 'Rack', items: [...rackItems] },
    ]);


    const renderMaquinaSections = () => {
        return sections
            .filter(section => {
                if (selectedOption === 'BALCAO' && section.title.includes('Balcao')) {
                    return true;
                }
                if (selectedOption === 'CAIXA' && section.title.includes('Caixa')) {
                    return true;
                }
                if (selectedOption === 'SERVIDOR' && section.title.includes('Servidor')) {
                    return true;
                }
                if (selectedOption === 'CLINICA' && section.title.includes('Clinica')) {
                    return true;
                }
                if (selectedOption === 'GERENTE' && section.title.includes('Gerente')) {
                    return true;
                }
                if (selectedOption === 'RACK' && section.title.includes('Rack')) {
                    return true;
                }
                //Renderiza as seções normalmente para outras opções
                return selectedOption !== 'BALCAO' && selectedOption !== 'CAIXA' && selectedOption !== 'SERVIDOR' && 
                selectedOption !== 'CLINICA' && selectedOption !== 'GERENTE' && selectedOption !== 'RACK';
            })
            .map((section, index) => {
                //Determina os itens corretos para a seção
                let sectionItems = [];
                if (section.title.includes('Balcao')) {
                    sectionItems = balcaoItems;
                } else if (section.title.includes('Caixa')) {
                    sectionItems = caixaItems;
                } else if (section.title.includes('Servidor')) {
                    sectionItems = servidorItems;
                } else if (section.title.includes('Clinica')) {
                    sectionItems = clinicaItems;
                } else if (section.title.includes('Gerente')) {
                    sectionItems = gerenteItems;
                } else if (section.title.includes('Rack')) {
                    sectionItems = rackItems;
                }
        
                return (
                    <View key={index}>
                        <MaquinaSection
                            title={section.title}
                            items={sectionItems} //Passa os itens corretos para cada seção
                            selectedItems={selectedItems.filter(item => item.section === section.title)}
                            onAddItem={() => {
                                setSelectedSection(section.title);
                                setModalVisible(true);
                            }}
                            onDelete={() => confirmDeleteSection(section.title)}
                        />
                    </View>
                );
            });
    };
    
    

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

    //Função para adicionar nova máquina
    const addNewMachine = () => {
        const cleanedLetter = newMachineLetter.trim(); //Limpa espaços em branco
    
        //Verifica se a letra da máquina está preenchida e válida
        if (!cleanedLetter || !/^[A-Za-z]$/.test(cleanedLetter)) {
            Alert.alert("Atenção!", "Por favor, insira uma letra válida para a nova máquina.");
            return;
        }
    
        //Define o prefixo da seção com base na opção selecionada
        const sectionPrefix = ['CAIXA', 'BALCAO', 'SERVIDOR', 'CLINICA', 'GERENTE', 'RACK'].includes(selectedOption)
            ? selectedOption === 'CAIXA' ? 'Caixa' 
            : selectedOption === 'BALCAO' ? 'Balcao'
            : selectedOption === 'SERVIDOR' ? 'Servidor'
            : selectedOption === 'CLINICA' ? 'Clinica'
            : selectedOption === 'GERENTE' ? 'Gerente'
            : 'Rack'
            : '';
    
        //Verifica se já existe uma seção com a letra fornecida e o tipo correto
        
        //Verifica se a letra já existe em qualquer seção (não apenas na opção selecionada)
        const letterAlreadyExists = sections.some(
            section => section.title.includes(cleanedLetter.toUpperCase())
        );
    
        if (letterAlreadyExists) {
            Alert.alert("Atenção!", `A letra ${cleanedLetter.toUpperCase()} já está sendo usada em outra seção.`);
        } else {
            //Cria a nova seção com a letra e tipo correto
            const newSection = { 
                title: `${sectionPrefix} ${cleanedLetter.toUpperCase()}`, 
                items: selectedOption === 'CAIXA' ? [...caixaItems] 
                    : selectedOption === 'BALCAO' ? [...balcaoItems]
                    : selectedOption === 'SERVIDOR' ? [...servidorItems]
                    : selectedOption === 'CLINICA' ? [...clinicaItems]
                    : selectedOption === 'GERENTE' ? [...gerenteItems]
                    : [...rackItems]
            };
    
            //Atualiza o estado das seções
            setSections(prevSections => {
                const updatedSections = [...prevSections, newSection];
                return updatedSections;
            });
    
            setNewMachineLetter(""); 
            setModalVisible(false);
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
                            style={[PatrimonioAssinaturaStyles.optionButton, 
                                { 
                                    backgroundColor: isDarkMode ? '#777' : '#aaa', 
                                    //Opacidade reduzida para opções não selecionadas
                                    opacity: selectedOption && selectedOption !== option ? 0.2 : 1, 
                                }
                            ]}
                            onPress={() => toggleOption(option)}
                        >
                            <Text style={[PatrimonioAssinaturaStyles.optionText, themeStyles.text]}>{option}</Text>
                        </TouchableOpacity>

                        {/* Renderiza a seção correspondente ao item selecionado */}
                        {(selectedOption === option && (option === 'CAIXA' || option === 'BALCAO' || option === 'SERVIDOR' || 
                        option === 'CLINICA' || option === 'GERENTE' || option === 'RACK')) && (
                            <>
                                {renderMaquinaSections()}
                                <View style={PatrimonioAssinaturaStyles.buttonAddMachine}>
                                    <Button
                                        title="Adicionar Nova Máquina"
                                        onPress={() => {
                                            setSelectedSection(null);
                                            setModalVisible(true)
                                            }
                                        }
                                        color={isDarkMode ? '#BB5059' : '#BB5059'}
                                    />
                                </View>
                            </>
                        )}
                    </View>
                ))}
            </View>
            {/* Modal de Adicionar Item e Máquina */}
            <Modals
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                modalType={selectedSection ? 'item' : 'machine'} 
                allItems={allItems}
                onSelectItem={addItemToSection}
                onAddMachine={addNewMachine}
                newMachineLetter={newMachineLetter} // Passando a letra da nova máquina
                setNewMachineLetter={setNewMachineLetter}
            />
        </ScrollView>
    );
}
