import { View, Text, ImageBackground, Image, ActivityIndicator, StatusBar } from 'react-native'
import React,{useEffect, useState} from 'react'
import { Tabs, useRouter } from 'expo-router'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import { userVerification } from '@/services/appwrite'
import Signup from '@/app/signup'

const TabIcon = ({ focused, icon, title }:any) => {
    if(focused){
        return (
            <>
                <ImageBackground
                    source={images.highlight}
                    className='flex flex-1 w-full flex-row min-w-[112px] min-h-16 justify-center items-center rounded-full mt-4 overflow-hidden'
                >
                    <Image
                        source={icon}
                        tintColor="#151312"
                        className='size-5'
                    />
                    <Text className='text-secondary text-base font-semibold ml-2'>{title}</Text>
                </ImageBackground>
            </>
        )}
    return (
        <View className='size-full justify-center items-center mt-4 rounded-full '>
            <Image
                source={icon}
                tintColor="#A8B5DB"
                className='size-5'
            />
        </View>
    )
}

const _Layout = () => {
    const [verified, setVerified] = useState<boolean | null>(null);
    const router = useRouter();

     useEffect(()=>{
         let mounted = true;
         (async () => {
          const isVerified = await userVerification();
            if(!mounted) return;
            setVerified(isVerified);
            try {
                const isVerified = await userVerification();
                if(!mounted) return;
                setVerified(isVerified);
            } catch (err) {
                // treat errors as unauthenticated and navigate to signup
                console.warn('userVerification failed', err);
                if(!mounted) return;
                setVerified(false);
            }
         })();
         return () => {
             mounted = false;
         }
     },[]);
 
    // redirect to signup when we know user is NOT verified
    useEffect(() => {
      if (verified === false) {
        // replace so user can't go back to the app without signing in
        router.replace('/signup');
      }
    }, [verified, router]);

     // while checking, show a full-screen loader (prevents UI flash)
     if(verified === null){
         return(
             <View className='flex-1 bg-primary items-center justify-center'>
                 <ActivityIndicator size='large' color="#fff"/>
             </View>
         );
     }
 
    // not signed in -> show Signup screen (no Tabs)
    if(!verified){
        return( 
        <>
        <Signup />
        </>
    );
    }
    // if user is not verified we already navigate to /signup above.
    // keep returning null here to avoid rendering the app UI while router replaces.
    if(!verified){
        return null;
    }     

        return (
            <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle:{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarStyle:{
                    backgroundColor: '#0f0D23',
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 36,
                    height: 52,
                    position: 'absolute',
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: '#0f0D23',
                }
            }}>
        <Tabs.Screen
            name="index"
            options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon  
                    focused={focused} 
                    icon={icons.home}
                    title="Home"/>
                )
            }}
            />
        <Tabs.Screen
            name="search"
            options={{
                title: 'Search',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon  
                    focused={focused} 
                    icon={icons.search}
                    title="Search"/>
                )
            }}
            />
        <Tabs.Screen
            name="saved"
            options={{
                title: 'Saved',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon  
                    focused={focused} 
                    icon={icons.save}
                    title="Saved"/>
                )
            }}
            />
        <Tabs.Screen
            name="profile"
            options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon  
                    focused={focused} 
                    icon={icons.person}
                    title="Profile"/>
                )
            }}
            />
    </Tabs>
  )
}

export default _Layout;