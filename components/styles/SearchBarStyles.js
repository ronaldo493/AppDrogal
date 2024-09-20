import { Button, StyleSheet } from 'react-native';

export default StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 1.3,
    borderColor: '#2196F3',
    padding: 8,
    borderRadius: 4,
  },
  suggestionItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
  },

  buttonContainer: {
    marginTop: 10,
  }
});
