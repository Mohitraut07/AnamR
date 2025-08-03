import { useEffect, useState } from 'react';
/**
 * Custom hook to fetch data using a provided fetch function.
 * 
 * @param fetchFunction - A function that returns a promise resolving to the data.
 * @param autoFetch - Whether to automatically fetch data on mount.
 * @returns An object containing the fetched data, loading state, error state, and functions to refetch or reset the state.
 */
const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch=true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await fetchFunction();
            setData(result);

        } catch (error) {
            setError(error instanceof Error ? error : new Error('An unexpected error occurred.'));
        }finally {

        }

        const reset = () => {
            setData(null);
            setLoading(false);
            setError(null);
        };

        useEffect(() => {
            if (autoFetch){
                fetchData();
            }
            // return () => {
            //     reset();
            // }        
        },[]);

        return {data, loading, error, refetch: fetchData, reset};
    }
}

export default useFetch;