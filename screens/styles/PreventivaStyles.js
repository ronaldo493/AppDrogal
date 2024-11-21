import { StyleSheet } from "react-native";

const PreventivaStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 17,
        marginVertical: 14,
        textAlign: 'left',
    },
    input: {
        flex: 1,
        marginRight: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    button: {
        padding: 14,
        borderRadius: 4,
        fontWeight: 'bold',
        elevation: 4
    },
    //Estilo para o Checklist Renderizado
    checklistItem: {
        fontSize: 16,
        fontStyle: 'italic',
        marginVertical: 5,
        color: '#333',
        backgroundColor: '#f8f8f8',
        padding: 8,
        borderRadius: 8,
        borderColor: '#ddd',
        elevation: 2, 
    },
    buttonCheckContainer: {
        width: '100%',
        margin: 15,
        flex: 1,
        alignItems: 'flex-start',
    },
    buttonChecklist: {
        fontSize: 16,
        padding: 14,
        borderRadius: 4,
        fontWeight: 'bold',
    },
    FlatlistContainer:{
        margin: 15,
    },
    checklistContainer:{
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
    optionButton: {
        padding: 10,
        borderBottomWidth: 1,
    },
    optionText: {
        textAlign: 'center',
    },
    closeButton: {
        padding: 10,
        borderRadius: 6,
        marginTop: 25,
    }


})

export default PreventivaStyles;