import { StyleSheet } from 'react-native';

const Login = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        padding: 20,
    },
    headerLogin: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    logo: {
        width: 150,
        height: 100,
        marginBottom: 50,
    },  
    input: {
        width: '100%',
        padding: 14,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#333',
        elevation: 3,
        shadowColor: '#000', //Sombra para iOS

      },
      button: {
        width: '100%',
        padding: 14,
        backgroundColor: '#5A9BD5',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        elevation: 5,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,

      },
      errorText: {
        color: '#FF0000',
        fontSize: 14,
        marginBottom: 15,
      },
      footerLogin: {
        display: 'flex',
        alignItems:'center',
        marginTop: 15,
      },
      forgotText: {
        color: '#FF0000',
        fontSize: 14,
        fontWeight: '500',
      },

      //EditProfile
      container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 50,
        textAlign: 'center',
      },
      infoBox: {
        marginBottom: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#fff',
      },
      label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
      },
      value: {
        fontSize: 16,
        color: '#777',
        marginTop: 5,
      },
});

export default Login;