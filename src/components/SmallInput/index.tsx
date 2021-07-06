import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { styles } from './styles';

// tipagem direta, ele vai ter todas as definições de um input normal
export function SmallInput({...rest} : TextInputProps){
    
    return(
        <TextInput
            style={styles.conteiner}
            keyboardType='numeric'
            {...rest}
        />
    )
}