import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Separator({label}) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.label}>{label}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    flex: 1,
    
    height: 3,
    backgroundColor: '#fff',
  },
  label: {
    paddingHorizontal: 10,
    fontSize: 18,
    color: '#fff',
  },
});

export default Separator;
