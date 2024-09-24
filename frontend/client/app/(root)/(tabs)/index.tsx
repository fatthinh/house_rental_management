import { StatusBar } from 'expo-status-bar';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { images, icons } from '@/constants';
import PostCard from '@/components/PostCard';

export default function Home() {
  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={[
          {
            id: "hello",
            content: "hello"
          },
          {
            id: "hi",
            content: "hi"
          }
        ]}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item, index) => index.toString()}
        className="px-5"
        // keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100
        }}
        ListHeaderComponent={
          <>
            <View className="flex flex-row items-center justify-between my-2">
              <Text className="text-xl font-JakartaExtraBold">
                Chào Thịnh    👋
              </Text>
              <TouchableOpacity
                className="justify-center items-center w-10 h-10 rounded-full bg-white"
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
            </View>

            <View className="flex flex-row items-center bg-white shadow-md shadow-neutral-300 rounded-lg py-2 my-2">
              <Image
                source={icons.search}
                className="w-6 h-6 mx-2 px-4"
                resizeMode="contain"
              />
              <TextInput className='w-full py-1 text-md font-bold' placeholder='Tìm kiếm...' />
            </View>

            <Text className="text-xl mt-5 mb-3 font-JakartaSemiBold">
              Diễn đàn
            </Text>
          </>
        }
      >
      </FlatList>
    </SafeAreaView >
  );
}

