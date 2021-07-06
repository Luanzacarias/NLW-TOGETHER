import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';

// fazer a tipagem pra usar 2 tipos de tamanho do traço
// se for true ele vai ter o valor menor e centralizado lá no local que for usado
type Props = {
    isCentered?: boolean;
}

export function ListDivider({ isCentered } : Props){
    return(
        <View style={[styles.conteiner,
                // se for centralizado isto, se nn, isso
                isCentered ? { marginVertical: 12 } : {marginTop: 2, marginBottom: 31} 
            ]} />
    )
}