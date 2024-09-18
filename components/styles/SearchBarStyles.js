import { Button, StyleSheet } from 'react-native';

export default StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
  },
  suggestionItem: {
    padding: 8,
    fontSize: 45,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  buttonContainer: {
    marginTop: 10,
  }
});
