import { icons } from '@/constants/icons';
import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { saveMovieForUser, fetchUserDetails } from '@/services/appwrite';
import { Alert } from 'react-native';

interface MovieInfoProps{
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({label, value}: MovieInfoProps) =>(
  <View className='flex-col items-start justify-center mt-5'>
    <Text className='text-light-200 text-sm font-normal'>
      {label}
    </Text>
    <Text className='text-light-100 font-bold text-sm mt-2'>
      {value ?? 'N/A'}
    </Text>
  </View>
)

const MovieDetails = () => {
  const {id} = useLocalSearchParams();
  const {data: movie, loading} = useFetch(() => fetchMovieDetails(id as string));
  const [isSaved, setIsSaved] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(()=>{
    fetchUserDetails().then(setUser);
  },[]);

  const handleSave = async () => {
    if(user){
      await saveMovieForUser(movie,user.$id);
      setIsSaved(true);
      Alert.alert('Success', 'Movie saved to your list!');
    }
  }
  return (
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{ paddingBottom: 80}}>
        <View>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}}
            className='w-full h-[550px]'
            resizeMode='stretch'
          />
        </View>
        <View className='mt-5 px-5 flex-col items-start justify-center'>
          <Text className='text-white font-bold text-xl'>
            {movie?.title}
          </Text>
          <TouchableOpacity onPress={handleSave} className='absolute top-1 right-5 z-50'>
            <Image
              source={isSaved ? icons.save : icons.bookmark}
              style={{ width: 20, height: 26, padding: 8, borderRadius: 9999}}
              className='rounded-full transition-all duration-200 ease-in-out'
              resizeMode='contain'
            />
          </TouchableOpacity>
          <View className='flex-row items-center gap-x-1 mt-2 '>
            <Text className='text-light-200 text-sm'>{movie?.release_date?.split('-')[0]}</Text>
            <Text className='text-light-200 text-sm'>{movie?.runtime}m</Text>
          </View>
          <View className='flex-row items-center px-2 py-1 mt-2 bg-dark-100 rounded-md gap-x-1 '>
            <Image source={icons.star} className='size-4'></Image>
            <Text className='text-white font-bold text-sm'>{Math.round(movie?.vote_average ?? 0)}/10</Text>
            <Text className='text-light-200 text-sm'>({movie?.vote_count} votes)</Text>
          </View>
          <MovieInfo label='Overview' value={movie?.overview}/>
          <MovieInfo label='Genres' value={movie?.genres.map(g => g.name).join(' - ') || 'N/A'}/>
          <View className='flex flex-row justify-between w-1/2 '>
            <MovieInfo label="Budget" value={`$${movie?.budget/ 1_000_000}M`}/>
            <MovieInfo label="Revenue" value={`$${Math.round(movie?.revenue)/ 1_000_000}M`}/>
          </View>
          <MovieInfo label="Production Companies" value={movie?.production_companies.map(p => p.name).join('-') || 'N/A'}/>
        </View>
      </ScrollView>
      <TouchableOpacity className='absolute bottom-5 left-0 right-0 mx-5 py-3.5 flex-row items-center justify-center bg-accent rounded-lg z-50'
      onPress={() => router.replace('/')}>
        <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180 ' tintColor='#fff'/>
        <Text className='text-white font-bold text-base'>Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MovieDetails;