import React from 'react';
import { Image, View } from 'react-native';

import { styles } from './styles';

import DiscordSvg from "../../assets/discord.svg"

// link pro cdn, onde há as imagens do discord
const { CDN_IMAGE } = process.env;

// tipagem pra pegaar a imagem de cada servidor 
type Props = {
    guildId: string;
    iconId: string | null;
}

export function GuildIcon({guildId, iconId} : Props) {
    const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`; //pra pegar a imagem do servidor no cdn do discord

    return(
        <View style={styles.conteiner}>
            { 
                // se o servidor tiver um icone, vai passar ele, se nn, vai passar um icone padrão   
                iconId ?
                <Image 
                    source={{uri}}
                    style={styles.image}
                    // quando a imagem não tiver uma proporção boa, ele reajusta
                    resizeMode='cover'
                />
                :
                <DiscordSvg
                    width={40}
                    height={40}
                />
            }
        </View>
    )
}