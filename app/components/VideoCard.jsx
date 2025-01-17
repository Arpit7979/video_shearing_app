import { StyleSheet, Text, View,Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'
import { ResizeMode, Video } from 'expo-av';
import { bookmarkPost } from '@/lib/appwrite';


const VideoCard = ({video:{title,thumbnail,video,creator:{username,avatar},$id,bookmark}}) => {
    const [play,setPlay] = useState(false);
    const [isBookmarked,setIsBookmarked] = useState(bookmark);
    
    const bookmarked = async(bookmarkedId)=>{
        const newBookmarkState = !isBookmarked;
        setIsBookmarked(newBookmarkState);
        Alert.alert("Alert",newBookmarkState?"Added to Bookmark":"Removed from Bookmark");
        await bookmarkPost(bookmarkedId,newBookmarkState);
    }

  return (
    <View className='flex-col items-center px-4 mb-14'> 
      <View className='flex-row gap-3 items-start'>
         <View className='justify-center items-center flex-row flex-1'>
            <View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5 '>
                <Image source={{uri:avatar}}
                 className='w-full h-full rounded-lg'
                 resizeMode='cover'
                 />
            </View>
            <View className='justify-center flex-1 ml-3 gap-y-1'>
                <Text className='text-white text-sm font-psemibold' numberOfLines={1}>
                    {title}
                </Text>
                <Text className='text-xs text-gray-100 font-pmedium' numberOfLines={1}>
                    {username}
                </Text>
            </View>
         </View>
         <View className="flex-row">
         <TouchableOpacity onPress={()=>bookmarked($id)} className="pt-2 px-2">
            {
                bookmark || isBookmarked ?(
                    <Image
                source={icons.red_heart}
                className='w-6 h-6'
                resizeMode='contain'
            />
                ):(
                    <Image
                source={icons.outline_heart}
                className='w-6 h-6'
                resizeMode='contain'
            />
                )
            }
         </TouchableOpacity>
         <View className='pt-2'>
            <Image source={icons.menu} 
                className='w-5 h-5'
                resizeMode='contain'
            />
         </View>
         </View>
      </View>
      {
        play? (
            <Video
                    source={{uri: video}}
                    className='w-full h-60 rounded-xl mt-3'
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status)=>{
                        if(status.didJustFinish){
                            setPlay(false);
                        }
                    }}
             />
        ):(
            <TouchableOpacity
            activeOpacity={0.7}
            onPress={()=>setPlay(true)}
            className='w-full h-60 rounded-xl mt-3 justify-center items-center relative'
            >
                <Image source={{uri:thumbnail}}
                    className='w-full h-full rounded-xl mt-3'
                    resizeMode='cover'
                />
                <Image source={icons.play}
                    className='w-12 h-12 absolute'
                    resizeMode='contain'
                />
            </TouchableOpacity>
        )
      }
    </View>
  )
}

export default VideoCard

const styles = StyleSheet.create({})