import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import path from '../../assets/onboarding3.png'
import Background from '../../components/Background'
import Header from '../../components/Header'
import LogoDollar from '../../assets/game/LogoDollar.png'
import CopyTextButton from '../../components/CopyTextButton'
import { COLORS } from '../../constants'
import { useAuth } from '../../context/AuthProvider';

const Affiliation = () => {
  const {coupons} = useAuth();

  return (
    <Background path={path}>
      <Header />
      <View style={styles.logoDollar}>
        <Image source={LogoDollar} />
      </View>
      <View style={styles.row}>
        <View style={styles.container}>
          <Text>{coupons}</Text>
        </View>
        <CopyTextButton text={coupons}/>

        
      </View>
      <View style={styles.containerd}>
          <Text style={styles.text}>Gagnez 10 pièces d'or pour chaque ami parrainé ! 
</Text>
          {/* <Text style={styles.text}>En partageant ce code avec vos amis, vous pourrez gagner des points.</Text> */}
          {/* <Text style={styles.text}>En partageant ce code avec vos amis, vous pourrez gagner des points.</Text> */}
      </View>
    </Background>
  )
}

export default Affiliation;

const styles = StyleSheet.create({
  logoDollar:{
    justifyContent:'center',
    alignItems:'center',
    marginVertical:30
  },
  row:{
    //flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    
    
  },
  containerd: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    padding: 18,
   
    marginVertical:30,
    width: 336,
    height: 125,
   
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D1D6',
    borderRadius: 15,
  },
  container:{
    flexDirection:'row',
    backgroundColor:COLORS.white,
    padding: 10,
    borderTopStartRadius:10,
    borderBottomStartRadius:10,
    borderColor:COLORS.dark,
    borderWidth: 1,
  },
  text:{
   textAlign:'center',
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 22,
    marginHorizontal:5,
    //letterSpacing: -0.32,
    color: '#000000',
  }
})