import React, { ReactNode } from "react";
import { 
    View ,
    Modal,
    ModalProps,
    // pra identificar o toque do usuário, sem detalhe visual
    // vamor usar pra fazer com que a modal feche quando tocar fora dela
    TouchableWithoutFeedback
} from "react-native";

import { Background } from "../Backgound";

import { styles } from "./styles";

// tipagem da modal
// pra passar a modal por volta dos "filhos" (do conteúdo colocado)
type Props = ModalProps & {
    children: ReactNode;
    // pra fechar a modal
    closeModal: () => void; // uma função que não precisa retornar nada
}

export function ModalView({children, closeModal, ...rest} : Props){
    return(
        <Modal
            transparent
            animationType='slide'
            // deixa a statusBar translucida quando a modal for ativada
            statusBarTranslucent
            {...rest}
        >
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.overlay}>
                    <View style={styles.conteiner}>

                        <Background>
                            <View style={styles.bar} />
                            {children}
                        </Background>
                        
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}