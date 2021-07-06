import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { SignIn } from '../screens/SignIn';

import { AppRoutes } from './app.routes';
import { useAuth } from '../hooks/auth';

export function Routes(){

    // acessar o estado do usuário pra verificar se está logado
    const { user } = useAuth();

    return(
        // NavigationContainer cuida da rota aberta anteriormente, ajuda na função "voltar", voltar para uma tela anteior a X
        <NavigationContainer>
            {
                // se houver user cadastrado ent vai pra págs normais, se não vai pra página pra cadastrar com o discord
                user.id ? <AppRoutes /> : <SignIn/>
            }
        </NavigationContainer>
    )
}