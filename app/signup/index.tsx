// filepath: /Users/MOHIT/Documents/GitHub/react-native-app-movie/app/signup/index.tsx
import { View, Text } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

const SignupScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-primary">
      {/* The layout now handles the status bar, but this provides a good fallback */}
      <StatusBar hidden />
      <Text className="text-white text-2xl">SignUP</Text>
    </View>
  );
};

export default SignupScreen;