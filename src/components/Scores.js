import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import React from 'react'
import { COLORS } from '../constants';
import ticket from '../assets/game/golden-ticket.png'
import coin from '../assets/game/coin.png'
const Scores = ({scores}) => {
  return (
    <View style={styles.row}>
        {/* <View style={styles.container}>
            <Image source = {ticket}  style={{width:50 , height:40 , left:7}} /> 
            <Text style={{color:COLORS.white, right:5,fontSize:35}}> 50</Text>
        </View> */}
        <View style={styles.container}  >
        <Image source = {coin} style={{width:28 , height:28, left:7 }} /> 
        <Text style={{color:COLORS.white, right:5,fontSize:25,fontWeight:"600"}}> {scores}</Text>
        </View>
       
    </View>
   
  )
}

export default Scores;


const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        top:Platform.OS === 'android' ? 0:0,
    },
        container: {
      
        flexDirection:'row',
        marginHorizontal:35,
        marginVertical:5,
        padding: 2,
        width: 108,
        height: 46,
        backgroundColor: COLORS.primary,//'rgba(3, 3, 3, 0.8)',
        borderRadius: 10,
        
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        
      //backgroundColor: '#FFFFFF',
    },
    
});
