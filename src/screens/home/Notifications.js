import {Platform, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import {COLORS, ROUTES} from '../../constants';
import Background from '../../components/Background';
import Header from '../../components/Header';
import NavigationCat from '../../components/NavigationCat';
import StartGame from '../../components/StartGame';
import Scores from '../../components/Scores';
import GameStage1 from '../game/GameStage1';
import banner from '../../assets/Banner/100000.png'
import banner2 from '../../assets/Banner/100000C.png'
import path from '../../assets/game/background5.jpg'
import { useAuth } from '../../context/AuthProvider';
const Notifications = ({navigation}) => {

  const { scores, setScores } = useAuth();
  
  return (
    <Background path={path}>

      <Header  />
      {/* <Scores /> */}
   
      {scores >= 150 ? (
 <StartGame setStartGame = {ROUTES.GAME_S3} banner={banner2} type={"stage3"} />
    ):( <StartGame setStartGame = {ROUTES.GAME_S3} banner={banner} type={"stage3"} />)}
     
    
    </Background>
  );
};

export default Notifications;

const styles = StyleSheet.create({});