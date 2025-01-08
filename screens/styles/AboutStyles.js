import { StyleSheet } from 'react-native';

const AboutStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    lineHeight: 26,
    marginBottom: 10,
    textAlign: 'justify',
  },
  highlightText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  versionText: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  developerText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default AboutStyles;
