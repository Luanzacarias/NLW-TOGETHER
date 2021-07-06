import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
// Biblioteca para ícones
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';


// A tipagem é as próprias características de um RectButton
export function ButtonAdd({...rest} : RectButtonProps) {
    return(
        <RectButton 
            style={styles.conteiner}
            {...rest}
        >

            <MaterialCommunityIcons 
                name="plus"
                color={theme.colors.heading}
                size={24}
            />

        </RectButton>
    )
}
