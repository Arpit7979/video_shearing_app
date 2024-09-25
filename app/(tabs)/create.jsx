import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View,Image, Alert } from 'react-native'
import React, { useState } from 'react'
import FormField from "../components/FormField"
import CustomButton from "../components/CustomButton"
import {Video,ResizeMode} from "expo-av"
import { icons } from '../../constants'
import * as DocumentPicker from "expo-document-picker";
import {router} from "expo-router"
import {createVideo} from "../../lib/appwrite"
import {useGlobalContext} from "../../context/GlobalProvider"
import * as ImagePicker from 'expo-image-picker';

const Create = () => {
  const {user} = useGlobalContext();
  const [uploading,setUploading] = useState(false);
  const [form,setForm] = useState({
    title:"",
    thumbnail:null,
    video:null,
    prompt:"",
  })

  const submit = async()=>{
    if(!form.title || !form.thumbnail || !form.video || !form.prompt){
      Alert.alert("Error","All fields are required");
    }
    setUploading(true);
    
    try {
      await createVideo({...form,userId:user.$id});
      Alert.alert("Success","Post uploaded Successfully");
      router.push("/home")
    } catch (error) {
      Alert.alert("Error",error.message);
    }finally{
      setForm({
        title:"",
        thumbnail:null,
        video:null,
        prompt:"",
      })
      setUploading(false)
    }
  } 

  const openPicker = async(selectType)=>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType==="image"? ImagePicker.MediaTypeOptions.Images:ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if(!result.canceled){
      if(selectType==="image"){
        setForm({...form,thumbnail:result.assets[0]})
      }
      if(selectType==="video"){
        setForm({...form,video:result.assets[0]})
      }
    }else{
      setTimeout(()=>{
        Alert.alert("Error","No file selected")
      },100)
    }
  }



  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView className="px-4 ">
        <View className="pt-10 pb-5">
        <Text className="text-white text-2xl font-psemibold ">
          Upload Video
        </Text>
        <FormField 
          title={"Video Title"}
          value={form.title}
          placeholder={"Give your video a catchy title"}
          handleChangeText={(e)=>setForm({...form,title:e})}
          otherStyle="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-psemibold">
            Upload Video
          </Text>
          <TouchableOpacity onPress={()=>openPicker("video")}>
            {form.video?(
              <Video
                source={{uri:form.video.uri}}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
                
              />
            ):(
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image source={icons.upload}
                    resizeMode='contain'
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
            <Text className="text-base font-psemibold text-gray-100">
              Thumbnail Image
            </Text>
            <TouchableOpacity onPress={()=>openPicker("image")}>
            {form.thumbnail?(
              <Image
                source={{uri:form.thumbnail.uri}}
                resizeMode='cover'
                className="w-full h-64 rounded-2xl"
              />
            ):(
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
               
                  <Image source={icons.upload}
                    resizeMode='contain'
                    className="w-5 h-5"
                  />
                  <Text className="text-gray-100 text-sm font-pmedium">
                    Choose a file
                  </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField 
          title={"AI Prompt"}
          value={form.prompt}
          placeholder={"The prompt you used to create this video"}
          handleChangeText={(e)=>setForm({...form,prompt:e})}
          otherStyle="mt-7"
        />
        <CustomButton
          title={"Submit and publish"}
          handlePress={submit}
          containerStyles={"mt-7"}
          isLoading={uploading}
        />
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create

const styles = StyleSheet.create({})