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
        padding: 16,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
    },
    optionText: {
        fontSize: 15,
    },
    buttonSend: {
	marginTop: '5%',
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
    sectionHeader: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: 6, 
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

    //Modal
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 15,
        textAlign: 'center',
        borderRadius: 6,
    },
    modalButton: {
        padding: 4,
        marginVertical: 5,
        borderRadius: 4,
    },
    input: {
        marginBottom: 25,
    }, 
    buttonAddMachine:{
        marginBottom: 10,
    },
    modalScan:{
        flex: 1,
    },
    viewButton:{
        position: 'absolute', 
        bottom: 0,
        left: 0,
        right: 0,
        padding: 30,
    }
});

export default PatrimonioAssinaturaStyles;
