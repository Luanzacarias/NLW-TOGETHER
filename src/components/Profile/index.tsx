import React from 'react';
import { View, Text, Alert } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import { Rect } from 'react-native-svg';

import { useAuth } from '../../hooks/auth';

import { Avatar } from '../Avatar';
import { styles } from './styles';

// tipagem pra função de singOut
type Props = {
    // função que vai sair
    handleSignOut: () => void;
}

export function Profile({handleSignOut} : Props) {
    //pegar os dados do user cadastrado no estado e a função de sair de logado
    const { user } = useAuth();

    return(
        <View style={styles.conteiner}>
            <RectButton onPress={handleSignOut}>
                <Avatar urlImage={user.avatar} />
            </RectButton>

            <View>
                <View style={styles.user}>
                    <Text style={styles.greeting}>
                        Olá,
                    </Text>
                    <Text style={styles.userName}>
                        {user.username}
                    </Text>
                </View>

                <Text style={styles.message}>
                    Hoje é dia de vitória!
                </Text>
            </View>

        </View>
    )
}
