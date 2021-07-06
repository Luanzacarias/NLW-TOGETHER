// pra fazer uma parte do armazenamento de informações com o AsyncStorage

// nome do banco
const DATABASE_NAME = '@gameplay';

// @app:collection
// uma coleção de dados
const COLLECTION_USERS = `${DATABASE_NAME}:user`;
const COLLECTION_APPOINTMENTS = `${DATABASE_NAME}:appointments`;

export {
    COLLECTION_APPOINTMENTS,
    COLLECTION_USERS
}