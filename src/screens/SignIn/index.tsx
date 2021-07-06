import React from 'react'; 
import { 
    View, 
    Text, 
    Image, 
    Alert,
    ActivityIndicator
} from 'react-native';

// contexto
import { useAuth } from '../../hooks/auth';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
// imagem padrão
import IllustrationImg from '../../assets/illustration.png';
// componente ButtonIcon (Botão com o Icon do discord)
import { ButtonIcon } from '../../components/ButtonIcon';

import { Background } from '../../components/Backgound'



export function SignIn(){

    // usando nosso próprio hook
    // função de signIn
    // loading vai ser pra indicar o loading
    const { loading, signIn } = useAuth();
    
    // quando o usuário chamar essa função, leva ele até a tela pra fazer a autenticação
    async function handleSingIn(){
        try {
            await signIn();
        } catch (error) {
            // se acontecer alguma coisa de errada, ele mostra o erro
            Alert.alert(error)
        }
    }

  return (
    <Background>
        <View style={styles.conteiner}>

            <Image 
                source={IllustrationImg} 
                style={styles.image} 
                resizeMode="stretch"
            />

            <View style={styles.content}>

                <Text style={styles.title}>
                    Conecte-se {'\n'}
                    e organize suas {'\n'}
                    jogatinas {'\n'}
                </Text>

                <Text style={styles.subtitle}>
                    Crie grupos para jogar seus games {'\n'}
                    favoritos com seus amigos
                </Text>

                {   // se tiver carregando os dados, então vai mostrar algo sibolizando, se não vai mostrar o botão
                    loading ? <ActivityIndicator color={theme.colors.primary} /> 
                    :
                    <ButtonIcon 
                        title="Entrar com Discord"
                        // chama a função de navegação
                        onPress={handleSingIn}
                    />
                }

            </View>
            
        </View>
    </Background>
  );
}