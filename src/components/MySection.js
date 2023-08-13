import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, TextInput, Animated, StyleSheet } from 'react-native';

function MySection() {
  const [isVisible, setIsVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(0))[0];
  const [parameter,setParameter] = useState('');
  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? 0 : 1,
      duration: 300,
    }).start();
    setIsVisible(!isVisible);
  };
  const slideInterpolation = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={slideUp}>
        <View style={styles.header}>
          <Text>Setting</Text>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.slideContainer, { transform: [{ translateY: slideInterpolation }] }]}>
        <View style={styles.formContainer}>
          <Text>Enter Parameter:</Text>
          <TextInput
            style={styles.input}
            placeholder="Parameter"
            onChangeText={(text) => setParameter(text)}
            value={parameter}
          />
        </View>
      </Animated.View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F8EF7',
  },
  slideContainer: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    padding: 20,
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    margin: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default MySection;
