import React from 'react';
import { View, Text, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import  { Swipeable }  from 'react-native-gesture-handler';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
//imagens
import PlayerSvg from '../../assets/player.svg';
import CalendarSvg from '../../assets/calendar.svg';
// components
import { GuildIcon } from '../GuildIcon';
import { categories } from '../../utils/categories';

// tipagem do guid (guildProps)
import { GuildProps } from '../Guild';

// tipagem dos dados para exportar, já que pode ser usada em outro arquivo, facilita o uso
export type AppointmentProps = {
    id: string;
    guild: GuildProps;
    category: string;
    date: string;
    description: string;
}

// tipagem para Appointment
type Props = RectButtonProps & {
    data: AppointmentProps;
}

export function Appointment({data, ...rest} : Props) {
    
    // a categoria la so pega o id, ai aq vamos fazer um filtro percorrendo as categorias para pegar a que tem o ID da category
    // em array para pegar o objeto em si q vai está na primeira posição
    const [category] = categories.filter(item => item.id === data.category)

    // desestruturando e pegando o valor pra conferir em PlayerSvg
    const { owner } = data.guild;

    // Desestruturando as cores, só pra ficar menos coisa em baixo
    const { primary, on, secondary50, secondary70 } = theme.colors;

    return(
        <RectButton {...rest}>
            
            <View style={styles.conteiner}>

                <LinearGradient
                    // pra deixar com um leve degrade
                    style={styles.guidIconConteiner}
                    colors={[secondary50, secondary70]}
                >
                    <GuildIcon guildId={data.guild.id} iconId={data.guild.icon} />
                </LinearGradient>

                <View style={styles.content}>
                    <View style={styles.header}>

                        <Text style={styles.title}>
                            {data.guild.name}
                        </Text>

                        <Text style={styles.category}>
                            { category.title }
                        </Text>

                    </View>

                    <View style={styles.footer}>
                        <View style={styles.dateInfo}>
                            <CalendarSvg />

                            <Text style={styles.date}>
                                {data.date}
                            </Text>
                        </View>

                        <View style={styles.playersInfo}>
                            <PlayerSvg 
                                // vamos mudar o preenchimento dele se ele for, ou não, o dono (owner)
                                // se nn for o dono, fica com vermelho, se for, verde
                                fill={ owner ? primary : on}
                            />
                            
                            <Text style={[styles.player, {color: owner ? primary : on}]}>
                                { owner ? 'Anfitrião' : 'Visitante'}
                            </Text>

                        </View>
                    </View>
                </View>
            </View>

        </RectButton>
    )
}
