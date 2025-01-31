import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 70,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
    borderBottomWidth: 0.5,
    borderColor: '#aaa',
  },
  label: {
    fontSize: 15,
    alignItems:'center'
  },    
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    marginTop: 'auto',
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
  },
  content: {
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  errorText: {
    textAlign: 'center',
    color: '#FF0000',
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 15,
    padding: 15
  },
  successText: {
    textAlign: 'center',
    color: 'blue',
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 15,
    padding: 15
  },

  //MODAL SUGESTÃO
  modalContainer: {
    flex:1,
    padding: 30,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#eee'
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalInput: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 0.3,
    padding: 15,
    borderRadius: 8,
    borderColor: "#bbb"
    
  },
  modalInputText:{
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  btnView: {
    flex: 1,
  },
  modalButton: {
    padding: 6,
    borderRadius: 6,
    marginTop: 20,
  },
  textButton: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  }

});
