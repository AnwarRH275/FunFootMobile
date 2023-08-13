import { View, Text } from 'react-native'
import React from 'react'
import Grid from '../../components/Grid'
import Header from '../../components/Header'
import path from '../../assets/onboarding3.png'
import Background from '../../components/Background'

const Store = () => {
  return (
    <Background path={path}>
        <Header />
        <Grid />
    </Background>
  )
}

export default Store