import React from "react";
// vamos substituir o TouchableOpacity por ele para melhorar a experiência de usuário 
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { Text, View, Image } from "react-native";

import DiscordImg from '../../assets/discord.png';
import { styles } from './styles';

// vamos definir propriedades para o nosso button
// pode ser Props ou interface
// as minhas propriedades recebem todas as propriedades de um RectButton + as que eu defini
type Props = RectButtonProps & {
    title: string,
}

// O title está requerindo a tipagem de title em Props
// ...rest pq pega as outras propriedades não definidas que foram colocadas onde está sendo usado o componente
export function ButtonIcon({title, ...rest} : Props){
    return(
        <RectButton 
            style={styles.conteiner} 
            {...rest}
        >
            <View style={styles.iconWrapper}>
                <Image source={DiscordImg} style={styles.icon} />
            </View>

            <Text style={styles.title}>
                {title} 
            </Text>

        </RectButton>
    )
}