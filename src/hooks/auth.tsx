// vai ser pra fazer o contexto, a "central" com os conteúdos necessários
// vamos indicar as telas que tem acesso ao contexto em App.tsx
import React, 
{ 
    createContext,
    useContext,
    useState,
    ReactNode, 
    useEffect
} from 'react';

// Para autenticação do user com o discord, tem no Notion explicando como o OAuth2 funciona
import * as AuthSession from 'expo-auth-session';
// importar a parte de fazer o armazenamento local
import AsyncStorage from '@react-native-async-storage/async-storage';

// nosso conteúdos para formar a URL centralizado em um só lugar, no .env
const { SCOPE } = process.env;
const { CLIENT_ID } = process.env;
const { CDN_IMAGE } = process.env;
const { REDIRECT_URI } = process.env;
const { RESPONSE_TYPE } = process.env;

// tbm para a URL
import { api } from '../services/api';
// referencias já criadas para o nosso armazenamento
import { COLLECTION_USERS } from '../configs/database';

// tipagem para as informações do usuário
type User = {
    id: string;
    username: string;
    /* como o discord nn envia o  primeiro nome, 
    se o user name for grande nos podemos pegar ele e quebrar o array
    pegando a primeira parte, sendo assim o first name */
    fistName: string;
    avatar: string;
    email: string;
    // tp um chave que recebemos da própria API
    token: string;
}

// tipagem do nosso estado
type AuthContextData = {
    user: User;
    // pra ter a opção de informar se já carregou ou não
    loading: boolean;
    // informando um função singIn qu etem um retorno Promise(já que pode demorar um pouco pra processar) do tipo void, q nn percisa retornar nada
    signIn: () => Promise<void>;
    // função de sair de logado
    signOut: () => Promise<void>;
}

// tipando o children
type AuthProviderProps = {
    children: ReactNode;
}

// tipagem para organizar e pegar so o que quer da autenticação
// o AuthSession já é um tipagem padrão para esses dados e a gnt soma com o nosso parâmetro
type AuthorizationResponse = AuthSession.AuthSessionResult & {
    params: {
        // o token vai ser opicional, uma vez que se o user cancelar a autenticação nn recebemos o token
        access_token: string;
        // para saber se teve algum erro disparado (tipo cancelar a autenticação)
        error?: string;
    }
}

// nosso contexto começa sendo um objeto vazio
export const AuthContext = createContext({} as AuthContextData ); // o tipo dele é umm AuthContextData

// função que vamos definir dinâmicamente quem tem acesso ao contexto
// podemos acessar o "filho"
function AuthProvider({ children } : AuthProviderProps) {

    // o estado do usuário
    const [user, setUser] = useState<User>({} as User); // tipando ele com o formato User, ele começa com objeto vazio do msm formato

    // estado pra saber se o processo de autenticação acabou
    const [loading, setLoading] = useState(false);

    // Criando a função aqui pra poder ser usada em outra interface
    // função assíncrona 
    async function signIn() {
        // usar o try/catch pq pode ser que role alguma exceção, ent precisa ter cuidado
        try {
            // indicar que a autenticação começou
            setLoading(true);

            // authUrl indica pra onde o user tem que ir quando começar o processo de autenticação
            // usando crase 
            // api.defaults.baseURL onde tem nossa base da URL
            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            // authUrl indica pra onde o user tem que ir quando começar o processo de autenticação 
            // a gnt vai pegar somente os dados que nos interessa da resposta
            // tendo uma tipagem tipo AuthorizationResponse
            const { type, params } = await AuthSession.startAsync({ authUrl })  as AuthorizationResponse;

            // Verificação do tipo da ação (se foi concluida ou não a ação)
            // se for verdadeiro e não tiver um erro
            if(type === "success" && !params.error) {
                // a partir de agora as requisições serão feitas com a utilização do token
                api.defaults.headers.authorization = `Bearer ${params.access_token}`; // Bearer é o tipo do token
                // Vamos fazer a requisição dos dados do user 
                const userInfo = await api.get('/users/@me'); // precisa passa o que vem antes pq no na definição da api já tem a baseURL
                
                // como o nome está todo em username, nn é só o primeiro nome, então vamor fazer uma separação pra pegar só o primeiro nome
                // o array contem as palavras sepadas por espaço
                const fistName = userInfo.data.username.split(' ')[0];

                // Vamos pegar a imagem
                // como o discord só disponibiliza o código da foto no cdn deles, vamos buscar lá
                // já estamos atualizando direto no objeto q pegamos
                userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`; // essas formas de url tem no discord developer
                
                // dados do usuário que foram pegos
                const userData = {
                    ...userInfo.data,
                    fistName,
                    token: params.access_token
                }

                // antes de salvar os cados no estado, vamos salvar no próprio dispositivo
                // nome da chave e valor(objeto em string) que vai armazenar
                await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData));

                // pegando todos os dados necessários que queremos
                setUser( userData );
            }
        } catch {
            // se acontecer um erro, ele vai soltar a mesndagem de erro padrão nossa
            // "throw" lança o erro pra que chamou
            throw new Error('Não foi possível autenticar');
        } finally {
            // independente de dar certo ou errado
            setLoading(false);
        }
    }

    // função para sair(logOut) do app
    async function signOut() {
        // tira o user que estava salvo
        setUser({} as User);
        // retira os dados salvos com o parâmetro
        await AsyncStorage.removeItem(COLLECTION_USERS);

    }

    // função pra fazer o carregamento dos dados
    async function loadUserStorageData() {
        // buscar os dados
        const storage = await AsyncStorage.getItem(COLLECTION_USERS);

        // verificação se há algo salvo nele
        if(storage){
            // se houver, vamos transformar o dados salvos em formato string para um em forma de objeto
            // tipando o objeto no formato User
            const userLogged = JSON.parse(storage) as User;

            // vamos inserir o token(que foi pego no armazenamento) nas requisições
            api.defaults.headers.authorization = `Bearer ${userLogged.token}`; // Bearer é o tipo do token

            // definimos o estado com esses dados
            setUser(userLogged);
        }

    }

    // Antes de tudo ser feito, chama a função pra pegar os dados armazenados
    useEffect(() => {
        loadUserStorageData();
    }, [])

    return(
        <AuthContext.Provider value={{
            user,
            loading,
            signIn,
            signOut
        }} >
            {children}
        </AuthContext.Provider>
    )
}

// criando nosso próprio Hook
function useAuth() {
    // nosso contexto
    const context = useContext(AuthContext);

    return context;
}

// VAMOS EXPORTAR AS FUNÇÕES QUE CRIAMOS DE UMA SÓ VEZ
export { AuthProvider, useAuth}