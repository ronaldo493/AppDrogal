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
        justifyContent:'space-between',
        flexDirection: 'row',
        marginTop: 10,
      },

      registerText: {
        color: '#222AAA',
        fontWeight: '500',
      },
      forgotText: {
        color: '#FF0000',
        fontSize: 14,
        fontWeight: '500',
      },
});

export default Login;