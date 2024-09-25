import { ScrollView, StyleSheet, Text, View ,Image } from 'react-native'
import React from 'react'
import { Link, Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import CustomButton from './components/CustomButton'
import { StatusBar } from 'expo-status-bar'
import {useGlobalContext} from "../context/GlobalProvider";


const index = () => {
  const {isLogedIn,isLoading} = useGlobalContext();
  if(!isLoading && isLogedIn) return <Redirect href={"/home"} />
  return (
    <SafeAreaView className='h-full bg-primary'>
      <ScrollView contentContainerStyle={{height:'100%'}} >
         <View className='h-full w-full items-center justify-center px-4'>
          <Image 
          source={images.logo}
          className='w-[130px] h-[84px]'
          resizeMode='contain'
          />
          <Image 
          source={images.cards}
          className='w-[380px] h-[300px]'
          resizeMode='contain'
          />
          <View className='relative mt-5'>
            <Text className='text-white text-3xl font-bold text-center'>
              Discover Endless Possibilities with {""}
              <Text className='text-secondary-200'>Aora</Text>
            </Text>
            <Image 
            source={images.path}
            className='w-[136px] h-[15px] absolute -bottom-2 -right-8'
            resizeMode='contain'
          />
          </View>
          <Text className='text-sm font-pmedium text-gray-100 mt-7 text-center'>
            Where creativity meets innovations: embark on a journey of limitless exploration with Aora
          </Text>
          <CustomButton
          title='Get Started'
          handlePress={()=>{router.push("/sign-in")}}
          containerStyles={"w-full mt-7"}
          />


         </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({})

