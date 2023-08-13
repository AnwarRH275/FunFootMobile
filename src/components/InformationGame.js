import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import React from 'react'
import { COLORS } from '../constants';
import ticket from '../assets/game/golden-ticket.png'
import coin from '../assets/game/coin.png'
const InformationGame = ({text,size}) => {


  return (
    <View style={styles.row}>
      <View style={{ ...styles.container, height: size }}>
        {/* <Image source={coin} style={{ width: 28, height: 28, left: 7 }} /> */}
        <Text style={{ ...styles.text, textAlign: 'center' }}>{text}</Text>
        {/* <Image source={coin} style={{ width: 28, height: 28, right: 7, left: 5 }} /> */}
      </View>
    </View>
  );
  

}



export default InformationGame;

const styles = StyleSheet.create({
  row: {
    position: 'relative',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    marginTop: 5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 3,
  },
  text: {
    color: COLORS.white,
    fontSize: 23,
    fontWeight: '600',
    marginHorizontal: 10,
    flexWrap: 'wrap',
  },
});
