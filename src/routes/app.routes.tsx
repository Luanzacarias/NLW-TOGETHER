// ARQUIVO PARA AS ROTAS QUE O USUÁRIO TEM ACESSO QUANDO AUTENTICADO

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { theme } from '../global/styles/theme';

import { Home } from '../screens/Home';
import { AppointmentDetails } from '../screens/AppointmentDetails';
import { AppointmentCreate } from '../screens/AppointmentCreate';


const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
    // por padrão ele retorna a primeira Screen como inicial
    return(
        <Navigator
            // vamos passar dizendo oq a gnt quer e nn quer que aconteça, uma vez que ele acrescenta alguns elementos por padrão
            headerMode="none"
            screenOptions={{
                cardStyle: {
                    // no iphone não fica bom com 'transparent', ent precisa de uma cor
                    backgroundColor: theme.colors.secondary100
                }
            }}
        >

            <Screen 
            // nome que vai chamar a tela e o componente que a representa
                name="Home"
                component={Home}
            />
            <Screen 
            // nome que vai chamar a tela e o componente que a representa
                name="AppointmentDetails"
                component={AppointmentDetails}
            />
            <Screen 
            // nome que vai chamar a tela e o componente que a representa
                name="AppointmentCreate"
                component={AppointmentCreate}
            />
        </Navigator>
    )
}