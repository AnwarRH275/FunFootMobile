import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS } from '../../constants';


const MatchsGriser = ({number,equipe1,equipe2,resultat}) => {
    const [selectedIndex, setSelectedIndex] = useState("-1");

  return (
    <View key={number} style={styles.container}>
            <View style={styles.containerRow}> 
            <View style={{width:130}}>
                <Text>1 - {equipe1}</Text>
                <Text>2 - {equipe2}</Text>  
            </View>
            
            <View 
            style={
                [
                styles.button,
                {
                backgroundColor: resultat==="1" ? COLORS.primary : COLORS.gray
                },
                ]}
               
            >
                <Text 
                style={[styles.buttonText,
                {color:  resultat ==="1" ? COLORS.gray : COLORS.dark,}
                ]}
                >1</Text>
            </View>
            <View 
            style= {
                [
                styles.button,
                {
                backgroundColor: resultat==="X" ? COLORS.primary : COLORS.gray
                },
                ]}
               >
                <Text style={[styles.buttonText,
                {color:  resultat === 'X' ? COLORS.gray : COLORS.dark,}
                ]}>X</Text>
            </View>
            <View 
            style= {
                [
                styles.button,
                {
                backgroundColor: resultat==="2" ? COLORS.primary : COLORS.gray
                },
                ]}
              >
                <Text style={[styles.buttonText,
                {color:  resultat ==="2" ? COLORS.gray : COLORS.dark,}
                ]}>2</Text>
            </View>

            </View>
        </View>
  )
}

export default MatchsGriser;



const styles = StyleSheet.create({
    container: {
    width:330,// width:'100%',
      height:60,
      backgroundColor: '#FFFFFF',
      shadowColor: 'rgba(154, 154, 154, 0.25)',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 10,
      borderRadius: 10,
      marginVertical:5,
     // marginHorizontal:5   
  
      
      
    },
    containerRow:{
      flexDirection: 'row',
      //justifyContent: 'space-around',
      // marginHorizontal:10,
     // marginVertical:10,
     marginLeft:5,
      alignItems: 'center',
    },
    button: {
      position:'relative',
      width: '15%',
      height: 40,
      margin:10,
      right:10,
      borderColor:'black',
      backgroundColor: '#F3F4F5',
      borderRadius: 7,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    buttonText: {
      fontSize: 18,
      color: 'black',
      textAlign: 'center',
      fontWeight:'600'
    }
  });
