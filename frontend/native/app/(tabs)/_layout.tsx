import React, { useRef } from 'react';

import Colors from '~/constants/Colors';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icons } from '~/components/Icon';
import Home from './index';
import ChatBox from './chatbox';
import Transactions from './transactions';
import Settings from './settings';
import TabButton from '~/components/navigation/TabButton';
import NewsFeed from './newsfeed';
import Scanner from './scanner';

const Tab = createBottomTabNavigator();

const TabArr = [
  { route: 'Home', label: 'Trang chủ', type: Icons.MaterialCommunityIcons, icon: 'home-outline', component: Home },
  { route: 'NewsFeed', label: 'Tin tức', type: Icons.Entypo, icon: 'news', component: NewsFeed },
  { route: 'Chatbox', label: 'Trò chuyện', type: Icons.Ionicons, icon: 'chatbox-outline', component: ChatBox },
  { route: 'Transactions', label: 'Lịch sử GD', type: Icons.MaterialCommunityIcons, icon: 'history', component: Transactions },
  { route: 'Settings', label: 'Cài đặt', type: Icons.Ionicons, icon: 'settings-outline', component: Settings },
];

export default function TabLayout() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            alignItems: 'center',
            height: 58,
            backgroundColor: Colors.background
          },
        }}
        initialRouteName='index'
        backBehavior='history'
        sceneContainerStyle={{
          backgroundColor: Colors.white,
        }}
      >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen key={index} name={item.route} component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => <TabButton {...props} item={item} />
              }}
            />
          )
        })}
      </Tab.Navigator>
    </>
  );
}


const styles = StyleSheet.create({
})