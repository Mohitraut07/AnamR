// filepath: /Users/MOHIT/Documents/GitHub/react-native-app-movie/app/signup/index.tsx
import React,{useState} from 'react';
import { View, TextInput, Text, ScrollView, Alert, Button, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter,  } from 'expo-router';
import { createUser } from '@/services/appwrite';
import { icons } from '@/constants/icons';

const SignupScreen = () => {
  const [form,setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const submit = async() =>{
    if(!form.username || !form.email || !form.password){
      Alert.alert('Error','Please fill in all fields');
      return;
    }
    setIsSubmitting(true);
    try{
      await createUser(form.email, form.password, form.username);
      // Optionally, you can add user data to a global context here
      Alert.alert('Success','User created successfully!');
      router.replace('/(tabs)'); // Navigate to home screen after successful signup
    }catch(error: any){
      Alert.alert('Error',error.message);
    }finally{
      setIsSubmitting(false);
    }
  }

  return (
    // Use the primary color for the background
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[90vh] px-6 my-6">
          {/* App Logo */}
          <Image
            source={icons.logo}
            resizeMode="contain"
            style={{ width: 130, height: 45 }}
            className='justify-center'
          />

          <Text className="text-2xl text-white font-semibold mt-10">
            Sign Up
          </Text>

          {/* Username Input */}
          <View className="mt-7 space-y-2">
            <Text className="text-base text-light-200 font-medium">Username</Text>
            <View className="w-full h-16 px-4 bg-dark-100 rounded-2xl border-dark-200 focus:border-accent flex-row items-center">
              <TextInput
                className="flex-1 text-white font-semibold text-base "
                value={form.username}
                placeholder="Your unique username"
                placeholderTextColor="#9CA4AB" // Corresponds to light-300
                onChangeText={(e) => setForm({ ...form, username: e })}
              />
            </View>
          </View>

          {/* Email Input */}
          <View className="mt-7 space-y-2">
            <Text className="text-base text-light-200 font-medium">Email</Text>
            <View className="w-full h-16 px-4 bg-dark-100 rounded-2xl border-2 border-dark-200 focus:border-accent flex-row items-center">
              <TextInput
                className="flex-1 text-white font-semibold text-base"
                value={form.email}
                placeholder="Your email address"
                placeholderTextColor="#9CA4AB"
                onChangeText={(e) => setForm({ ...form, email: e })}
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Password Input */}
          <View className="mt-7 space-y-2">
            <Text className="text-base text-light-200 font-medium">Password</Text>
            <View className="w-full h-16 px-4 bg-dark-100 rounded-2xl border-2 border-dark-200 focus:border-accent flex-row items-center">
              <TextInput
                className="flex-1 text-white font-semibold text-base"
                value={form.password}
                placeholder="Your password"
                placeholderTextColor="#9CA4AB"
                onChangeText={(e) => setForm({ ...form, password: e })}
                secureTextEntry
              />
            </View>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={submit}
            activeOpacity={0.7}
            className={`bg-accent rounded-xl min-h-[62px] justify-center items-center mt-7 ${isSubmitting ? 'opacity-50' : ''}`}
            disabled={isSubmitting}
          >
            <Text className="text-primary font-semibold text-lg">
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          {/* Link to Sign In */}
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-light-200">
              Have an account already?
            </Text>
            <Link href="../sign-in" className="text-lg font-semibold text-accent">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#030014" style="light" />
    </SafeAreaView>
  );
};

export default SignupScreen;