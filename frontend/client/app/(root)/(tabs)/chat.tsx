import { Image, Keyboard, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons, images } from "@/constants";
import { router } from "expo-router";
import useAxios from "@/hooks/useAxios";
import axios, { baseConfig, endpoints } from "@/api/axios";
import { useAppSelector } from "@/hooks/redux";
import { timeDifference } from "@/lib/utils";
import { useSubscription } from "react-stomp-hooks";
import { Fragment, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import useDebounce from "@/hooks/useDebounce";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Message {
  id: string;
  sender: String;
  content: string;
  createdAt: Date;
}

interface ChatData {
  id: string;
  messages: Message[]; // An array of Message objects
  users: String[]
}

const ChatItem = (data: ChatData) => {
  const info = data?.data;

  return <TouchableOpacity
    className="flex flex-row gap-5 px-3 active:opacity-100 active:bg-neutral-100 mt-[1px]"
    onPress={() => router.navigate({ pathname: "/(root)/chat-detail", params: { chatId: info.id } })}>
    <View>
      <Image source={{
        uri: "https://res.cloudinary.com/dzjhqjxqj/image/upload/v1704532184/default-avatar-icon-of-social-media-user-vector_yefjz5.jpg"
      }}
        className="w-12 h-12 rounded-3xl"
      />
    </View>
    <View className="flex-1 border-b border-neutral-200 mr-1 pt-1 pb-3">
      <View className="flex flex-row justify-between -mt-2">
        <Text className="text-lg">{info.name}</Text>
        <Text className="mr-5 mt-1 text-xs font-thin">{timeDifference(info.messages[0].createdAt)}</Text>
      </View>
      <Text className="mt-1 text-neutral-500">{info.messages[0].content}</Text>
    </View>
  </TouchableOpacity>
}

export default function Chat() {
  const user = useAppSelector((state) => state.auth.user)
  const [searchModalVis, setSearchModalVis] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [greetingModal, setGreetingModal] = useState(false);
  const [greetingMessage, setGreetingMessage] = useState({
    message: "",
    users: []
  });
  const searchDebounce = useDebounce({ value: searchValue, delay: 500 });

  const { response: chat, sendData } = useAxios({
    method: "GET",
    url: `${baseConfig.baseURL}${endpoints.chat(user?.id)}`,
    headers: {
      Accept: "*/*"
    }
  })


  useSubscription("/topic/chat", (message) => {
    console.log(message.body);
    sendData();
  })

  const handleSendMessage = async () => {
    try {
      if (greetingMessage.message.length) {
        const token = await AsyncStorage.getItem("token");
        const res = await axios.post(endpoints.newChat, greetingMessage, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (res.status == 200) {
          setGreetingModal(false);
          sendData();
          setSearchModalVis(false);
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const searchFunc = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await axios.get(`${endpoints.userList}?name=${searchValue}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (res.status == 200) {
          setSearchResult(res.data);
        }
      } catch (error) {
        console.log(error)
      }
    }
    searchFunc();
  }, [searchDebounce])


  return (
    <Fragment>
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text className="px-5 text-2xl font-JakartaBold my-4">Tin nhắn</Text>
          <View className="-mt-2">
            <View className="flex flex-row items-center bg-white shadow-lg shadow-neutral-300 rounded-lg py-2">
              <Image
                source={icons.search}
                className="w-6 h-6 mx-2 px-4"
                resizeMode="contain"
              />
              <View className="flex-1">
                <TextInput className='w-[80%] py-1 text-md font-bold' focusable placeholder='Tìm kiếm...' onFocus={() => {
                  setSearchModalVis(true);
                  Keyboard.dismiss();
                }} />
              </View>
            </View>
            {chat?.data.length ?
              Array.from(chat?.data).map(item => <ChatItem key={item.id} data={item} />)
              :
              <View className="h-fit flex items-center mt-20">
                <Image
                  source={images.message}
                  alt="message"
                  className="w-full h-40"
                  resizeMode="contain"
                />
                <Text className="text-3xl font-JakartaBold mt-3">
                  Chưa có tin nhắn nào
                </Text>
                <Text className="text-base mt-2 text-center px-7">
                  Hãy bắt đầu trò chuyện
                </Text>
              </View>
            }
          </View>
        </ScrollView>
      </SafeAreaView>

      <Modal visible={searchModalVis} animationType="slide" onRequestClose={() => setSearchModalVis(false)}>
        <View className="flex flex-row items-center bg-white shadow-lg shadow-neutral-300 rounded-lg py-2">
          <TouchableOpacity className="px-3" onPress={() => setSearchModalVis(false)}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <TextInput
            value={searchValue}
            onChangeText={(value) => setSearchValue(value)}
            className='flex-1 py-1 text-md font-bold'
            autoFocus
            focusable
            placeholder='Tìm kiếm...'
          />
          <Image
            source={icons.search}
            className="w-6 h-6 mx-2 px-4"
            resizeMode="contain"
          />
        </View>
        <ScrollView className="mt-1">
          {searchResult.length != 0 &&
            searchResult
              .filter(item => item?.id !== user?.id)
              .map(item =>
                <View key={item.id} className="bg-primary-200 mt-1">
                  <TouchableOpacity
                    className="flex flex-row items-center px-3"
                    onPress={() => {
                      const existChat = Array.from(chat?.data).find(chat => chat.users.includes(item.id))
                      if (existChat) {
                        setSearchModalVis(false);
                        router.navigate({ pathname: "/(root)/chat-detail", params: { chatId: existChat.id } });
                      } else {
                        setGreetingModal(true);
                        setGreetingMessage(prev => {
                          return {
                            ...prev,
                            users: [user.id, item.id]
                          }
                        })

                      }
                    }}
                  >
                    <Image source={{
                      uri: "https://res.cloudinary.com/dzjhqjxqj/image/upload/v1704532184/default-avatar-icon-of-social-media-user-vector_yefjz5.jpg"
                    }}
                      className="w-10 h-10 rounded-3xl"
                    />
                    <Text className="text-lg border-r-8 border-primary-400 w-[80%] py-4 ml-8">{item.name}</Text>
                  </TouchableOpacity>
                </View>)}
        </ScrollView>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={greetingModal}
        onRequestClose={() => setGreetingModal(false)}
      >
        <View className="h-[132px] bg-white shadow-xl rounded-b-3xl p-4">
          <Text className="font-bold text-primary-500">Gửi lời chào đến {searchResult.find(item => item.id === greetingMessage.users[1])?.name}!</Text>
          <View className="mt-auto flex flex-row bg-primary-200 items-center shadow-xl rounded-xl">
            <TextInput
              value={greetingMessage.message}
              onChangeText={(value) => setGreetingMessage(prev => {
                return {
                  ...prev,
                  message: value
                }
              })}
              placeholder="Soạn tin..."
              className="placeholder:font-thin flex-1 pl-4 pr-2 py-3 text-lg"
              autoFocus
            />
            <TouchableOpacity className="p-3 border rounded-r-xl border-primary-300" onPress={handleSendMessage}>
              <MaterialIcons name="send" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Fragment>
  );
}