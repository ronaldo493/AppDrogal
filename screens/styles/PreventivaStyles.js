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
    }

})

export default PreventivaStyles;