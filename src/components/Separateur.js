import React from 'react';
import { View, StyleSheet } from 'react-native';

const Separator = () => {
  return (
    <View style={styles.separator}/>
  );
};

const styles = StyleSheet.create({
  separator: {
    borderBottomColor: '#000000',
    width:"80%",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
    alignSelf:'center'
  },
});

export default Separator;
