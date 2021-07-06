import React from "react";
// scrollView adiciona o elemento de rolagem na rela
import { ScrollView } from "react-native";

import { styles } from './styles';
import { categories } from "../../utils/categories";
import { Category } from "../Category";

type Props = {
    categorySelected: string;
    setCategory: (categoryId: string) => void;
    hasCheckBox?: boolean;
}

export function CategorySelect({
    categorySelected, 
    setCategory,
    // indica q vai ter checkBox no category
    hasCheckBox = false
}: Props){

    return(
        <ScrollView 
            horizontal
            style={styles.conteiner}
            // retirar a bara de rolagem vizual
            showsHorizontalScrollIndicator={false}
            // style especificamente dentro da lista
            // para ter um espaçamento assim que acabar a lista, para ficar igual ao espaçamento padrão
            contentContainerStyle={{paddingRight: 40}}
        >
            {
                // renderizando cada uma das categorias feitas
                categories.map(category => (
                    <Category
                    // é importante ter uma chave quando for listas
                        key={category.id}
                        title={category.title}
                        icon={category.icon}
                        checked={category.id === categorySelected}
                        // quando pressionado vai mostrar qual é o id do que está sendo tocado para q ocorra a mudança de style
                        onPress={() => setCategory(category.id)}
                        // se for so hasCheckBox ele seria definido como true pra td, assim ele pega o valor colocado
                        hasCheckBox={hasCheckBox}
                    />
                ))
            }
        </ScrollView>
    )
}