import React, { useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Icons } from '~/components/Icon';
import ReceiptList from './receiptList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReceiptDetail from './receiptDetail';
import { useNavigation } from 'expo-router';
import Colors from '~/constants/Colors';

const Stack = createNativeStackNavigator();

const Screens = [
  { name: 'receiptList', title: "Hóa đơn", component: ReceiptList },
  { name: 'receiptDetail', title: "Chi tiết", component: ReceiptDetail },
];

export default function ReceiptLayout() {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  return (
    <Stack.Navigator
      initialRouteName="receiptList"
      screenOptions={{
        headerTintColor: Colors.primary,
        headerStyle: {
          backgroundColor: Colors.background
        },
      }}>
      {Screens.map(screen =>
        <Stack.Screen key={screen.name} name={screen.name} component={screen.component} options={{
          title: screen.title
        }} />
      )}
    </Stack.Navigator>
  );
}


const styles = StyleSheet.create({
})