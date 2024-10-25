import { StyleSheet } from "react-native";

const SuporteStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginVertical: 25,
        textAlign: 'center',
        
    },
    tipText: {
        fontSize: 16,
        lineHeight: 21,
        marginBottom: 21,
        textAlign: 'justify',
    },
    tipTextObs: {
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 21,
        marginBottom: 21,
        textAlign: 'justify',
    },
    scrollContainer: {
        flex: 1,
    }
});

export default SuporteStyles;