import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { Tabs,Redirect } from 'expo-router'
import icons from "../../constants/icons"
const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={{justifyContent:"center",alignItems:"center",gap:2}}>
      <Image source={icon} className="w-6 h-6" style={{ tintColor: color }} resizeMode="contain" />
      <Text className={`${focused?"font-psemibold":"font-pregular"} text-xs`} style={{color:"white"}}>{name}</Text>
    </View>
  );
};


const TabsLayout = () => {
  return (
    <>
    <Tabs  screenOptions={{
      headerShown:false,
      tabBarShowLabel:false,
      tabBarActiveTintColor:"#FFA001",
      tabBarInactiveTintColor:"#CDCDE0",
      tabBarStyle:{
        backgroundColor:"#161622",
        borderTopWidth:1,
        borderTopColor:"#232533",
        height:84
      }
    }}>
      <Tabs.Screen name='home' options={{
        title:"home",
        headerShown:false,
        tabBarIcon:({color,focused})=>(<TabIcon icon={icons.home} color={color} name="Home" focused={focused}></TabIcon>)
      }}></Tabs.Screen>
       <Tabs.Screen name='bookmark' options={{
        title:"bookmark",
        headerShown:false,
        tabBarIcon:({color,focused})=>(<TabIcon icon={icons.bookmark} color={color} name="Bookmark" focused={focused}></TabIcon>)
      }}></Tabs.Screen>
       <Tabs.Screen name='create' options={{
        title:"create",
        headerShown:false,
        tabBarIcon:({color,focused})=>(<TabIcon icon={icons.plus} color={color} name="Create" focused={focused}></TabIcon>)
      }}></Tabs.Screen>
       <Tabs.Screen name='profile' options={{
        title:"profile",
        headerShown:false,
        tabBarIcon:({color,focused})=>(<TabIcon icon={icons.profile} color={color} name="Profile" focused={focused}></TabIcon>)
      }}></Tabs.Screen>
      
    </Tabs>
    
    </>
  )
}

export default TabsLayout

