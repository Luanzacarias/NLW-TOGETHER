import { StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { theme } from "../../global/styles/theme";


export const styles = StyleSheet.create({
    conteiner:{
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 170,
        width: '100%',
        marginBottom: getBottomSpace(),
        
    },
    overlay:{
        flex: 1,
        backgroundColor: theme.colors.overlay
    }
})