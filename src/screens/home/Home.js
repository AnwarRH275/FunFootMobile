import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {COLORS, ROUTES} from '../../constants';
import Background from '../../components/Background';
import Header from '../../components/Header';
import NavigationCat from '../../components/NavigationCat';
import StartGame from '../../components/StartGame';
import Scores from '../../components/Scores';
import GameStage1 from '../game/GameStage1';
import banner from '../../assets/Banner/500C.png'
import path from '../../assets/onboarding3.png'
import AsyncStorage from '@react-native-async-storage/async-storage';



const Home = ({navigation}) => {

 
  const [scores,setScores] = useState(0);

  return (
    <Background path={path}>

      <Header />
      {/* <Scores /> */}
    <ScrollView contentContainerStyle={{paddingBottom: 50}} >
      <StartGame setStartGame = {ROUTES.GAME_S1} banner={banner} type={"stage1"} />
      </ScrollView>
      {/* <BannerAdx
      unitId={adUnitId}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    /> */}

  
      <View style={styles.footer} ></View>
    </Background>
  );
};

export default Home;



const styles = StyleSheet.create({
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
  