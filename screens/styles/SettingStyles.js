import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 70,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
    borderBottomWidth: 1,
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
  },
  content: {
    borderRadius: 8,
    paddingHorizontal: 15,
  },
});
