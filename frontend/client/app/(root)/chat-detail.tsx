import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useRef } from "react";

const Message = () => {
    return <View className="flex-1 flex flex-row gap-3 mx-1 mt-auto">
        <Image source={{
            uri: "https://res.cloudinary.com/dzjhqjxqj/image/upload/v1704532184/default-avatar-icon-of-social-media-user-vector_yefjz5.jpg"
        }}
            className="w-7 h-7 rounded-3xl"
        />
        <View className="w-[80%] p-2 bg-white shadow-xl rounded-md">
            <Text className="mb-1 text-[16px]">Tip: A screen reader is a software program that reads the HTML code, and allows the user to "listen" to the content. Screen readers are useful for people who are visually impaired or learning disabled.</Text>
            <Text className="font-thin text-[10px] text-right">12:05</Text>
        </View>
    </View>
}

export default function ChatDetail() {
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        // Scroll to the bottom when the component mounts
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, []);

    return <SafeAreaView className="flex-1 bg-white">
        <View className="flex flex-row justify-between bg-primary-400 rounded-b-xl pt-11 pb-3 px-4 items-">
            <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="black" /></TouchableOpacity>
            <Text className="text-lg font-bold">Phát Thịnh</Text>
        </View>
        <ScrollView ref={scrollViewRef} className="bg-primary-100 pb-2">
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <View className="py-2"></View>
        </ScrollView>
        <View className="flex flex-row bg-white items-center shadow-xl">
            <TextInput placeholder="Soạn tin..." className="placeholder:font-thin flex-1 pl-4 pr-2 py-3 text-lg" />
            <TouchableOpacity className="p-3">
                <MaterialIcons name="send" size={24} color="black" />
            </TouchableOpacity>
        </View>
    </SafeAreaView>
}