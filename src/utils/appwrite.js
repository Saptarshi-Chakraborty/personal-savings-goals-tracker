import { Account, Avatars, Client, Databases, ID, Permission, Query, Role } from 'appwrite';

const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const goalCollectionId = process.env.NEXT_PUBLIC_GOALS_COLLECTION_ID;
const transactionCollectionId = process.env.NEXT_PUBLIC_TRANSACTIONS_COLLECTION_ID;

const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectId);

const account = new Account(client);
const database = new Databases(client);

const avatars = new Avatars(client);

export {
    client, account, database, avatars,
    databaseId, goalCollectionId, transactionCollectionId,
    ID, Permission, Query, Role, // Appwrite SDK classes
};