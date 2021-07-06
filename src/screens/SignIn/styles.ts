import {StyleSheet} from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image:{
        width: '100%',
        height: 360
    },
    content:{
        marginTop: -40,
        paddingHorizontal: 50
    },
    title:{
        color: theme.colors.highlight,
        textAlign: 'center',
        fontSize: 40,
        marginBottom: 16,
        fontFamily: theme.fonts.title700,
        //altura entre as linhas
        lineHeight: 40
    },
    subtitle:{
        color: theme.colors.highlight,
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 64,
        fontFamily: theme.fonts.title700,
        lineHeight: 25
    },

})