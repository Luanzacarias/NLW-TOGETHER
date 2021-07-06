import React from 'react';
import { Image } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

// tipagem para imagem
type Props = {
    urlImage: string;
}

export function Avatar({urlImage} : Props) {
    // só pra deixar o código masi enchuto
    const {secondary50, secondary70} = theme.colors;
 
    return(
        <LinearGradient 
            style={styles.conteiner}
            colors={[secondary50, secondary70]}
        >
            <Image 
                source={{ uri: urlImage }}
                style={styles.avatar}
            />

        </LinearGradient>
    )
}
