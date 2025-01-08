import { StyleSheet } from 'react-native';

const ChamadosStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 15,
        flex: 1,
    },
    btnContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    button: {
        padding: 10,
        borderRadius: 8,
        flex: 1,
    },
    textTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    content: {
        marginTop: 10,
    },
    textContent: {
        fontSize: 15,
    }
    
});

export default ChamadosStyles;