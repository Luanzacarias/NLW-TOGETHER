import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    conteiner:{
        flex: 1,
    },
    label:{
        fontSize: 18,
        fontFamily: theme.fonts.title700,
        color: theme.colors.heading
    },
    form:{
        paddingHorizontal: 24,
        marginTop: 32
    },
    select:{
        width: '100%',
        flexDirection: 'row',
        height: 68,
        borderColor: theme.colors.secondary50,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        paddingRight: 25,
        // pra encaixar com a outra borda e nn ficar um espaço grande
        overflow: 'hidden'
    },
    selectBody:{
        flex: 1,
        alignItems: 'center',
    },
    image:{
        width: 64,
        height: 68,
        backgroundColor: theme.colors.discord,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: theme.colors.secondary50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    field:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30
    },
    column:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    divider:{
        marginRight: 4,
        fontSize: 18,
        fontFamily: theme.fonts.text500,
        color: theme.colors.highlight
    },
    caractereLimit:{
        color: theme.colors.highlight,
        fontFamily: theme.fonts.text400,
        fontSize: 13
    },
    footer:{
        marginVertical: 20,
        // pra quando ter um "respiro" no distanciamento quando abrir o teclado
        // msm altura do botão
        marginBottom: 56
    }
})