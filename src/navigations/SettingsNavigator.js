import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Profile, Settings, SettingsDetail} from '../screens';
import {ROUTES} from '../constants';
import GameStage1 from '../screens/game/GameStage1';

const Stack = createStackNavigator();

function SettingsNavigator() {
  console.log(Stack);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        
      }}
      initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen name={ROUTES.SETTINGS} component={Settings} />
      <Stack.Screen name={ROUTES.SETTINGS_DETAIL} component={SettingsDetail} />
     
    </Stack.Navigator>
  );
}

export default SettingsNavigator;