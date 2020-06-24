import { StyleSheet } from 'react-native';
import Theme from './Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 50
  },
  button: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 62,
  },
  buttonTransparent: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    marginHorizontal: 62,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Theme.txtWhite
  }
});
