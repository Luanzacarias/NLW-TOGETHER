import React from 'react';
import { View, Text, } from 'react-native';

import { styles } from './styles';

// tipagem para da ListHeader
type Props = {
    title: string;
    subtitle: string;
}

export function ListHeader({ title, subtitle} : Props) {
    
    return(
        <View style={styles.conteiner}>
            <Text style={styles.title}>
                {title}
            </Text>

            <Text style={styles.subtitle}>
                {subtitle}
            </Text>
        </View>
    )
}
