import { Client, Databases,Account, ID, Query } from 'react-native-appwrite';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || '')
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || '');

const database = new Databases(client);    

export const account = new Account(client);

// Track the searches made by the user
export const updateSearchCount = async (query:string, movie: Movie)=> {
try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID,[
            Query.equal('searchTerm', query)
        ])
    
        if(result.documents.length > 0){
            const existingMovie = result.documents[0];
            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1,
                }
            )
        }else{
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    searchTerm: query,
                    movie_id: movie.id,
                    count: 1,
                    poster_url: 'https://image.tmdb.org/t/p/w500' + movie.poster_path,
                    title: movie.title,
                }
            )
        }
} catch (error) {
    console.log(error);
    throw error;
    
}
    
}

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> =>{
    try {
            const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID,[
            Query.limit(5),
            Query.orderDesc('count'),
        ])
        return result.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

// Returns true if the user session/ account exists, false otherwise.
export const userVerification = async(): Promise<boolean>=>{
    try {
        const user = await account.get();
        return !!(user && (user.$id ?? user.$id === 0 ? user.$id : true));
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const createUser = async (email: string, password: string, username: string) =>{
    try {
        const newAccount = await account.create(ID.unique(), // Let Appwrite generate a unique user ID
        email, password, username);
        if(!newAccount) throw new Error('Account creation failed!')
        
        // Automatically log in the user after account 
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error:any) {
        console.log(error);
        // Re-throw the error with a user-friendly message
        throw new Error(error.message || "Failed to create account. Please try again.")
        
        
    }
}

export const userLogin = async(email: string, password: string): Promise<any | null> =>{
    try{
        const promise = await account.createEmailPasswordSession(email, password);
        if(!promise) throw new Error('Login failed!');
        return promise;
    }catch(error: any){
        console.log(error);
        throw new Error(error.message || "Login failed. Please try again.")
    }
}