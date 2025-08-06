import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'

import { fetchMovies } from '@/services/api'
import useFetch from '@/services/useFetch'

import { icons } from '@/constants/icons'
import { images } from '@/constants/images'

import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { updateSearchCount } from '@/services/appwrite'


const search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    data: movies,
    loading,
    error,
    refetch: refetchMovies,
    reset
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

    useEffect(() => {
      const timeoutID = setTimeout(async () => {
        if (searchQuery.trim()) {
          await refetchMovies();
        } else {
          reset();
        }
      }, 500);
      return () => clearTimeout(timeoutID);
    },[searchQuery])

    useEffect(() => {
      if( movies?.length > 0 && movies?.[0]) {
        updateSearchCount(searchQuery,movies[0]);
      }
    },[movies]);
  return (
    <View className='flex-1 bg-primary'>
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
        />
        <FlatList
          data={movies}
          renderItem={({item}) => <MovieCard {...item}/>}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: 'center',
            gap: 16,
            marginVertical: 16,
          }}
          contentContainerStyle={{
            paddingBottom:100,
          }}
          className='px-5'
          ListHeaderComponent={
            <>
            <View className='w-full flex-row justify-center items-center mt-20 '>
              <Image source={icons.logo} className='w-12 h-10'/>
            </View>
            <View className='py-5'>
              <SearchBar
              placeholder='Search for movies...'
              value={searchQuery}
              onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            { loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="mt-10 self-center"
            />)}
            {error && (
              <Text className='text-red px-5 my-3'>
                Error: {error?.message}
              </Text>
            )}
            { !loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className='text-white text-xl font-bold'>
                Search results for{' '}
                <Text className='text-accent'>{searchQuery}</Text>
              </Text>
            )}
            </>
          }
          ListEmptyComponent={
            !loading && !error ? (
              <View className='mt-10 px-5'>
                <Text className='text-gray-500 text-center'>
                  {searchQuery.trim() ? `No results found.`: 'Search for a movie to see results.'}
                </Text>
              </View>
            ): null
          }/>
    </View>
  )
}

export default search