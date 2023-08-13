
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Platform, TouchableOpacity, Image, View} from 'react-native';
import {COLORS, ROUTES} from '../constants';
import {Home, Wallet, Notifications, Settings} from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsNavigator from './SettingsNavigator';
import CustomTabBarButton from '../components/CustomTabBarButton';
import CustomTabBar from '../components/CustomTabBar';
import {getFocusedRouteNameFromRoute, useNavigation} from '@react-navigation/native';
import stage1 from '../assets/ICONNAVIGATION/LOGO1.png';
import stage2 from '../assets/ICONNAVIGATION/LOGO2.png';
import stage3 from '../assets/ICONNAVIGATION/LOGO3.png';
import stage4 from '../assets/ICONNAVIGATION/LOGO4.png';
import GameNavigation from './GameNavigation';


const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        
        tabBarInactiveTintColor: COLORS.dark,
        tabBarStyle: ((route) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? ""
          console.log(routeName)
          if (routeName === ROUTES.GAME_S1 || routeName === ROUTES.GAME_S2 ||
             routeName === ROUTES.GAME_S3 || routeName === ROUTES.GAME_S4 || 
             routeName === ROUTES.CONSULTATION || routeName === ROUTES.ImageDetail  ) {
            return { display: "none" }
          }
          return  styles.tabBarStyle
        })(route),
       // tabBarActiveTintColor: COLORS.primary,
        tabBarIcon: ({color, size, focused}) => {
          let iconName;

          if (route.name === ROUTES.HOME_TAB) {
            iconName = focused ? stage1 : stage1;
          } else if (route.name === ROUTES.WALLET) {
            iconName = focused ? stage2 : stage2;
          } else if (route.name === ROUTES.NOTIFICATIONS) {
            iconName = focused ? stage3 : stage3;
          } else if (route.name === ROUTES.SETTINGS_NAVIGATOR) {
            iconName = focused
              ? stage4
              : stage4;
          }
          // iconName='home'
          // return <Icon name={iconName} size={22} color={color} />;
          return <Image source={iconName} />
          
        },
      })}>
      <Tab.Screen
        name={ROUTES.HOME_TAB}
        component={GameNavigation}
        options={{
          tabBarButton: props => <CustomTabBarButton route="home" {...props} />,
          
        }}
        
      />
      <Tab.Screen
        name={ROUTES.WALLET}
        component={Wallet}
        options={{
          tabBarButton: props => <CustomTabBarButton {...props} />,
          
        }}
      />
      <Tab.Screen
        name={ROUTES.NOTIFICATIONS}
        component={Notifications}
        options={{
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.SETTINGS_NAVIGATOR}
        component={SettingsNavigator}
        options={{
          tabBarLabel: 'Settings',
          title: 'Settings',
          headerShown: false,
          tabBarButton: props => (
            <CustomTabBarButton route="settings" {...props} />
          ),
          // // headerRight: () => {
          // //   return (
          // //     <TouchableOpacity onPress={() => navigation.openDrawer()}>
          // //       <Icon
          // //         name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
          // //         size={30}
          // //         color={COLORS.dark}
          // //         style={{marginRight: 10}}
          // //       />
          // //     </TouchableOpacity>
          // //   );
          // },
        }}
      />
      
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {

    position: 'absolute',
   backgroundColor:  Platform.OS==='ios' && COLORS.transparent ,
   
    borderTopWidth: 0,
    bottom: Platform.OS==='ios' ? 0 : 0,
    right: Platform.OS==='ios' ? 10 : 0,
    left: Platform.OS==='ios' ? 10 : 0,
    height: Platform.OS==='ios' ?  92 : 60,
    borderRadius:20
  },
});