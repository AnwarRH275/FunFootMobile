import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Background from '../../components/Background'
import Header from '../../components/Header'
import path from '../../assets/onboarding3.png'
import { COLORS } from '../../constants'
import { WebView } from 'react-native-webview';


const Aide = () => {
  return (
    <Background path={path}>
      <Header />
      
      <View style={styles.containerd}>
      <WebView
        source={{ uri: 'http://fun-foot.com/files/aide.html' }}
        style={{ flex: 1 }}
      />
      </View>
    </Background>
  )
}

export default Aide;


const styles = StyleSheet.create({
   
  
    containerd: {
      flexDirection:'row',
      justifyContent:'center',
  
      alignSelf:'center',
      padding: 5,
     
      marginVertical:30,
      width: 370,
      height: 650,
     
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderColor: '#D1D1D6',
      borderRadius: 15,
    },
   
  })