import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 25,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontSize: 17,
  },    
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  language: {
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
  },
  footer: {
    marginTop: 'auto',
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#888',
  },
});
