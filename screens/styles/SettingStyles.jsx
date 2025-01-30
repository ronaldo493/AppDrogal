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
  },
  label: {
    fontSize: 15,
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

  //MODAL SUGESTÃO
  modalContainer: {
    marginVertical: 'auto',
    padding: 20,
    marginHorizontal: 25, 
    justifyContent: 'center',
    borderRadius: 8,
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
    padding: 8,
    backgroundColor: 'red',
    borderRadius: 6,
    marginTop: 10,
  },
  textButton: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  }

});
