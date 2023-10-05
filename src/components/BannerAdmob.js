import { View} from 'react-native'
import React from 'react'
import { BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';



const adUnitId = __DEV__ ? TestIds.BANNER :  'ca-app-pub-6300362813805470/2341143834';

const BannerAdmob = () => {
  return (
    <View>
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.FULL_BANNER}
    
    />
    </View>
  )
}

export default BannerAdmob