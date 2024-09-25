import { FlatList, StyleSheet,View, RefreshControl} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from "../components/SearchInput"
import EmptyState from "../components/EmptyState";
import { getBookmarkedPosts } from '@/lib/appwrite'
import VideoCard from '../components/VideoCard'
import useAppwrite from '../../lib/useAppwrite'
import {useGlobalContext} from "../../context/GlobalProvider";

const Bookmark = () => {
  const {user} = useGlobalContext();
  const {data: posts,refetch} = useAppwrite(getBookmarkedPosts);

  const [refreshing,setRefreshing] = useState(false);
  const onRefresh = async()=>{
    setRefreshing(true);
    //re call video if new video appear
    await refetch();
    setRefreshing(false);
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
          <View className='my-6 px-4 space-y-6'>
            <SearchInput placeholder={"Search for a Videos"} />
          </View>
        )}

        ListEmptyComponent={()=>(
          <EmptyState 
          title="No Videos Found"
          subTitle="Be the first to upload a video"
          />
        )}

        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Bookmark

const styles = StyleSheet.create({})