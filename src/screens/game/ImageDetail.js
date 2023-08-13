import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImageDetail = ({ route }) => {
  const { image } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: image.path }} style={styles.image} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageDetail;
