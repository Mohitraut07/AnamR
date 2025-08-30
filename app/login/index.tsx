import { icons } from '@/constants/icons';
import { userLogin } from '@/services/appwrite';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {account} from '@/services/appwrite';

const LoginScreen = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting]= useState(false);
  const router = useRouter();

  const submit = async() =>{
    if(!form.email || !form.password){
      Alert.alert('Error','Please fill in all fields');
      return;
    }
    setIsSubmitting(true);
    try{
      try {
          // Log out any existing session
          await account.deleteSession('current');
      } catch (error) {
          // Ignore errors if no session exists
          console.log(error);
      }
      // Call your login API here
      const user = await userLogin(form.email, form.password);
      if(user){
        Alert.alert('Success','Logged in successfully!');
        router.replace('/(tabs)'); // Navigate to home screen after successful login
      }
    }catch(error: any){
      Alert.alert('Error',error.message || 'Login failed. Please try again.');
    }finally{
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[90vh] px-6 my-6'>
        <Image
          source={icons.logo}
          resizeMode='contain'
          style={{ width: 130, height: 45}}
          className='justify-center'
          />
          <Text className='text-2xl text-white font-semibold mt-10'> Log In</Text>
        {/* User Credentials */}
        {/* Email Input */}
        <View className='mt-7 space-y-2'>
          <Text className='text-base text-light-200 font-medium'>Email</Text>
          <View className='w-full h-16 px-4 bg-dark-100 rounded-2xl border-2 border-dark-200 focus:border-accent flex-row items-center'>
          <TextInput
            className='flex-1 text-white font-semibold text-base'
            value={form.email}
            placeholder='Your email address'
            placeholderTextColor="#9CA4AB"
            onChangeText={(e) => setForm({...form, email:e})}
            keyboardType='email-address'/>
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
                  {/* Login Button */}
                  <TouchableOpacity
                  onPress={submit}
                  activeOpacity={0.7}
                  className={`bg-accent rounded-xl min-h-[62px] justify-center items-center mt-7 `}
                  disabled={isSubmitting}
                  >
                    <Text className='text-primary font-semibold text-lg'>
                      {isSubmitting ? 'Logging in...' : 'Log In'}
                    </Text>
                  </TouchableOpacity>

                  {/* Link to Sign Up */}
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-light-200">
              Don't have an account?
            </Text>
            <Link href="../signup" className="text-lg font-semibold text-accent">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
      {/* <StatusBar backgroundColor="#030014" style="light" /> */}
    </SafeAreaView>
  );
};

export default LoginScreen;