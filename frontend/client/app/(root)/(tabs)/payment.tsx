import { Text, FlatList, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import { Link, router } from 'expo-router';

export default function Payment() {
  return (
    <SafeAreaView className="bg-white flex-1">
      <FlatList
        data={Array.from([
          {
            id: "34270",
            amount: 3450012,
            status: 'paid',
            month: 8
          },
          {
            id: "23847",
            amount: 2432412,
            status: 'unpaid',
            month: 9
          },
          {
            id: "34270",
            amount: 3450012,
            status: 'paid',
            month: 10
          },
          {
            id: "23847",
            amount: 2432412,
            status: 'unpaid',
            month: 11
          }
        ]).sort(item => -item.month)}
        renderItem={({ item, index }) =>
          <TouchableOpacity onPress={() => {
            router.navigate("/(root)/payment-detail")
          }}>
            <View className={`flex flex-row gap-1 mt-1 py-1 ${index % 2 == 1 && 'bg-primary-100'}`}>
              <Image source={images.noResult} className="w-12 h-12" />
              <View className="flex-1">
                <Text className='text-md font-JakartaBold' >Hóa đơn tiền phòng tháng {item.month}</Text>
                <Text className="text-xs font-light">00:26 - 17/09/2024</Text>
                <View className="flex flex-row justify-between">
                  <Text className="text-xs font-light	">Chưa thanh toán</Text>
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