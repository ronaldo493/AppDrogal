import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  list: {
    marginTop: 10,
  },
  routeItem: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  removeButton: {
    color: '#BE1817',
    fontSize: 15,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 13,
    fontWeight: 'bold', 
  }
});
