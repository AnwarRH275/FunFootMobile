import { View, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../constants';
import ads1 from '../assets/ads/ad1.png';



const adUnitId = Platform.OS == 'ios' ? 'ca-app-pub-6300362813805470~6771777236' : 'ca-app-pub-6300362813805470~3620870563';



const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });
  
const InterstitialAdmob = () => {


    const [loaded, setLoaded] = useState(false);
    const navigation = useNavigation();


  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
      interstitial.show();
      navigation.navigate(ROUTES.RADMOB);
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
    <Image style={styles.image} source={ads1} />
  </View>
  )
}

export default InterstitialAdmob

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
});



