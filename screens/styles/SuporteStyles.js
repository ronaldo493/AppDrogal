import { StyleSheet } from "react-native";

const FeedBackStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginVertical: 35,
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
        flexGrow: 1,
    }
});

export default FeedBackStyles;