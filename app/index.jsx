import { Redirect,useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from "../constants"
import CustomButton from '../components/CustomButton';
import {useGlobalContext} from "../context/GlobalProvider"
export default function App() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;
const router=useRouter();
  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView contentContainerStyle={{width:"100%"}}>
      <View className="w-full h-full justify-center items-center 4px">
      <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode='contain'></Image>
      <Image source={images.cards} className="w-[380px] h-[300px]" resizeMode='contain'></Image>
      <View className="relative mt-5">
        <Text className="text-white text-center text-3xl font-bold">Discover Endless Possibilities With{" "}<Text className="text-secondary-200">Aora</Text></Text>
        <Image source={images.path} resizeMode='contain' className="absolute w-[136px] h-[15px] -bottom-2 -right-8"></Image>
      </View>
      <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">Where creativity meets innovation: embark on a journey of a limitless exploration with aora</Text>
      <CustomButton
      title={"Continue with Email"}
      handlePress={()=>router.push("/sign-in")}
      containerStyles={"w-full mt-7 7-px"}
      ></CustomButton>
      </View>

      </ScrollView>
      <StatusBar backgroundColor='#161612' style='light'></StatusBar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize:30,
    color:"blue"
  }
});
