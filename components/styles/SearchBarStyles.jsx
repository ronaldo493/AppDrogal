import { Button, StyleSheet } from 'react-native';

export default StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
  },
  suggestionItem: {
    padding: 8,
    borderRadius: 8,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 10,
  }
});
