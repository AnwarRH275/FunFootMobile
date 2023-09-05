import { View, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../constants';
import ads2 from '../assets/ads/ad2.png';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-6300362813805470/3929557676';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});




const RewardedAdmob = () => {
    const [loaded, setLoaded] = useState(false);
    const navigation = useNavigation();


    useEffect(() => {
      const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
        setLoaded(true);
        rewarded.show();
        
      });
      const unsubscribeEarned = rewarded.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        reward => {
          console.log('User earned reward of ', reward);
          navigation.navigate(ROUTES.IADMOB2);
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
      <Image style={styles.image} source={ads2} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
});
export default RewardedAdmob