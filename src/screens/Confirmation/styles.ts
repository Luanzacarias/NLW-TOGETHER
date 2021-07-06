import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    content:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 15
    },
    title:{
        color: theme.colors.heading,
        fontFamily: theme.fonts.title700,
        fontSize: 20,
        paddingHorizontal: 24
    },
    play:{
        color: theme.colors.primary
    },
    buttons:{
        flexDirection: 'row',
    },
    buttonNo:{
        height: 56,
        width: 160,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.colors.secondary50,
        borderRadius: 8,
    },
    buttonYes:{
        height: 56,
        width: 160,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        borderRadius: 8,
        marginLeft: 8
    },
    buttonText:{
        color: theme.colors.heading,
        fontFamily: theme.fonts.text500,
        fontSize: 15
    }
});