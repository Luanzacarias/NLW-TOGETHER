import React from "react";
import { 
    View,
    Text,
    TouchableOpacity,
    TouchableOpacityProps 
} from "react-native"; 
import { GuildIcon } from "../GuildIcon";
import { Feather } from "@expo/vector-icons";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";

// pra exportar caso queira usar em ooutro arquivo
// tipagem do data para ficar mais organizado

export type GuildProps = {
    id: string;
    name: string;
    icon: string | null; // ou isso ou aquilo
    owner: boolean;
}

// tipagem
type Props = TouchableOpacityProps & {
    data: GuildProps;
}

export function Guild({ data, ...rest} : Props){

    return(
        <TouchableOpacity
            style={styles.conteiner}
            activeOpacity={0.7}
            {...rest}
        >
            <GuildIcon guildId={data.id} iconId={data.icon} />

            <View style={styles.content}>
                <View>
                    <Text style={styles.title}>
                        {data.name}
                    </Text>

                    <Text style={styles.type}>
                        { data.owner ? 'Administrador' : 'Convidado' } 
                    </Text>

                </View>
            </View>

            <Feather
                name='chevron-right'
                color={theme.colors.heading}
                size={24}
            />

        </TouchableOpacity>
    )
}