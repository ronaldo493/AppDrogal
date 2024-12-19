import { StyleSheet } from 'react-native';

const Login = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 150,
        height: 100,
        marginBottom: 30,
    },  
    title: {
        fontSize: 18,
        margin: 30,
        fontWeight: '700',
    }, 
    input: {
        width: '100%',
        padding: 14,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
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
        borderRadius: 12,
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
      forgotPassword: {
        marginTop: 15,
      },
      forgotText: {
        color: '#FF0000',
        fontSize: 14,
        fontWeight: '500',
      },
});

export default Login;