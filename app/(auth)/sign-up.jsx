import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from "../../constants"
import FormField from '../components/FormField'
import CustomButton from '../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

const SignUp = () => {
  const [form,setForm] = useState({username:"",email:"",password:""})
  const [isSubbmitting,setIsSubbmitting] = useState(false);

  const {setUser,setIsLogedIn} = useGlobalContext();

  const submit = async() => {
    if(!form.username || !form.email || !form.password){
      Alert.alert("Error","All fields are required");
    }
    setIsSubbmitting(true);
    
    try {
      const result = await createUser(form.email,form.password,form.username);
      setUser(result);
      setIsLogedIn(true);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error",error.message);
    } finally{
      setIsSubbmitting(false);
    }
  }


  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full h-full justify-center px-4 my-6'>
          <Image 
           source={images.logo}
           resizeMode='contain'
           className='w-[115px] h-[35px]'
          />
          <Text className='text-white text-2xl text-semibold font-psemibold mt-10'>
            Login to Aora
          </Text>
          <FormField
           title={"Username"}
           value={form.username}
           handleChangeText={(e)=>setForm({...form,username:e})}
           otherStyle="mt-10"
          />
          <FormField
           title={"Email"}
           value={form.email}
           handleChangeText={(e)=>setForm({...form,email:e})}
           otherStyle="mt-7"
           keybordType="email-address"
          />
          <FormField
           title={"Password"}
           value={form.password}
           handleChangeText={(e)=>setForm({...form,password:e})}
           otherStyle="mt-7"
          />
          <CustomButton
          title={"Sign Up"}
          containerStyles={"mt-7"}
          handlePress={submit}
          isLoading={isSubbmitting}
          />
          <View className='justify-center flex-row gap-2 pt-5'>
            <Text className='text-lg text-green-100 font-pmedium'>
              Have an account?
            </Text>
            <Link href={"/sign-in"} className='text-lg text-secondary-100 font-psemibold'>Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp

const styles = StyleSheet.create({})