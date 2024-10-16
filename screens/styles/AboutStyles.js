import { StyleSheet } from 'react-native';

const AboutStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  developerText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default AboutStyles;
