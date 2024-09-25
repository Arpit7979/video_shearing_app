import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const InfoBox = ({title,subTitle,containerStyles,titleStyles}) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-pmedium ${titleStyles}`}>{title}</Text>
      <Text className="text-sm text-center font-pmedium text-gray-100">{subTitle}</Text>
    </View>
  )
}

export default InfoBox

const styles = StyleSheet.create({})