import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {COLORS, ROUTES} from '../constants';
import {Wallet, Notifications} from '../screens';
import BottomTabNavigator from './BottomTabNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomDrawer from '../components/CustomDrawer';
import Historique from '../screens/game/Historique';
import Store from '../screens/game/Store';
import Affiliation from '../screens/game/Affiliation';
import CodePromotionnel from '../screens/game/CodePromotionnel';
import Gagnants from '../screens/game/Gagnants';
import Aide from '../screens/game/Aide';
import Conditions from '../screens/game/Conditions';
import Politique from '../screens/game/Politique';
import Erreur from '../screens/game/Erreur';
import { Text, View } from 'react-native';


const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: COLORS.primary,
        drawerActiveTintColor: COLORS.white,
        drawerLabelStyle: {
          marginLeft: -20,
        },
      }}>
      <Drawer.Screen
        name={ROUTES.HOME_DRAWER}
        component={BottomTabNavigator}
        options={{
          title: 'Home',
          drawerIcon: ({focused, color, size}) => (
            <Icon name="home-sharp" size={18} color={color} />
          ),
          
        }}
      />

      <Drawer.Screen
        name={ROUTES.HISTORIQUE_DRAWER}
        component={Historique}
        options={{
          title: 'Mes grilles',
          drawerIcon: ({focused, color, size}) => (
            <Icon name="grid" size={18} color={color} />
          ),
        }}
      />

      {/* <Drawer.Screen
        name={ROUTES.STORE}
        component={Store}
        options={{
          title: 'Store',
          drawerIcon: ({focused, color, size}) => (
            <Icon name="cart" size={18} color={color} />
          ),
        }}
      />
       */}

    <Drawer.Screen
        name={ROUTES.AFFILIATION}
        component={Affiliation}
        options={{
          title: 'Affiliation',
          drawerIcon: ({focused, color, size}) => (
            <Icon name="ribbon" size={18} color={color} />
          ),
        }}
      />


    <Drawer.Screen
            name={ROUTES.CODEPROMOTS}
            component={CodePromotionnel}
            options={{
              title: 'Code promotionnel',
              drawerIcon: ({focused, color, size}) => (
                <Icon name="md-card" size={18} color={color} />
              ),
            }}
          />

    <Drawer.Screen
            name={ROUTES.GAGNANTS}
            component={Gagnants}
            options={{
              title: 'Gagnants',
              drawerIcon: ({focused, color, size}) => (
                <Icon name="md-trophy" size={18} color={color} />
              ),
            }}
          />


      <Drawer.Screen
                  name={ROUTES.AIDE}
                  component={Aide}
                  options={{
                    title: 'Challenge',
                    drawerIcon: ({focused, color, size}) => (
                      <Icon name="md-help-circle" size={18} color={color} />
                    ),
                  }}
                />

      <Drawer.Screen
                  name={ROUTES.CONDITIONS}
                  component={Conditions}
                  options={{
                    title: 'Conditions d\'utilisation',
                    drawerIcon: ({focused, color, size}) => (
                      <Icon name="md-document" size={18} color={color} />
                    ),
                  }}
                />

            {/* <Drawer.Screen
                  name={ROUTES.POLITIQUE}
                  component={Politique}
                  options={{
                    title: 'Politique de confidentialité',
                    drawerIcon: ({focused, color, size}) => (
                      <Icon name="md-key" size={18} color={color} />
                    ),
                  }}
                /> */}

            <Drawer.Screen
                  name={ROUTES.ERREUR}
                  component={Erreur}
                  options={{
                    title: 'Envoyer un rapport d\'erreur',
                    drawerIcon: ({focused, color, size}) => (
                      <Icon name="md-warning" size={18} color={color} />
                      
                    ),
                  }}
                />


    </Drawer.Navigator>
  );
}

export default DrawerNavigator;