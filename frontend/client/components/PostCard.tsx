import { Image, Text, TouchableHighlight, TouchableWithoutFeedback, View } from "react-native";

import { icons, images } from '@/constants';
import { Post } from "@/types/type";
import { useState } from 'react';

const PostCard = ({ post }: { post: Post }) => {
  const [contentHeight, setContentHeight] = useState(8);
  return (
    <View className="my-2 p-4 bg-white rounded-lg shadow-lg">
      <View className="flex flex-row items-center mb-2">
        <Image source={images.check} className="w-8 h-8" />
        <View className="ml-2">
          <Text>Quản trị viên</Text>
          <Text className="font-extralight text-xs">2 ngày trước</Text>
        </View>
      </View>
      <View>
        <TouchableWithoutFeedback onPress={() => setContentHeight(prev => prev === 8 ? 96 : 8)}>
          <Text className={`max-h-${contentHeight}`}>Tip: A screen reader is a software program that reads the HTML code, and allows the user to "listen" to the content. Screen readers are useful for people who are visually impaired or learning disabled.</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default PostCard;
