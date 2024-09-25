import { StyleSheet, Text, TextInput, View, TouchableOpacity,Image, Alert} from 'react-native'
import React, { useState } from 'react'
import {icons} from "../../constants"
import {router, usePathname} from "expo-router"


const SearchInput = ({placeholder,initialSearch}) => {
    const pathName = usePathname();
    const [query,setQuery] = useState(initialSearch || "");
  return (
    
      <View className='bg-black-100 border-2 border-black-200 h-16 w-full px-4 rounded-2xl focus:border-secondary-100 items-center flex-row space-x-4'>
        <TextInput
        className='text-base text-white font-pmedium flex-1 w-full h-full'
        value={query}
        placeholder={placeholder}
        placeholderTextColor={"#CDCDE0"}
        onChangeText={(e)=>setQuery(e)}
        />
        <TouchableOpacity
        onPress={()=>{
          if(!query){
            Alert.alert("Missing Search","Please enter a search query")
          }
          if(pathName.startsWith("/search")) router.setParams({query})
          else router.push(`/search/${query}`);
        }}
        >
            <Image 
            source={icons.search}
            className='w-5 h-5'
            resizeMode='contain'
            />
        </TouchableOpacity>
      </View>
  
  )
}

export default SearchInput

const styles = StyleSheet.create({})