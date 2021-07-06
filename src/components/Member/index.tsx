import React from 'react';
import {
    View,
    Text
} from 'react-native';

import { Avatar } from '../Avatar';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

// Tipagem separada pra não ficar muita coisa em um só lugar
// export pra caso queira usar em outro lugar
export type MemberProps = {
    id: string;
    username: string;
    avatar_url: string;
    status: string;
}
// tipagem para pegar a url da imagem de forma dinâmica
type Props = {
    data: MemberProps;
}

export function Mermber({data} : Props){

    // saber se está ou não online, true e false
    const isOnline = data.status === 'online';

    // pra deixar mais bnt
    const { on, primary} = theme.colors;

    return(

        <View style={styles.conteiner}>
            <Avatar 
                urlImage={data.avatar_url}
            />

            <View>
                <Text style={styles.title}>
                    { data.username }
                </Text>

                <View style={styles.status}>
                    <View 
                        style={[
                            styles.bulletStatus,
                            {
                                backgroundColor: isOnline ? on : primary
                            }
                        ]}
                    />
                    
                    <Text style={styles.nameStatus}>
                        { isOnline ? 'Disponível' : 'Ocupado' }
                    </Text>
                    
                </View>

            </View>
        </View>
    )
}