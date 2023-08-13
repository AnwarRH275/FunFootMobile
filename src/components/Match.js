import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants';


const Match = ({number,equipe1,equipe2,resultat,onResultUpdate}) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handlerValidation = ()=>{
  
      console.log('vvvv')
    
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerRow}> 
        <View style={{width:130}}>
          <Text>1 - {equipe1}</Text>
          <Text>2 - {equipe2}</Text>  
        </View>
       
        <TouchableOpacity 
        style={
          [
            styles.button,
            {
            backgroundColor: selectedIndex===1 ? COLORS.primary : COLORS.gray
          },
          ]}
          onPress={() => {
            setSelectedIndex(1)
            onResultUpdate("1") 
          }}
        >
          <Text 
          style={[styles.buttonText,
            {color:  selectedIndex ===1 ? COLORS.gray : COLORS.dark,}
            ]}
          >1</Text>
        </TouchableOpacity>
        <TouchableOpacity 
         style= {
          [
            styles.button,
            {
            backgroundColor: selectedIndex===0 ? COLORS.primary : COLORS.gray
          },
          ]}
          onPress={() => {setSelectedIndex(0)
            onResultUpdate("X") 
          }}>
          <Text style={[styles.buttonText,
            {color:  selectedIndex ===0 ? COLORS.gray : COLORS.dark,}
            ]}>X</Text>
        </TouchableOpacity>
        <TouchableOpacity 
         style= {
          [
            styles.button,
            {
            backgroundColor: selectedIndex===2 ? COLORS.primary : COLORS.gray
          },
          ]}
          onPress={() => {
            setSelectedIndex(2)
            onResultUpdate("2") 
            
            
          }}>
          <Text style={[styles.buttonText,
            {color:  selectedIndex ===2 ? COLORS.gray : COLORS.dark,}
            ]}>2</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

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
    margin:5,
    marginTop:10,
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

export default Match;
