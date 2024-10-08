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
    borderWidth: 0.8,
    padding: 8,
    borderRadius: 4,
  },
  suggestionItem: {
    padding: 8,
    borderRadius: 8,
    borderBottomColor: '#ccc',
  },

  buttonContainer: {
    marginTop: 10,
  }
});
