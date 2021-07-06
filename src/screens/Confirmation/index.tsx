import React from 'react';

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
// importar a tipagem do ModalViewOut pra usar a closeModal
import { ModalViewOutProps } from '../../components/ModalViewFooter';
import { useAuth } from '../../hooks/auth';

import { styles } from './styles';

// tipagem para o componente 
type Props = {
    // quando não for out vai ser usado pra ter o nome da guild
    guild?: string;
    // verificação se vai ser ou não pra sair de logado
    out?: boolean;
    // função pra ser colocada a função de fechar modal
    closeModal: () => void;
    // ação que acontece se clicar no botão SIM
    pressYes: () => void;
}

export function Confirmation({ guild, out, closeModal, pressYes } : Props){
    //função de sair de logado
    const { signOut } = useAuth();

  return (
    <View style={styles.content}>
            
        { // se a opção out tiver como true, ent mostra a opção de saida, se não a de excluir appointment
            out ?
            <Text style={styles.title}>
                Deseja sair do Game<Text style={styles.play}>Play</Text>?
            </Text>
            :
            <Text style={styles.title}>
                Deseja excluir o agendamento de <Text style={styles.play}>{guild}</Text>?
            </Text>

        }
                                
        <View style={styles.buttons}>
            <TouchableOpacity 
                style={styles.buttonNo}
                activeOpacity={0.7}
                // quando tocado só fecha a modal
                onPress={closeModal}
            >
                <Text style={styles.buttonText}>Não</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.buttonYes}
                activeOpacity={0.7}
                onPress={pressYes}
            >
                <Text style={styles.buttonText}>Sim</Text>
            </TouchableOpacity>
        </View>

    </View>
  );
}