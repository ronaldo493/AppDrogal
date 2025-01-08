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
});
