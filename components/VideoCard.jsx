import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

import { icons } from '../constants';

const VideoCard = ({ title, thumbnail, videoUrl, creatorName, creatorAvatar }) => {
  const [play, setPlay] = useState(false);
  const videoRef = useRef(null); // Use a ref to control the video manually

  const handlePlayPause = async () => {
    if (play) {
      // Pause the video
      await videoRef.current.pauseAsync();
      setPlay(false);
    } else {
      // Play the video
      try {
        await videoRef.current.playAsync();
        setPlay(true);
      } catch (error) {
        Alert.alert("Playback Error", "Unable to play the video. Please try again.");
      }
    }
  };

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: creatorAvatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text className="font-psemibold text-sm text-white" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
              {creatorName}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {play ? (
        <Video
          ref={videoRef}
          source={{ uri: videoUrl }}
          style={{ width: '100%', height: 240, borderRadius: 10, marginTop: 10 }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
          onError={(error) => {
            Alert.alert("Playback Error", "An error occurred while playing the video.");
            console.error("Video playback error:", error);
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handlePlayPause}
          style={{ width: '100%', height: 240, borderRadius: 10, marginTop: 10, position: 'relative', justifyContent: 'center', alignItems: 'center' }}
        >
          <Image
            source={{ uri: thumbnail }}
            style={{ width: '100%', height: '100%', borderRadius: 10 }}
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            style={{ width: 48, height: 48, position: 'absolute' }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
