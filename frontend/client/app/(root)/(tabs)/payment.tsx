import { Text, FlatList, View, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import axios, { endpoints } from '@/api/axios';
import { formatDate, formatTime } from '@/lib/utils';

export default function Payment() {
  const [state, setState] = useState([])

  const loadState = async () => {
    try {
      const res = await axios.get(endpoints.allInvoice)
      if (res.status == 200) {
        setState(res.data);
      }
    } catch (error) {
      Alert.alert("Lỗi!", "Không thể tải trang!");
    }
  }

  useEffect(() => {
    loadState();
  }, [])

  return (
    <SafeAreaView className="bg-white flex-1">
      <FlatList
        data={Array.from(state).sort(item => -item.month)}
        renderItem={({ item, index }) =>
          <TouchableOpacity onPress={() => {
            router.push({
              pathname: "/(root)/payment-detail", params: {
                paymentId: 1
              }
            })
          }}>
            <View className={`flex flex-row gap-1 mt-1 py-1 ${index % 2 == 1 && 'bg-primary-100'}`}>
              <Image source={images.noResult} className="w-12 h-12" />
              <View className="flex-1">
                <Text className='text-md font-JakartaBold' >Hóa đơn tiền phòng tháng {item.month}</Text>
                <Text className="text-xs font-light">{formatDate(item.createdAt)}</Text>
                <View className="flex flex-row justify-between">
                  <Text className="text-xs font-light	">{item.state == "PAID" ? "Đã thanh toán" : "Chưa thanh toán"}</Text>
                  <Text className="text-md font-bold mr-2">{item.amount.toLocaleString()} <Text className="underline">đ</Text></Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        }
        keyExtractor={(item, index) => index.toString()}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={<Text className="px-5 text-2xl font-JakartaBold my-4">Thanh toán</Text>}
      />
    </SafeAreaView>
  );
}