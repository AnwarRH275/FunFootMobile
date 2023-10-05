import {Platform, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import {COLORS, ROUTES} from '../../constants';
import Background from '../../components/Background';
import Header from '../../components/Header';
import NavigationCat from '../../components/NavigationCat';
import StartGame from '../../components/StartGame';
import Scores from '../../components/Scores';
import GameStage1 from '../game/GameStage1';
import banner from '../../assets/Banner/1000000.png'
import banner2 from '../../assets/Banner/1000000C.png'
import path from '../../assets/game/background3.jpg'
import { useAuth } from '../../context/AuthProvider';
const Settings = ({navigation}) => {

  const { scores, setScores } = useAuth();
  
  return (
    <Background path={path}>

      <Header  />
      {/* <Scores /> */}
      {scores >= 1000 ? (
 <StartGame setStartGame = {ROUTES.GAME_S4} banner={banner2}  type={"stage4"}  />
    ):( <StartGame setStartGame = {ROUTES.GAME_S4} banner={banner} type={"stage4"}  />)}
     
   
    
    </Background>
  );
};

export default Settings;

const styles = StyleSheet.create({});