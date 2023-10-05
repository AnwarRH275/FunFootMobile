
import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BottomTabBar} from '@react-navigation/bottom-tabs';
import {COLORS} from '../constants';

const CustomTabBar = props => {
  
  return (
    <View>
      <View style={styles.tabBar} />
      <BottomTabBar {...props} />
      
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    right: 10,
    left: 10,
    bottom: Platform.OS == 'ios' ? 0: 38,
    height: 20,
   // backgroundColor: COLORS.white,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
   // elevation: 3,
  },

  footer:{
    position:'absolute',
    width:Platform.OS==='ios' ?"94.5%" : "100%",
    backgroundColor:COLORS.white,
    bottom: Platform.OS==='ios' ?  30:0,
    height:Platform.OS==='ios' ?10:40,
    borderRadius:20,
    right: Platform.OS==='ios' ? 10 : 0,
    left: Platform.OS==='ios' ? 10 : 0,
  
    
    
  }
  
});