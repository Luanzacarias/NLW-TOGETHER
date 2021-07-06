import { StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    conteiner:{
        flex: 1,
    },
    banner:{
        width: "100%",
        height: 234,
    },
    bannerContent:{ // foi criado pq se colocar padding horizontal no ImageBackgroundo a imagem fica deslocada
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 24,
        marginBottom: 30
    },
    title:{
        fontSize: 28,
        fontFamily: theme.fonts.title700,
        color: theme.colors.heading
    },
    subtitle:{
        fontSize: 13,
        fontFamily: theme.fonts.text400,
        color: theme.colors.heading,
        lineHeight: 21
    },
    members:{
        marginLeft: 24,
        marginTop: 27
    },
    footer:{
        paddingHorizontal: 24,
        paddingVertical: 20,
        // pra ter o distanciamento correto, tirando o espaço do botão inferior do próprio celular
        marginBottom: getBottomSpace()
    },
    headerIcons:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon:{
        paddingLeft: 10
    }
})