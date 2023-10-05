import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../constants';

const Switch2 = ({typeGame,resultat,setSelectSection}) => {
    const [selectedIndex, setSelectedIndex] = useState(true);

  return (
    <View style={styles.containerSwitch}>
    <TouchableOpacity style={
    [
      styles.button,
      {
      backgroundColor: selectedIndex ? COLORS.red : COLORS.gray
    },
    ]}
   
    >
    <Text style={[styles.text,
    {color:  selectedIndex ? COLORS.gray : COLORS.dark,}
    ]}>N° {typeGame}</Text>
  </TouchableOpacity>
  
  </View>      

  )
}

export default Switch2;
const styles = StyleSheet.create({
    containerSwitch:{
        width: 340,
        height: 60,
        backgroundColor: '#F2F8FF',
        borderRadius: 20,
        flexDirection:'row',
        justifyContent:'center',
        marginVertical:10,
       
      },
      button: {
        marginVertical:10,
        marginHorizontal:5,
        width: 151,
        height: 38,
       // margin:10,
        justifyContent:'center',
        backgroundColor: '#FF793F',
        borderRadius: 20,
      },
      text: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight:'bold'
        //padding: 12,
       // color: 'white'
      },
});