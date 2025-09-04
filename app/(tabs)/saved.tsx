import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons } from '@/constants/icons'
import { fetchSavedMoviesForUser, fetchUserDetails } from '@/services/appwrite'
import { useRouter } from 'expo-router'

const Saved = () => {
  const [savedMovies, setSavedMovies] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const userDetails = await fetchUserDetails();
      setUser(userDetails);
      if (userDetails) {
        const movies = await fetchSavedMoviesForUser(userDetails.$id);
        setSavedMovies(movies);
      }
    };
    load();
  }, []);

  if (!user) {
    return (
      <View className='flex-1 bg-primary justify-center items-center'>
        <Text className="text-white">Please log in to see your saved movies.</Text>
      </View>
    );
  }

  return (
    <View className='flex-1 bg-primary px-4'>
      <Text className="text-2xl text-white font-bold mb-4 mt-10">Your Saved Movies</Text>
      <ScrollView className='flex-1 mt-4'>
        {savedMovies.length === 0 ? (
          <Text className="text-light-200">No saved movies yet.</Text>
        ) : (
          savedMovies.map(movie => (
            <TouchableOpacity key={movie.$id} onPress={() => router.push(`/movies/${movie.movie_id}`)}>
              <View className="flex-row items-center mb-4 bg-dark-100 rounded-xl p-3">
                <Image source={{ uri: movie.poster_url }} style={{ width: 60, height: 90, borderRadius: 8 }} />
                <Text className="text-white ml-4 text-lg font-semibold">{movie.title}</Text>
              </View>
            </TouchableOpacity> 
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Saved;