import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../screens';
import {ROUTES} from '../constants';
import GameStage1 from '../screens/game/GameStage1';
import GameStage2 from '../screens/game/GameStage2';
import GameStage3 from '../screens/game/GameStage3';
import GameStage4 from '../screens/game/GameStage4';
import ConsulterMesGrilles from '../screens/game/ConsulterMesGrilles';
import ImageDetail from '../screens/game/ImageDetail';
import RewardedAdmob from '../components/RewardedAdmob';
import InterstitialAdmob from '../components/InterstitialAdmob';
import RewardedAdmob2 from '../components/RewardedAdmob2';
import InterstitialAdmob2 from '../components/InterstitialAdmob2';

const Stack = createStackNavigator();

function GameNavigation() {

  return (
    <Stack.Navigator
      initialRouteName={ROUTES.HOME}>
      <Stack.Screen
        options={{
            headerShown: false,
        }}
        name={ROUTES.HOME} component={Home} 
        
      />
      
      <Stack.Screen
        options={{ tabBarStyle: { display: "none" }, title: "Partie Bronze", }}
        name={ROUTES.GAME_S1} component={GameStage1} />
     
      
     <Stack.Screen
      options={{ tabBarStyle: { display: "none" }, title: "Partie Silver", }}
      name={ROUTES.GAME_S2} component={GameStage2} />
   
      <Stack.Screen
      options={{ tabBarStyle: { display: "none" },title: "Partie Gold", }}
      name={ROUTES.GAME_S3} component={GameStage3} />
    
      <Stack.Screen
          options={{ tabBarStyle: { display: "none" }, title: "Partie Diamant", }}
          name={ROUTES.GAME_S4} component={GameStage4} />

<Stack.Screen
          options={{ tabBarStyle: { display: "none" }, title:null }}
          name={ROUTES.IADMOB} component={InterstitialAdmob} />

    <Stack.Screen
          options={{ tabBarStyle: { display: "none" }, title:null }}
          name={ROUTES.RADMOB} component={RewardedAdmob} />

<Stack.Screen
          options={{ tabBarStyle: { display: "none" }, title:null }}
          name={ROUTES.IADMOB2} component={InterstitialAdmob2} />

    <Stack.Screen
          options={{ tabBarStyle: { display: "none" }, title:null }}
          name={ROUTES.RADMOB2} component={RewardedAdmob2} />

      <Stack.Screen
        options={{ tabBarStyle: { display: "none" }, title: null }}
        name={ROUTES.CONSULTATION} component={ConsulterMesGrilles} />
        <Stack.Screen
        options={{ tabBarStyle: { display: "none" }, title: null }}
        name={ROUTES.ImageDetail} component={ImageDetail} />

  </Stack.Navigator>
  );
}

export default GameNavigation;