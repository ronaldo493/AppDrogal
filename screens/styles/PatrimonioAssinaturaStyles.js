import { StyleSheet } from "react-native";

const PatrimonioAssinaturaStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    filialText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    optionContainer: {
        marginTop: 10,
    },
    optionButton: {
        padding: 5,
        marginVertical: 5,
    },

    //Estilo Máquina Section
    contentSection: {
        marginBottom: 20,
        padding: 5,
    },
    titleSection: {
        fontSize: 16,             
        fontWeight: 'bold',       
        marginVertical: 18,        
    },
    sectionItem: {
        marginBottom: 30,
    },

    //Itens do Maquina Item
    itemRowContainer: {
        flexDirection: "row",
        marginBottom: 10,
        justifyContent: "space-between",
        alignItems: "center", 
    },
    itemLabel: {
        fontSize: 16,
        flex: 1,
    },
    PatrimonioInput: {
        flex: 2,

        marginRight: 8,
    },
    scanButton: {
        flex: 1,
    },
});

export default PatrimonioAssinaturaStyles;
