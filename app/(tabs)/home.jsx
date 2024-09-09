import { Alert, FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {images} from "../../constants"
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import { getAllPosts,getLatestPosts,getCurrentUser } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';
const Home = () => {
const {data:posts,refetch}=useAppwrite(getAllPosts);
const { data: latestPosts } = useAppwrite(getLatestPosts);
const { data: user } = useAppwrite(getCurrentUser);

const [refreshing,Setisrefreshing]=useState(false);
const onRefresh=async ()=>{
  Setisrefreshing(true);
  await refetch();
  Setisrefreshing(false);


}
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
        data={posts}
        keyExtractor={(item) => item.$id}  // Ensure the key is a string
        renderItem={({ item }) => (
          <VideoCard
          title={item.title}
          thumbnail={item.thumbnail}
          videoUrl={item.video} // Assuming `videoUrl` is the key for video link
          creatorName={item.creator?.username} // Safely access creator data
          creatorAvatar={item.creator?.avatar} // Safely access avatar data
        />        )}
        ListHeaderComponent={()=>(
          
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mt-6 mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                <Text className="text-2xl font-psemibold text-white">{user.username}</Text>
              </View>
              <View className="mt-1.5">
                <Image className="w-9 h-10" source={images.logoSmall} resizeMode='contain'></Image>
              </View>
            </View>
            <SearchInput></SearchInput>
            <View className="w-full flex-1 pt-5 pb-8 ml-3">
            <Text className="text-gray-100 text-lg-font-pregular mb-3">Latest Videos</Text>
            <Trending posts={latestPosts??[]}></Trending>
            </View>
          </View>
  )}
  ListEmptyComponent={()=>(
    <EmptyState  title={"Be the first one to upload a video."} subtitle={"No Videos Found."}></EmptyState>
  )}
  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>}
      />
    </SafeAreaView>
  );
}


export default Home;
