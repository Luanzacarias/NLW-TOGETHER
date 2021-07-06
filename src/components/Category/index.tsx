import React from "react";
import { View, Text } from "react-native";
// button que melhor se adequa
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
// pra melhor tipar os ícones em svg
import {SvgProps}  from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';


import { styles } from './styles';
import { categories } from "../../utils/categories";
import { theme } from "../../global/styles/theme";

// uma tipagem para as categorias
type Props = RectButtonProps & {
    title: string;
    // pra pegar o svg de forma dinâmica
    icon: React.FC<SvgProps>;
    // pra indicar se vai ter ou não a checkBox
    hasCheckBox?: boolean;
    // com a interrogação, torna ele opcional
    checked?: boolean;
}

export function Category({
    title,
    // pra transformar ele em um componente
    icon: Icon,
    // como é opcional, deixa o padrão false
    hasCheckBox = false,
    // como é opcional, deixa o padrão false
    checked = false,
    ...rest
} : Props){

    // só pra deixar o código mais enchuto
    const {secondary40, secondary50, secondary70, secondary85} = theme.colors;
/* caso esteja ativo a opacidade é 1, caso nn é 0.4 */ 
/* O style vai variar estando ou nn ativado */
    return(
        <RectButton {...rest}>

            <LinearGradient 
                style={styles.conteiner}
                colors={[secondary50, secondary70]}
            >
                <LinearGradient 
                    style={[styles.content, {opacity: checked ? 1 : 0.5}]}
                    colors={[ checked ? secondary85 : secondary50, secondary40]}    
                >
                    {   // só vai ser colocado se a check box estiver ativada (true)
                        hasCheckBox &&
                        <View style={checked ? styles.checked : styles.check}/>
                    }

                    <Icon 
                        width={48}  
                        height={48}
                    />

                    <Text style={styles.title}>
                        {title}
                    </Text>

                </LinearGradient>
            </LinearGradient>

        </RectButton>
    )
}