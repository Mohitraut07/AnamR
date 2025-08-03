import { Text, View,Image, ScrollView, ActivityIndicator, FlatList } from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from 'expo-router';
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";

export default function Index() {
  const router = useRouter();

  const { 
    data: movies, 
    loading: loadingMovies, 
    error: moviesError 
  } = useFetch(() => fetchMovies({ query: '' }));
  return (
    <View
      className="flex-1 bg-primary"
    >
      <Image 
        source={images.bg} className="absolute w-full z-0"/>
        <ScrollView className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            minHeight: '100%',
            paddingBottom: 10,
          }}>
        <Image source={icons.logo} className="w-12 h-10 mx-auto mt-20 mb-5" />
        {loadingMovies ? (
          <ActivityIndicator size={"large"} color="#0000ff" className="mt-10 self-center" />
        ): moviesError ? (
          <Text >
            Error: {moviesError?.message}
          </Text>
        ) : (
            <View className="mb-5 flex-1">
              <SearchBar onPress={() => router.push('/search')} 
              placeholder="Search for movies..."/>
              <>
                <Text className="text-white font-bold mt-5 mb-3 text-lg">
                  Popular Movies
                </Text>
                <FlatList 
                  data={movies}
                  renderItem={({item}) => (
                    <Text className="text-white text-sm">{item.title}</Text>
                  )}
                />
              </>
            </View>
        )}

        </ScrollView>
    </View>
  );
}
