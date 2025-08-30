import { View, Text, Image, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons } from '@/constants/icons'
import { fetchUserDetails, handleLogout } from '@/services/appwrite'
import { Link } from 'expo-router'

const Profile = () => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const getUserDetails = async () => {
      const userDetails = await fetchUserDetails();
      setUser(userDetails);
    }
    getUserDetails();
  }, []);

  return (
    <View className="flex-1 bg-primary px-6 py-10">
      {/* Profile Card */}
      <View className="bg-dark-100 rounded-3xl shadow-lg p-6 items-center">
        <View className="w-full h-2 bg-accent rounded-full mb-6" />
        <Image
          source={icons.person}
          className="size-24 mb-4"
          tintColor="#fff"
        />
        <Text className="text-xl text-white font-bold mb-1">
          {user?.name || 'Your Name'}
        </Text>
        <Text className="text-base text-accent font-semibold mb-4">
          {user?.email || 'your@email.com'}
        </Text>
        <Text className="text-light-200 text-center">
          Welcome to your profile page!
        </Text>
      </View>

      {/* Info Section */}
      <View className="mt-10 bg-dark-200 rounded-2xl p-5">
        <Text className="text-lg text-accent font-semibold mb-2">Account Details</Text>
        <View className="flex-row items-center mb-2">
          <Text className="text-light-200 font-medium w-20">Name:</Text>
          <Text className="text-white font-semibold">{user?.name || 'N/A'}</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-light-200 font-medium w-20">Email:</Text>
          <Text className="text-white font-semibold">{user?.email || 'N/A'}</Text>
        </View>
      </View>

      {/* Logout Button */}
      <View className="mt-52 bg-accent rounded-2xl p-5 content-center items-center">
        <Link href="/login" onPress={handleLogout} className="text-white font-semibold">
          Logout
        </Link>
      </View>
    </View>
  )
}

export default Profile