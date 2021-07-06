import React, { useState } from 'react';
import { 
    View, 
    Text,
    ScrollView,
    // pra fazer com q tudo suba junto com o teclado, pra ficar visivelmente agradável
    KeyboardAvoidingView,
    // uma vez que cada plataforma tem um comportamento diferente 
    Platform,
    // pra fazer o modal com as opções de guilds | (tela que sobe qunado clica em "selecione um servidor")
    Modal,
    Alert
} from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
// parte do armazenamento
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  COLLECTION_APPOINTMENTS } from "../../configs/database";

import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
// biblioteca pra gerar id
import uuid  from 'react-native-uuid';
// components
import { Background } from '../../components/Backgound';
import { Header } from '../../components/Header';
import { CategorySelect } from '../../components/CategorySelect';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';

import DiscordSvg from '../../assets/discord.svg';
// *screens (tela que estará no modal)
import { Guilds } from '../Guilds';
// style
import { styles } from './styles';
import { theme } from '../../global/styles/theme';
// tipagem do Guild 
import { GuildProps } from '../../components/Guild';



export function AppointmentCreate(){

    // o que vai estra armazenando as categorias 
    const [category, setCategory] = useState('');

    // estado pra configurar quando o modal erá visível
    const [openGuildsModal, setOpenGuildsModal] = useState(false);

    // pra armazenar a guild selecionada (servidor)
    // dizendo que o tipo de usestate é do guildProps, uma tipagem
    const [guild, setGuild] = useState<GuildProps>({} as GuildProps); // objeto vazio do tipo guildProps

    // estados para armazenar as informações do agendamento
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [description, setDescription] = useState('');

    // pra levar o usuário pra tela de inicio após o agendamento
    const navigation = useNavigation();

    // função pra ABRIR o modal
    function handleOpenGuilds(){
        setOpenGuildsModal(true);
    }
    // função pra FECHAR o modal
    function handleCloseGuilds(){
        setOpenGuildsModal(false);
    }

    // Verificar o numero de dias, meses, horas e minutos
    // último requisito é para identificar qual o input e setar o state correto (não precisando fazer mais 3 funções iguais a essa)
    function numberVerification(min: number, max: number, value: string, type: string ){
        // trasformar string em number
        const number = +value;
        // se não se encaixar nos requisitos vai alertar, se enquadrar então segue normal
        if(number >= min && number <= max){
            if(type === 'typeDay'){
                setDay(value);
            } else if(type === 'typeMonth'){
                setMonth(value);
            } else if(type === 'typeHour'){
                setHour(value);
            } else if(type === 'typeMinute'){
                setMinute(value);
            }
        } else{
            Alert.alert('Número inválido', 'Se não alterar, última data válida será inserida.')
        }
    }

    // função pra detectar oq foi selecionado e salvar o servidor 
    function handleGuildSelect(guildSelected: GuildProps){
        // salva o que foi selecionado
        setGuild(guildSelected);
        // fecha o modal
        setOpenGuildsModal(false);
    }

    // função para ver se está ou nn selecionado e alterar o style em Category
    function handleCategorySelect(categoryId: string){
        // nn vamos dar a opção de tirar a categoria dps de selecionada, so alterar entre as categorias
        setCategory(categoryId);
    }

    // função para salvar os dados do agendamento
    async function handleSave() {
        // criar o objeto com os dados
        const newAppointment = {
            // gera id automático
            id: uuid.v4(),
            guild,
            category,
            // formatando a data para o jeito que queremos
            date: `${day}/${month} às ${hour}:${minute}h`,
            description
        };

        // Pega os agendamentos que já estão salvos
        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        // mudar a forma dos dados obtidos para objeto caso haja algum
        const appointments = storage ? JSON.parse(storage) : [];

        // salvar o conteúdo com o novo appointment
        // chave e oq quer salvar
        await AsyncStorage.setItem(
            COLLECTION_APPOINTMENTS,
            JSON.stringify([...appointments, newAppointment]) // salvando tudo q já tinha antes + o novo appointment criado
        );

        // levar o usuário para a tela home
        navigation.navigate('Home');
    }

    return(
        <KeyboardAvoidingView 
            // comportamento nas diferentes plataformas
            // no iphone: paddind, android: height
            behavior={Platform.OS === 'ios' ?  'padding' : 'height'}
            style={styles.conteiner}
        >
            <Background>
                <ScrollView>
                    
                    <Header
                        title='Agendar Partida'
                    />
                
                    <Text /* como o label vai ser um padrão para os textos
                            vamos adicionar a própria margem aqui */ 
                            style={[styles.label, {marginLeft: 24, marginTop: 36, marginBottom: 18}]}
                    >
                        Categoria
                    </Text>

                    <CategorySelect
                        hasCheckBox
                        setCategory={handleCategorySelect}
                        categorySelected={category}
                    />

                    <View style={styles.form}>
                        <RectButton onPress={handleOpenGuilds}>
                            <View style={styles.select}>

                                { // temporário
                                    // se existir o ícone, mostra ele, se não vai a padrão
                                    guild.icon ? <GuildIcon guildId={guild.id} iconId={guild.icon} /> 
                                    : 
                                    <View style={styles.image}>
                                        <DiscordSvg width={40} height={40} />
                                    </View>
                                    
                                }

                                <View style={styles.selectBody}>
                                    <Text style={styles.label} /* aproveitando um style, já que vai ser igual */>
                                        {guild.name ? guild.name : 'Selecione um servidor' /* se a guild tiver conteúdo, selecionada, vai mostrar ela */}
                                    </Text> 
                                </View>

                                <Feather
                                    name="chevron-right"
                                    color={theme.colors.heading}
                                    size={18}
                                />

                            </View>

                        </RectButton>

                        <View style={styles.field}>
                            <View>
                                <Text style={[styles.label, {marginBottom: 12}]}>
                                    Dia e mês
                                </Text>
                                
                                <View style={styles.column}>
                                    <SmallInput 
                                        maxLength={2}  
                                        // atualizar o estado quando for alterado
                                        onChangeText={(value) => numberVerification(1, 31, value, 'typeDay')}
                                    />
                                    <Text style={styles.divider}>
                                        /
                                    </Text>
                                    <SmallInput 
                                        maxLength={2}  
                                        // atualizar o estado quando for alterado
                                        onChangeText={(value) => numberVerification(1, 12, value, 'typeMonth')}    
                                    />
                                </View>
                            </View>

                            <View>
                                <Text style={[styles.label, {marginBottom: 12}]}>
                                    Hora e minuto
                                </Text>
                                    
                                <View style={styles.column}>
                                    <SmallInput 
                                        maxLength={2}  
                                        // atualizar o estado quando for alterado
                                        onChangeText={(value) => numberVerification(0, 23, value, 'typeHour')}        
                                    />
                                    <Text style={styles.divider}>
                                        :
                                    </Text>
                                    <SmallInput 
                                        maxLength={2} 
                                        // atualizar o estado quando for alterado
                                        onChangeText={(value) => numberVerification(0, 59, value, 'typeMinute')}
                                    />
                                </View>
                            </View>

                        </View>

                        <View style={[styles.field, {marginBottom: 12}] /* aproveitando o style e acrescentando uma margem para ficar mlhr */}>
                            <Text style={styles.label}>
                                Descrição
                            </Text>

                            <Text style={styles.caractereLimit}>
                                Max 100 caracteres
                            </Text>
                        </View>

                        <TextArea
                            // pra ter a prossibilidade de varias linhas
                            multiline
                            maxLength={100}
                            // no máximo 5 quebras de linhas
                            numberOfLines={5}
                            autoCorrect={false} 
                            // atualizar o estado quando for alterado
                            onChangeText={setDescription}
                        />

                        <View style={styles.footer}>
                            <Button 
                                title='Agendar' 
                                onPress={handleSave}
                            />
                        </View>

                    </View>                
                </ScrollView>
            </Background>
            <ModalView
                // so vai abrir com ele true
                visible={openGuildsModal}
                // pra fechar a modal quando o toque nn for nela
                closeModal={handleCloseGuilds}
            >
                <Guilds handleGuildSelected={handleGuildSelect} /* acessar qual foi selecionado *//>
            </ModalView>

        </KeyboardAvoidingView>
    )
}