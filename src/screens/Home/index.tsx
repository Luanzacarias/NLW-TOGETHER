import React, { useState, useCallback } from "react";
import {View, FlatList} from 'react-native';
// navegação
import { useNavigation, useFocusEffect } from "@react-navigation/native";
// armazenamento
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";

import { styles } from './styles';
// Components
import { Profile } from "../../components/Profile";
import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { ListHeader } from "../../components/ListHeader";
import { Appointment, AppointmentProps } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { Background } from '../../components/Backgound';
import { Load } from "../../components/Load";
// para sair 
import { ModalViewFooter } from '../../components/ModalViewFooter';
import { Confirmation } from "../Confirmation";
import { useAuth } from "../../hooks/auth";

export function Home(){
    // função que para de estar logado
    const { signOut } = useAuth();
    // o que vai estra armazenando as categorias 
    const [category, setCategory] = useState('');

    // estado para o indicativo de loading
    const [load, setLoad] = useState(true);

    // Estado para a listagem dos agendamentos (appointments), tipado na forma de AppointmentsProps
    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

    // estado pra configurar quando o modal erá visível
    const [openModal, setOpenModal] = useState(false);

    // Para poder fazer a navegação
    const navigation = useNavigation();

    // função pra ABRIR o modal
    function handleOpenModal(){
        setOpenModal(true);
    }
    // função pra FECHAR o modal
    function handleCloseModal(){
        setOpenModal(false);
    }

    // função de rota pra appointmentDetails do agendamento selecionado 
    function handleAppointmentDetails(guildSelected : AppointmentProps){
        // passando junto: rota e um conteúdo
        navigation.navigate('AppointmentDetails', { guildSelected })
    }
    // função de rota pra AppointmentCreate
    function handleAppointmentCreate(){
        navigation.navigate('AppointmentCreate')
    }

    // função para ver se está ou nn selecionado e alterar o style em Category
    function handleCategorySelect(categoryId: string){
        // se a categoria selecionada já está marcada, ent tire e se não é um que está selecionado, ent atribua um novo ID
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    // função pra carregar os agendamentos salvos
    async function loadAppointments() {
        // pegar os agendamentos salvos
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);

        // vamos já tipar como um AppointmentProps pra poder alterar entre as categorias depois
        // transformando o storage em objeto
        const storage: AppointmentProps[] = response ? JSON.parse(response) : []

        // se alguma categoria estiver selecionada(o filtro)
        if(category) {
            // selecionar só os que tiverem a mesma categoria da que está selecionada
            setAppointments(storage.filter(item => item.category === category));
        }else {
            // se não tiver categoria selecionada, mostra td
            setAppointments(storage);
        }

        // tirar o indicativo de load
        setLoad(false);
    }

    // usar useFocusEffect pra que td vez que essa tela estiver em "focu"/em usa, ele atualiza ela
    // useCallback lembra mais facilmente de uma função e carrega ela mais rápido
    useFocusEffect(useCallback(() => {
        loadAppointments();
    }, [category])); // dessa vez passamos que há uma dependência, o category

    return(
        <>
            <Background>

                <View style={styles.header}>
                    <Profile handleSignOut={handleOpenModal} />
                    <ButtonAdd onPress={handleAppointmentCreate} />
                </View>
                
                <CategorySelect 
                    categorySelected={category}
                    setCategory={handleCategorySelect}
                />
                

                
                {
                    load ? <Load />
                    :
                    // um fragment por volta pra poder enviar 2 elementos sem usar a View(que alteraria o style delas)
                    <> 
                        <ListHeader 
                            title='Partidas agendadas'
                            subtitle={`Total ${appointments.length}`}
                        />
                        
                        <FlatList 
                            data={appointments}
                            // transforma o id em key
                            keyExtractor={item => item.id}
                            renderItem={({item}) => (
                                <Appointment 
                                    data={item}
                                    // função pra levar o usuário pra AppointmentDetails do que foi clicado
                                    onPress={() => handleAppointmentDetails(item)}
                                />
                            )}
                            // item para separar cada componente da lista
                            ItemSeparatorComponent={() => <ListDivider/> }
                            style={styles.matches}
                            showsVerticalScrollIndicator={false}
                            // para colocar um style interno na lista
                            // com isso temos um "respiro" no ultimo item da lista
                            contentContainerStyle={{paddingBottom: 69}}
                        />
                    </>
                }
            </Background>
            
            <ModalViewFooter 
                // a modal só vai ser visível quando tiver true
                visible={openModal}
                // pra fechar a modal
                closeModal={handleCloseModal}
            >
                <Confirmation 
                    // pra fechar a modal
                    closeModal={handleCloseModal} 
                    // se clicar em sim, ent chama a função de SingOut
                    pressYes={signOut}
                    // nossa indicação de layout de sigOut
                    out
                />
            </ModalViewFooter>

        </>
    )
}