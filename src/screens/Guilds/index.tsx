import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native"; 
import { styles } from "./styles";

import { Guild, GuildProps } from "../../components/Guild";
import { ListDivider } from "../../components/ListDivider";
import { Load } from "../../components/Load";

import { api } from "../../services/api";

// fazer a tipagem pra receber uma função
type Props = {
    // tem por parâmetro a guild que está tipada em guildProps
    handleGuildSelected: (guild: GuildProps) => void;
}

export function Guilds({handleGuildSelected} : Props){

    // estado para usar na requisição dos servidores pela api
    // começa com um conjunto vazio no formato de GuildProps
    const [guilds, setGuilds] = useState<GuildProps[]>([]);
    // componente de loading pra aparecer enquanto carrega os servidores da api
    const [loading, setLoading] = useState(true);

    // buscar as guilds
    async function fetchGuilds() {
        // a resposta do que a api pegar
        const response = await api.get('/users/@me/guilds');
        // armazenar o conteúdo no estado
        setGuilds(response.data);

        // tira o loading
        setLoading(false);

    }

    // chamar a função pra pegar os servidores antes de td
    useEffect(() => {
        fetchGuilds();
    }, []);

    return(
        <View style={styles.conteiner}> 
            {   
                // so quando nn estiver carregando que passa a FlatList
                loading ? <Load />
                :
                <FlatList
                    data={guilds}
                    // pega o id e transforma na key
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <Guild 
                            data={item} 
                            onPress={() => handleGuildSelected(item)}    
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    // ta passando a guild selecionada pra a função handleGuildSelected
                    ItemSeparatorComponent={() => <ListDivider isCentered />} // indica que ele vai ser centralizado, lá na tipagem
                    // pra a gnt deixar o traço no objeto de cima da lista
                    ListHeaderComponent={() => <ListDivider isCentered />} // indica que ele vai ser centralizado, lá na tipagem
                    style={styles.guilds}
                    // para colocar um style interno na lista
                    // com isso temos um "respiro" no ultimo item da lista, 
                    // paddingTop vai fazer com que tenha um espaço em cima e ao rolar a lista ele và se preenchendo, melhorando a visualização
                    contentContainerStyle={{paddingBottom: 68, paddingTop: 103}}
                />
            }
        </View>
    )
}