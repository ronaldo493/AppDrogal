import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  list: {
    marginTop: 10,
  },
  routeItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  removeButton: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
