import { StyleSheet, Platform } from 'react-native';
import Theme from './Theme';

export default StyleSheet.create({
    container: {
        backgroundColor: Theme.bgPrimaryColor,
        height: 75,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontFamily: Theme.fontMedium,
        fontSize: 11,
        alignSelf: 'center',
        marginBottom: Platform.OS === 'ios' ? 0 : 10
    },
    image: { height: 34 }
});
