import { FlatList, StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from "../components/SearchInput"
import EmptyState from "../components/EmptyState";
import {getUserPosts } from '@/lib/appwrite'
import  useAppwrite  from '../../lib/useAppwrite'
import VideoCard from '../components/VideoCard'
import {useGlobalContext} from "../../context/GlobalProvider";
import { icons } from '../../constants';
import InfoBox from '../components/InfoBox';
import { signOut } from '../../lib/appwrite';
import { router } from 'expo-router';


const Search = () => {
  const {user,setUser,setIsLogedIn} = useGlobalContext();
  const {data: posts} = useAppwrite(()=>getUserPosts(user.$id));
  
  const logout = async()=>{
    await signOut();

    setUser(null);
    setIsLogedIn(false);
    router.replace("/sign-in");
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item)=>item.$id}
        renderItem={(({item})=>(
          <VideoCard video={item}/>
        ))}
        
        ListHeaderComponent={()=>(
          <View className="w-full items-center justify-center mt-6 mb-12 px-4">
            <TouchableOpacity className="items-end w-full mb-10" onPress={logout}>
              <Image source={icons.logout} 
              className="w-6 h-6"
              resizeMode='contain'
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary-100 rounded-lg justify-center items-center">
              <Image source={{uri:user?.avatar}}
                resizeMode='cover'
                className="w-[90%] h-[90%] rounded-lg"
              />
            </View>
            <View className="flex-row mt-5">
              <InfoBox
              title={posts.length || 0}
              subTitle="Posts"
              containerStyles="mr-10"
              titleStyles="text-xl"
              />
              <InfoBox
              title="1.3k"
              subTitle="Followers"
              titleStyles="text-xl"
              />
            </View>
          </View>
        )}

        ListEmptyComponent={()=>(
          <EmptyState 
          title="No Videos Found"
          subTitle="No videos found for the search query"
          />
        )}

      />
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({})