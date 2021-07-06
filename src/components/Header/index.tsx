import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
// para o botão de voltar
import { BorderlessButton } from 'react-native-gesture-handler';
// ícones
import { Feather } from '@expo/vector-icons';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { useNavigation } from '@react-navigation/native';

// tipagem para no Header, já que vamos usar levemente diferente em algumas partes do App
type Props = {
    title: string;
    // um botão, "pd ser o ícone de compartilhar"
    action?: ReactNode;
}

export function Header({title, action} : Props){
    
    // só pra deixar o código mais enchuto
    const {secondary40, secondary100, heading} = theme.colors;

    // para fazer a navegação
    const navigation = useNavigation();

    // função pra voltar a página
    function handleGoBack(){
        navigation.goBack();
    }

    return(

        <LinearGradient
            style={styles.conteiner}
            colors={[secondary100, secondary40]}
        >

            <BorderlessButton
                // button recomendado para botão que não tem text
                onPress={handleGoBack}
            >
                <Feather
                // ícone
                    name='arrow-left'
                    size={24}
                    color={heading}
                />
            </BorderlessButton>

            <Text style={styles.title}>
                {title}
            </Text>

            
            <View>
                { action }
            </View>
            

        </LinearGradient>
       
    )
}