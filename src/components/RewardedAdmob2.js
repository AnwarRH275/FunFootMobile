import { View, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../constants';
import ads4 from '../assets/ads/ad4.png';

const adUnitId = Platform.OS == 'ios' ? 'ca-app-pub-6300362813805470~6771777236' : 'ca-app-pub-6300362813805470~3620870563';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});




const RewardedAdmob2 = () => {
    const [loaded, setLoaded] = useState(false);
    const navigation = useNavigation();


    useEffect(() => {
      const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
        setLoaded(true);
        rewarded.show();
        navigation.navigate(ROUTES.HOME);
      });
      const unsubscribeEarned = rewarded.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        reward => {
          console.log('User earned reward of ', reward);
        },
      );
  
      // Start loading the rewarded ad straight away
      rewarded.load();
  
      // Unsubscribe from events on unmount
      return () => {
        unsubscribeLoaded();
        unsubscribeEarned();
      };
    }, []);
  
    // No advert ready to show yet
    if (!loaded) {
      return null;
    }
  


  return (
    <View style={styles.container}>
    <Image style={styles.image} source={ads4} />
  </View>
  )
}

export default RewardedAdmob2;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    
  });