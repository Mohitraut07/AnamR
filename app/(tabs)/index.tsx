import { Text, View,Image, ScrollView } from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from 'expo-router';

export default function Index() {
    const router = useRouter();
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
        <View className="mb-5 flex-1">
          <SearchBar onPress={() => router.push('/search')} 
            placeholder="Search for movies..."/>
        </View>
        </ScrollView>
    </View>
  );
}
