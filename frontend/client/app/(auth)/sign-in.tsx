import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Image, ScrollView, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import axios, { endpoints } from "@/api/axios";
import { useAppDispatch } from '../../hooks/redux';
import { authSlice } from '../../redux/slides/authSlice';

const SignIn = () => {
    const dispatch = useAppDispatch()
    const [form, setForm] = useState({
        email: "tranvanb@gmail.com",
        password: "password",
    });


    const onSignInPress = useCallback(async () => {
        try {
            const data = {
                email: form.email,
                password: form.password
            }

            const res = await axios.post(endpoints.login, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (res.status == 200) {
                await AsyncStorage.setItem("token", res.data);
                const userRes = await axios.get(endpoints.currentUser, {
                    headers: {
                        "Authorization": `Bearer ${res.data}`
                    }
                })
                dispatch(authSlice.actions.login(userRes.data))
                router.replace("/(root)/(tabs)/")
            }
            else
                Alert.alert("Lỗi", "Đăng nhập thất bại!");

        } catch (error: any) {
            console.log(JSON.stringify(error, null, 2));
            Alert.alert("Lỗi", "Lỗi server");
        }

    }, [form])

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[250px]">
                    <Image source={images.onboarding1} className="z-0 w-full h-[250px]" />
                </View>

                <View className="p-5">
                    <InputField
                        label="Email"
                        placeholder="Nhập email"
                        icon={icons.email}
                        textContentType="emailAddress"
                        value={form.email}
                        onChangeText={(value) => setForm({ ...form, email: value })}
                    />

                    <InputField
                        label="Mật khẩu"
                        placeholder="Nhập mật khẩu"
                        icon={icons.lock}
                        secureTextEntry={true}
                        textContentType="password"
                        value={form.password}
                        onChangeText={(value) => setForm({ ...form, password: value })}
                    />

                    <Button
                        title="Đăng nhập"
                        onPress={onSignInPress}
                        className="mt-6"
                    />

                    {/* <OAuth /> */}
                </View>
            </View>
        </ScrollView>
    );
};

export default SignIn;
