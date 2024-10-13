import { Text, FlatList, View, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import axios, { baseConfig, endpoints } from '@/api/axios';
import { formatDate, formatTime } from '@/lib/utils';
import useAxios from '@/hooks/useAxios';
import { useAppSelector } from '../../../hooks/redux';

export default function Payment() {
  const user = useAppSelector((state) => state.auth.user)

  const { response: agreement } = useAxios({
    method: "GET",
    url: `${baseConfig.baseURL}${endpoints.agreement}/${user?.agreementId}`,
  })

  const [invoices, setInvoices] = useState([])

  useEffect(() => {
    const startDate = new Date(agreement?.data.startDate);
    const totalInvoices = getMonthDiff(startDate, new Date());
    const invoiceList = [];

    for (let index = 0; index < totalInvoices; index++) {
      const invoiceDate = new Date(startDate);
      invoiceDate.setMonth(invoiceDate.getMonth() + index);

      invoiceList.push({
        month: invoiceDate.getMonth() + 1, // JavaScript months are 0-based
        year: invoiceDate.getFullYear(),
      });
    }
    setInvoices(invoiceList);

  }, [agreement]);

  const getMonthDiff = (startDate: Date, endDate: Date) => {
    return (
      endDate.getFullYear() * 12 +
      endDate.getMonth() -
      (startDate.getFullYear() * 12 + startDate.getMonth())
    );
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <FlatList
        data={Array.from(invoices)}
        renderItem={({ item, index }) =>
          <TouchableOpacity onPress={() => {
            router.push({
              pathname: "/(root)/payment-detail", params: {
                agreementId: user?.agreementId,
                month: item.month
              }
            })
          }}>
            <View className={`flex flex-row gap-1 mt-1 py-1 ${index % 2 == 1 && 'bg-primary-100'}`}>
              <Image source={images.noResult} className="w-12 h-12" />
              <View className="flex-1">
                <Text className='text-md font-JakartaBold' >Hóa đơn tiền phòng tháng {item.month}</Text>
                <Text className="text-xs font-light">{formatDate(new Date(item.year, item.month, 0))}</Text>
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