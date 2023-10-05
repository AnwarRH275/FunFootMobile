import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';


const CopyTextButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handlePress = async () => {
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: '#5142E6',
          padding: 10,
          borderTopEndRadius:10,
          borderBottomEndRadius:10
        }}
        onPress={handlePress}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {copied ? 'Copied!' : 'Copy Coupon'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CopyTextButton;
