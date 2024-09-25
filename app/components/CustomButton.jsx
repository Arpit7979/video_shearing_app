import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomButton = ({title,handlePress,containerStyles,isLoading,textStyles}) => {
  return (
    <TouchableOpacity 
    className={`bg-secondary rounded-xl min-h-[62px] items-center justify-center ${containerStyles} ${isLoading?"opacity-50":""} `}
    onPress={handlePress}
    activeOpacity={0.7}
    disabled={isLoading}
    >
      <Text 
       className={`font-psemibold text-lg text-primary ${textStyles}`}
       >
         {title}
       </Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({})