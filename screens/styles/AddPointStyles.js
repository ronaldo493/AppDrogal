import { StyleSheet } from 'react-native';

const AddPointStyles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
      marginHorizontal: 15,
      marginBottom: 10,
    },
    title: {
      fontSize: 18,
      padding: 15,
      margin: 8,
      textAlign: 'center',
      fontWeight: 'bold',
      borderRadius: 8,
    },
    containerBtn: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    btnAdd: {
      padding: 15,
      margin: 15,
    },
    buttonContainer: {
      flex: 1,
    },
    btnFinal: {
      paddingVertical: 9,
      textAlign: 'center',
      margin: 10,
    },
    inputDesc: {
      margin: 15,
    },
  });


export default AddPointStyles;

