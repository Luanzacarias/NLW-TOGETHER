import { StyleSheet } from "react-native";
// pra pegar a altura do iphone na hr do margin top
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const styles = StyleSheet.create({
    conteiner:{
        flex: 1,
    },
    header:{
        width: '100%',
        paddingHorizontal: 24,
        flexDirection: 'row',
        // pra ocupar as extremidades e ter espaço entre os itens
        justifyContent: 'space-between',
        // quando for androis o getStatusBarHeight conta como 0
        marginTop: getStatusBarHeight() + 26,
        marginBottom: 42
    },
    matches:{
        marginTop: 24,
        marginLeft: 24
    }
});