import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Image, Platform, View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images, icons } from '@/constants';
import { LinearGradient } from 'expo-linear-gradient';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import axios, { baseConfig, endpoints } from '@/api/axios';
import { fetchAPI } from '@/lib/fetch';
import ReactNativeModal from 'react-native-modal';
import Button from '@/components/Button';
import React, { useState } from 'react';
import useAxios from '@/hooks/useAxios';
import { formatDate } from '@/lib/utils';
import callApi from '@/api/call';

export default function PaymentDetail() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [success, setSuccess] = useState<boolean>(false);
    const { paymentId } = useLocalSearchParams();
    const { response } = useAxios({
        method: "GET",
        url: `${baseConfig.baseURL}${endpoints.singleInvoice(Number(paymentId))}`,
        headers: {
            Accept: "*/*"
        }
    });

    const openPaymentSheet = async () => {
        await initializePaymentSheet();

        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            setSuccess(true);
        }
    };

    const initializePaymentSheet = async () => {
        const { error } = await initPaymentSheet({
            merchantDisplayName: "fatthinh, Inc.",
            intentConfiguration: {
                mode: {
                    amount: response?.data.amount,
                    currencyCode: "vnd",
                },
                confirmHandler: async (
                    paymentMethod,
                    shouldSavePaymentMethod,
                    intentCreationCallback,
                ) => {
                    const integratedRes = await callApi({
                        endpoint: `${baseConfig.baseURL}${endpoints.integrated}`,
                        data: {
                            name: response?.data.houseName,
                            email: "pthinh.lama@gmail.com",
                            amount: response?.data.amount,
                            paymentMethodId: paymentMethod.id,
                        },
                        config: {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        },
                        method: "POST"
                    });

                    const payRes = await callApi({
                        endpoint: `${baseConfig.baseURL}${endpoints.pay}`,
                        data: {
                            paymentMethodId: paymentMethod.id,
                            paymentIntentId: integratedRes?.data.intentId,
                            invoiceId: paymentId
                        },
                        config: {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        },
                        method: "POST"
                    });

                    if (payRes?.status == 200) {
                        intentCreationCallback({
                            clientSecret: integratedRes?.data.intentClientSecret,
                        })
                    }
                },
            },
            returnURL: "myapp://(tabs)/payment",
        });

        if (!error) {
            // setLoading(true);
        }
    };

    return (
        <React.Fragment>
            <StripeProvider
                publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
                merchantIdentifier='merchant.lpthinh.com'
                urlScheme='myapp'
            >
                <View className="flex-1">
                    <LinearGradient
                        // Background Linear Gradient
                        colors={['#BCCFE4', '#ddd', 'transparent']}
                        className="h-1/3 rounded-b-3xl"
                        start={{ x: 0.5, y: 0.5 }}
                    >

                        <SafeAreaView>
                            <View className="flex flex-row items-center px-4 mt-2 gap-2">
                                <TouchableOpacity className="p-1 bg-general-600 rounded-2xl" onPress={() => router.back()} >
                                    <Image source={icons.backArrow} className="w-6 h-6" />
                                </TouchableOpacity>
                                <Text className="text-md font-JakartaBold mb-1 text-primary-800">Chi tiết</Text>
                            </View>
                            <View className="bg-white mt-12 mx-6 rounded-2xl shadow-xl pt-4">
                                <View className="flex flex-row px-4 items-center border border-primary-400 p-2 mx-4 rounded-lg">
                                    <Image source={images.check} className='w-8 h-8' />
                                    <View className="px-4">
                                        <Text className='uppercase font-light'>Số tiền</Text>
                                        <Text className="text-lg">{response?.data.amount.toLocaleString()}</Text>
                                    </View>
                                </View>
                                <View className="flex justify-between items-center flex-row mt-3 px-4" >
                                    <Text className="font-light">Mã hóa đơn</Text>
                                    <Text className="fon t-JakartaBold text-xs">#{response?.data.id}</Text>
                                </View>
                                <View className="flex justify-between items-center flex-row mt-3 px-4" >
                                    <Text className="font-light">Tháng</Text>
                                    <Text className="fon t-JakartaBold text-xs">{response?.data.month}</Text>
                                </View>
                                {response?.data.state == "UNPAID" && <>
                                    <View className="flex justify-between items-center flex-row mt-3 px-4" >
                                        <Text className="font-light">Thời gian</Text>
                                        <Text className="font-JakartaBold text-xs ">{formatDate(response?.data.createdAt)}</Text>
                                    </View>
                                    <View className="flex justify-between items-center flex-row mt-3 px-4" >
                                        <Text className="font-light">Mã giao dịch</Text>
                                        <Text className="font-JakartaBold text-xs ">1674128793</Text>
                                    </View></>}
                                <View className="flex justify-between items-center flex-row mt-3 px-4" >
                                    <Text className="font-light">Trạng thái</Text>
                                    <Text className={`font-JakartaBold text-xs ${response?.data.state == "PAID" ? "bg-success-400" : "bg-neutral-400"} px-3 py-1 text-white rounded-md`}>{response?.data.state == "PAID" ? "Đã thanh toán" : "Chưa thanh toán"}</Text>
                                </View>
                                <TouchableOpacity className="bg-primary-300 py-3 mt-4 rounded-b-2xl">
                                    <Text className="text-center font-JakartaBold text-xs">Liên hệ hỗ trợ</Text>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    </LinearGradient>
                    <View className='mt-auto mb-3'>
                        <TouchableOpacity className="mx-8 py-3 bg-primary-500 rounded-xl" onPress={openPaymentSheet}>
                            <Text className="text-lg font-JakartaBold text-white text-center leading-6" >Thanh toán</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </StripeProvider>
            <ReactNativeModal
                isVisible={success}
            // onBackdropPress={() => setSuccess(false)}
            >
                <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
                    <Image source={images.check} className="w-28 h-28 mt-5" />

                    <Text className="text-xl text-center font-JakartaBold mt-5">
                        Thanh toán thành công
                    </Text>

                    <Text className="text-md text-general-200 font-JakartaRegular text-center mt-3">
                        Cảm ơn vì đã tin tưởng và sử dụng dịch vụ của chúng tôi
                    </Text>


                    <Button
                        title="Xác nhận"
                        onPress={() => {
                            setSuccess(false);
                            router.push("/(root)/(tabs)/payment");
                        }}
                        className="mt-5"
                    />
                </View>
            </ReactNativeModal>
        </React.Fragment>
    );
}