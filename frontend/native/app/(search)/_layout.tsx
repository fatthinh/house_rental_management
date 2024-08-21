
import UserList from './userList';
import Colors from '~/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Stack } from 'expo-router';
import SearchBox from '~/components/SearchBox';


const Screens = [
  { name: 'userList', title: "Người dùng", component: UserList },
];

export default function SearchLayout() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  return (
    <Stack
      initialRouteName="receiptList"
      screenOptions={{
        headerShown: false,
      }}
    >
      {Screens.map(screen =>
        <Stack.Screen
          key={screen.name}
          name={screen.name}
        />
      )}
    </Stack>
  );
}