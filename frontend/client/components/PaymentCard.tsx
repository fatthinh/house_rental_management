import { Image, Text, View } from "react-native";

import { icons, images } from '@/constants';
// import { formatDate, formatTime } from "@/lib/utils";
import { Payment } from "@/types/type";
import { formatDate, formatTime } from "@/lib/utils";
import { Link } from "expo-router";

const PaymentCard = ({ payment }: { payment: Payment }) => {
  return (
    <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
      <View className="flex flex-col items-start justify-center p-3">


        <View className="flex flex-row items-center gap-x-2">
          <Image source={icons.point} className="w-5 h-5" />
          <Text className="text-md font-JakartaMedium" numberOfLines={1}>
            {payment.id}
          </Text>
        </View>

        <View className="flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center">
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Ngày tạo
            </Text>
            <Text className="text-md font-JakartaBold" numberOfLines={1}>
              {formatDate(Date())}, {formatTime(455)}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Phòng
            </Text>
            <Text className="text-md font-JakartaBold">
              C302
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Số tiền
            </Text>
            <Text className="text-md font-JakartaBold">
              {payment.amount.toLocaleString()}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Payment Status
            </Text>
            <Text
              className={`text-md capitalize font-JakartaBold ${payment.status === "paid" ? "text-green-500" : "text-red-500"}`}
            >
              {payment.status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PaymentCard;
