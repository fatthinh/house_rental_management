import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons, images } from "@/constants";
import { router } from "expo-router";
import useAxios from "@/hooks/useAxios";
import { baseConfig, endpoints } from "@/api/axios";
import { useSelector } from "react-redux";
import { authSlice } from "@/redux/slides/authSlice";
import { useAppSelector } from "@/hooks/redux";
import { data } from '../../../constants/index';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Message {
  id: string;
  sender: String;
  content: string;
  createdAt: Date;
}

interface ChatData {
  first: string;
  second: string;
  id: string;
  messages: Message[]; // An array of Message objects
}

const ChatItem = (data: ChatData) => {
  const info = data?.data;
  
  const token = AsyncStorage.getItem("token");

  

  const { response: first } = useAxios({
    method: "GET",
    url: `${baseConfig.baseURL}${endpoints.user(info.first)}`,
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`
    }
  })

  const { response: second } = useAxios({
    method: "GET",
    url: `${baseConfig.baseURL}${endpoints.user(info.second)}`,
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`
    }
  })

  return <TouchableOpacity className="flex flex-row gap-5 px-3 active:opacity-100 active:bg-neutral-100 mt-[1px]" onPress={() => router.navigate({ pathname: "/(root)/chat-detail", params: { chatId: "chatid" } })}>
    <View>
      <Image source={{
        uri: "https://res.cloudinary.com/dzjhqjxqj/image/upload/v1704532184/default-avatar-icon-of-social-media-user-vector_yefjz5.jpg"
      }}
        className="w-12 h-12 rounded-3xl"
      />
    </View>
    <View className="flex-1 border-b border-neutral-200 mr-1 pt-1 pb-3">
      <View className="flex flex-row justify-between -mt-2">
        <Text className="text-lg">{first?.data.name}</Text>
        <Text className="mr-5 mt-1 text-xs font-thin">5 giờ</Text>
      </View>
      <Text className="mt-1 text-neutral-500">{info.messages[0].content}</Text>
    </View>
  </TouchableOpacity>
}

export default function Chat() {
  const user = useAppSelector((state) => state.auth.user)

  const { response, error, loading } = useAxios({
    method: "GET",
    url: `${baseConfig.baseURL}${endpoints.chat("45d00677-0054-4546-9460-bd35b2b68dc3")}`,
    headers: {
      Accept: "*/*"
    }
  })

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text className="px-5 text-2xl font-JakartaBold my-4">Tin nhắn</Text>
        {/* <View className="flex-1 h-fit flex justify-center items-center">
          <Image
            source={images.message}
            alt="message"
            className="w-full h-40"
            resizeMode="contain"
          />
          <Text className="text-3xl font-JakartaBold mt-3">
            No Messages Yet
          </Text>
          <Text className="text-base mt-2 text-center px-7">
            Start a conversation with your friends and family
          </Text>
        </View> */}
        <View className="-mt-2">
          <View className="flex flex-row items-center bg-white shadow-lg shadow-neutral-300 rounded-lg py-2">
            <Image
              source={icons.search}
              className="w-6 h-6 mx-2 px-4"
              resizeMode="contain"
            />
            <TextInput className='w-[80%] py-1 text-md font-bold' placeholder='Tìm kiếm...' />
          </View>
          {response?.data && Array.from(response?.data).map(item => <ChatItem key={item.id} data={item} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}