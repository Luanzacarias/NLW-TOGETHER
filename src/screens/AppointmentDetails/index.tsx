import React, {useState, useEffect} from 'react';
import { 
    View, 
    Text, 
    FlatList,
    ImageBackground,
    Alert,
    Share, // uma api pra mexer com compartilhamento
    Platform
} from 'react-native'; // Conteiner com a possibilidade de ter uma imagem no fundo

// pra fazer o redirecionamento ao clicar no botão "entrar no servidor"
import * as Linking from 'expo-linking';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  COLLECTION_APPOINTMENTS } from "../../configs/database";

import { useRoute } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
// components
import { Background } from '../../components/Backgound';
import { ListHeader } from '../../components/ListHeader';
import { Header } from '../../components/Header';
import { MemberProps, Mermber } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { AppointmentProps } from '../../components/Appointment';
import { Load } from '../../components/Load';
import { ModalViewFooter } from '../../components/ModalViewFooter';
// screen
import { Confirmation } from '../Confirmation';

import { api } from '../../services/api';
// imagem
import BannerImg from '../../assets/banner.png';
// style
import { styles } from './styles';
import { theme } from '../../global/styles/theme';


// tipagem pra definir o que tem dentro de params
type Params = {
    guildSelected: AppointmentProps;
}

// tipagem para o que a gente pegar da api
type GuildWidget = {
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];
}
    

export function AppointmentDetails(){

    // rota pra levar o usuário pra o agendamento certo
    const route = useRoute();
    // acessar o que vem passado pelo parâmetro da página Home (o item selecionado)
    const { guildSelected } = route.params as Params; // tipado no formato Paramns

    //salvar as informações do que foi solicitado pela api
    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);

    // indicação do loading das informações
    const [loading, setLoading] = useState(true);

    // estado pra configurar quando o modal erá visível
    const [openModal, setOpenModal] = useState(false);

    // pra levar o usuário pra tela de inicio após excluir o agendamento
    const navigation = useNavigation();

    // função pra ABRIR o modal
    function handleOpenModal(){
        setOpenModal(true);
    }
    // função pra FECHAR o modal
    function handleCloseModal(){
        setOpenModal(false);
    }
    

    // função para EXCLUIR os dados do agendamento selecionado
    async function handleRemoveAppointment(appointmentId : string) {
        

        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const appointments = storage ? JSON.parse(storage): [];
        
        // vamos começar o processo de remover o item armazenado se não for um objeto vazio
        if (appointments !== []){
            for (let i = 0; i < appointments.length; i++){
                // qunado o id do appointment armazenado for igual ao selecionado, ele vai remover da lista
                if (appointments[i].id === appointmentId){
                    appointments.splice(i, 1);
                }
            }
        }
        
        await AsyncStorage.setItem(
            // local de salvamento
            COLLECTION_APPOINTMENTS,
            // dado atualizado que vai salvar 
            JSON.stringify(appointments) 
        );

        // levar o usuário para a tela home
        navigation.navigate('Home');
    }


    // vamos fazer uma função para buscar pela api os jogadores do canal selecionado
    async function fetchGuildWidget(){
        try {
            // tentar fazer a solicitação pela rota que o discord disponibiliza
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`); // widget a pessoa ativa essa função no próprio servidor do discord para nos liberar algumas informações
            
            // salvar esses dados pegos 
            setWidget(response.data);

        } catch {
            // caso dê algum erro, retorna a msg padrão
            Alert.alert(`Verifique as configurações do servidor. Será que o Widget está habilitado?`);
        } finally {
            // parar a indicação do load
            setLoading(false);
        }
    }

    // função pro compartilhamento 
    function handleShareInvitacion() {
        // mensagem vai variar de acordo com a plataforma
        const message = Platform.OS === 'ios' 
        ? `Junte-se a ${guildSelected.guild.name}`
        : widget.instant_invite;

        Share.share({
            // com a mensagem e a url
            message,
            url: widget.instant_invite
        });
    }

    // função pra redirecionar o user para o discord quando clicar no botão
    function handleOpenGuild() {
        // ele abre o link que está la nos dados obtidos do servidor
        Linking.openURL(widget.instant_invite);
    }

    // pra chamar a função quando entrar na página
    useEffect(() => {
        fetchGuildWidget();
    }, [])

    // <> Fragment para engoblar os dois elementos sem nenhuma alteração
    return(
        <>
            <Background>
                <Header
                    title='Detalhes'
                    action={
                        <View style={styles.headerIcons}>
                            <BorderlessButton 
                                /* botão de excluir o Appointment */
                                onPress={handleOpenModal}
                            >
                                <Feather 
                                    name="trash-2" 
                                    size={26} 
                                    color={theme.colors.primary}
                                />
                            </BorderlessButton>

                        {   // só mostra o botão de compartilhar se o user for o dono do servidor
                            guildSelected.guild.owner &&
                            <BorderlessButton onPress={handleShareInvitacion} >
                                
                                <Fontisto 
                                    name='share'
                                    size={24}
                                    color={theme.colors.primary}
                                    style={styles.icon}
                                />
                            </BorderlessButton>
                        }

                        </View>
                    }
                />

                <ImageBackground
                    source={BannerImg}
                    style={styles.banner}
                >
                    <View style={styles.bannerContent}>
                        <Text style={styles.title}>
                            { guildSelected.guild.name }
                        </Text>
                        <Text style={styles.subtitle}>
                            { guildSelected.description }
                        </Text>
                    </View>

                </ImageBackground>

                

                {   // se loadin tiver ativado vai a tela de load, se nn vai a flatList
                    loading ? <Load /> 
                    :
                    <>
                        <ListHeader 
                        title='Jogadores'
                        subtitle={ widget.members.length === undefined ? '' : `Total ${widget.members.length}`}
                        />
                        <FlatList
                            data={widget.members}
                            // transformando em key o id de cada um
                            keyExtractor={item => item.id}
                            renderItem={({item}) => (
                                <Mermber data={item} />
                            )}
                            ItemSeparatorComponent={() => <ListDivider isCentered />}// nossa propriedade que ceixa a linha no centro
                            style={styles.members}
                        />
                    </>
                }

                {
                    // só mostra o botão se o user for o dono do servidor
                    guildSelected.guild.owner &&
                    <View style={styles.footer}>
                        <ButtonIcon 
                            title='Entrar na Partida'
                            onPress={handleOpenGuild}
                        />
                    </View>
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
                    pressYes={() => handleRemoveAppointment(guildSelected.id)}
                    // o nome do servidor
                    guild={guildSelected.guild.name}
                    // não vai ser layout de sigOut
                    out={false}
                />
            </ModalViewFooter>
        </>
    )
}