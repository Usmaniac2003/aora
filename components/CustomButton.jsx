import { TouchableOpacity, Text, View } from 'react-native'
import React from 'react'

const CustomButton = ({title,handlePress,containerStyles,textStyles,isLoading}) => {
  return (
    <View>
      <TouchableOpacity
      onPress={handlePress}
    disabled={isLoading}
      className={`bg-secondary rounded-xl min-h[62px] justify-center items-center p-4 ${containerStyles} ${isLoading?"opacity-50":""}` }><Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text></TouchableOpacity>
    </View>
  )
}

export default CustomButton

