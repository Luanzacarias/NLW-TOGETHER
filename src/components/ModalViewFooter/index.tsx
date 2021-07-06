// quase igual a outra modal, porém usada para parar de estar logado app
import React, { ReactNode } from "react";
import { 
    View ,
    Modal,
    ModalProps,
    // pra identificar o toque do usuário, sem detalhe visual
    // vamor usar pra fazer com que a modal feche quando tocar fora dela
    TouchableWithoutFeedback,
    Text,
    TouchableOpacity
} from "react-native";
import { useAuth } from "../../hooks/auth";

import { Background } from "../Backgound";

import { styles } from "./styles";

// tipagem da modal
// pra passar a modal por volta dos "filhos" (do conteúdo colocado)
export type ModalViewOutProps = ModalProps & {
    children: ReactNode;
    // pra fechar a modal
    closeModal: () => void; // uma função que não precisa retornar nada
}

export function ModalViewFooter({children, closeModal, ...rest} : ModalViewOutProps){
    return(
        <Modal
            transparent
            animationType='fade'
            // deixa a statusBar translucida quando a modal for ativada
            statusBarTranslucent
            {...rest}
        >
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.overlay}>
                    <View style={styles.conteiner}>

                        <Background>
                            
                            {children}
                            
                        </Background>
                        
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}