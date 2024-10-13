import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import useAxios from "@/hooks/useAxios";
import axios, { baseConfig, endpoints } from "@/api/axios";
import { useAppSelector } from "@/hooks/redux";
import { authSelector } from "@/redux/slides/authSlice";
import { useStompClient, useSubscription } from "react-stomp-hooks";
import { timeDifference } from "@/lib/utils";

declare interface MessageProp {
    content: String,
    id: String,
}

const Message = (data: Object) => {
    return <View className="flex-1 flex flex-row gap-3 mx-1 mt-auto">
        <View className="w-[80%] p-2 bg-white shadow-xl rounded-md">
            <Text className="mb-1 text-[16px]">{data?.data?.content}</Text>
            <Text className="font-thin text-[10px] text-right">{timeDifference(data?.data?.createdAt)}</Text>
        </View>
        <Image source={{
            uri: "https://res.cloudinary.com/dzjhqjxqj/image/upload/v1704532184/default-avatar-icon-of-social-media-user-vector_yefjz5.jpg"
        }}
            className="w-7 h-7 rounded-3xl"
        />
    </View>
}

const MyMessage = (data: Object) => {
    return <View className="flex-1 flex flex-row gap-3 mx-1 mt-auto">
        <Text>Bạn: </Text>
        <View className="w-[80%] p-2 bg-white shadow-xl rounded-md">
            <Text className="mb-1 text-[16px]">{data?.data?.content}</Text>
            <Text className="font-thin text-[10px] text-right">{timeDifference(data?.data?.createdAt)}</Text>
        </View>
    </View>
}

export default function ChatDetail() {
    const { user } = useAppSelector(authSelector);
    const { chatId } = useLocalSearchParams();
    const scrollViewRef = useRef<ScrollView>(null);
    const [message, setMessage] = useState<string>("")
    const { response: chat, sendData } = useAxios({
        method: "GET",
        url: `${baseConfig.baseURL}${endpoints.chatDetail(chatId.toString(), user?.id)}`,
        headers: {
            Accept: "*/*"
        }
    })


    const handleSendMessage = async () => {
        try {
            if (message.length) {
                const res = await axios.post(endpoints.addMessage(chatId.toString()), {
                    sender: user?.id,
                    content: message
                })

                if (res.status == 200) {
                    setMessage("");
                    scrollViewRef.current?.scrollToEnd({ animated: true });
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useSubscription("/topic/chat", (message) => {
        console.log(message.body);
        sendData();
        scrollViewRef.current?.scrollToEnd({ animated: true });
    })

    return <SafeAreaView className="flex-1 bg-white">
        <View className="flex flex-row justify-between bg-primary-400 rounded-b-xl pt-11 pb-3 px-4 items-">
            <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="black" /></TouchableOpacity>
            <Text className="text-lg font-bold">{chat?.data.name}</Text>
        </View>
        <ScrollView ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()} className="bg-primary-100 pb-2">
            {chat?.data && Array.from(chat.data.messages).reverse().map(item =>
                item.sender == user?.id ?
                    <MyMessage data={item} key={item.id} />
                    : <Message data={item} key={item.id} />
            )}
            <View className="py-2"></View>
        </ScrollView>
        <View className="flex flex-row bg-white items-center shadow-xl">
            <TextInput
                value={message}
                onChangeText={(value) => setMessage(value)}
                placeholder="Soạn tin..."
                className="placeholder:font-thin flex-1 pl-4 pr-2 py-3 text-lg"
                onFocus={() => scrollViewRef.current?.scrollToEnd({ animated: true })} />
            <TouchableOpacity className="p-3" onPress={handleSendMessage}>
                <MaterialIcons name="send" size={24} color="black" />
            </TouchableOpacity>
        </View>
    </SafeAreaView>
}