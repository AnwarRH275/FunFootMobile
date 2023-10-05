import {Platform, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import Background from '../../components/Background';
import Header from '../../components/Header';
import StartGame from '../../components/StartGame';
import Scores from '../../components/Scores';
import banner from '../../assets/Banner/5000.png';
import banner2 from '../../assets/Banner/5000C.png';
import path from '../../assets/game/background1.jpg'
import { ROUTES } from '../../constants';
import { useAuth } from '../../context/AuthProvider';

const Wallet = ({navigation}) => {

  const { scores, setScores } = useAuth();
  
  
  return (
    <Background path={path} >

      <Header  />
      {/* <Scores /> */}
    {scores >= 100 ? (
 <StartGame setStartGame = {ROUTES.GAME_S2} banner={banner2} type={"stage2"}  />
    ):( <StartGame setStartGame = {ROUTES.GAME_S2} banner={banner} type={"stage2"}  />)}
     
   
    
    </Background>
  );
};

export default Wallet;

const styles = StyleSheet.create({});