import { Client, Databases,Account, ID, Query } from 'react-native-appwrite';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const SAVED_DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_SAVED_MOVIES_DATABASE_ID!;
const SAVED_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_SAVED_MOVIES_COLLECTION_ID!;

const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || '')
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || '');

const database = new Databases(client);    

export const account = new Account(client);

const router = useRouter();

// Track the searches made by the user
export const updateSearchCount = async (query:string, movie: Movie): Promise<void|never> => {
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
export const userVerification = async(): Promise<boolean|never>=>{
    try {
        const user = await account.get();
        return !!(user && (user.$id ?? user.$id === 0 ? user.$id : true));
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const createUser = async (email: string, password: string, username: string): Promise<any | never> =>{
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
        // Provide a user-friendly error message
        let message = "Login failed. Please try again.";
        if(error?.message){
            // Appwrite errors often have a message property
            message = error.message;
        }else if(typeof error === 'string'){
            message = error;
        }
        // Log for debugging
        console.log(error);
        // Throw with user-friendly message
        throw new Error(message);
    }
}

export const fetchUserDetails = async (): Promise<any|null>=>{
    try {
        const user = await account.get();
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const handleLogout = async (): Promise<void|never> => {
    try {
        await account.deleteSession('current');
        router.replace('/login');
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const saveMovieForUser = async (movie: any, userId: string): Promise<void|never> =>{
    try {
        // Check if this movie is already saved by this user
        const existing = await database.listDocuments(
            SAVED_DATABASE_ID, // Use your main database ID
            SAVED_COLLECTION_ID,
            [
                Query.equal('user_id', userId),
                Query.equal('movie_id',movie.id)
            ]
        );
        if(existing.documents.length > 0){
            // Already saved, do nothing or throw an error if you want
            Alert.alert('Info', 'Movie is already in your saved list.');
        }else{

            // If not already saved, create a new record
            await database.createDocument(
                SAVED_DATABASE_ID,
                SAVED_COLLECTION_ID,
                ID.unique(),
                {
                    user_id: userId,
                    movie_id: movie.id,
                    title: movie.title,
                    poster_url: 'https://image.tmdb.org/t/p/w500' + movie.poster_path,
                    release_date: movie.release_date,
                    // add more fields as needed
                }
            );
        }
    } catch (error) {
        console.log(error);
        throw error;  
    }
}

// Fetch saved movies for the current user
export const fetchSavedMoviesForUser = async (userId: string): Promise<any[] | never> => {
  try {
    const result = await database.listDocuments(
        SAVED_DATABASE_ID,
        SAVED_COLLECTION_ID,
      [Query.equal('user_id', userId)]
    );
    return result.documents;
  } catch (error) {
    console.log(error);
    return [];
  }
};