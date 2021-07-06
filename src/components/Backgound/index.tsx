import React, { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

// Tipagem
type Props = {
    // ReactNode qualquer elemento filho do react
    children: ReactNode;
}


export function Background({children} : Props){

    // só pra deixar o código masi enchuto
    const {secondary80, secondary100} = theme.colors;

    // a gnt vai passar um elemento "filho" que vai ser embrulhado pelo nosso linear gradient
    // ou seja, nossas pags que serão feitas estarão envolvidas pelo linear gradiente, sendo o filho (children)
    return(
        <LinearGradient 
            style={styles.conteiner}
            colors={[secondary80, secondary100]}
        >

            {children}

        </LinearGradient>
    )
}