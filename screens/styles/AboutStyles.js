import { StyleSheet } from 'react-native';

const AboutStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 10,
    textAlign: 'justify',
  },
  highlightText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  versionText: {
    fontWeight: 'bold',
    fontSize: 16,
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
