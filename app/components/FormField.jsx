import { StyleSheet, Text, TextInput, View, TouchableOpacity,Image} from 'react-native'
import React, { useState } from 'react'
import {icons} from "../../constants"


const FormField = ({title,value,handleChangeText,placeholder,otherStyle, ...props}) => {
    const [showPassword,setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyle}`}>
      <Text className='text-base font-pmedium text-gray-100'>{title}</Text>
      <View className='bg-black-100 border-2 border-black-200 h-16 w-full px-4 rounded-2xl focus:border-secondary-100 items-center flex-row'>
        <TextInput
        className='text-base text-white font-psemibold flex-1 w-full h-full'
        value={value}
        placeholder={placeholder}
        placeholderTextColor={"#7b7b8b"}
        onChangeText={handleChangeText}
        secureTextEntry={title==="Password" && !showPassword}
        />
        {title==="Password" && 
        <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
            <Image source={!showPassword?icons.eye:icons.eyeHide} className='w-6 h-6' resizeMode='contain'/>
        </TouchableOpacity>}
      </View>
    </View>
  )
}

export default FormField

const styles = StyleSheet.create({})