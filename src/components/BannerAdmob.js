import { View, Text, Platform } from 'react-native'
import React from 'react'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';



const adUnitId = Platform.OS == 'ios' ? 'ca-app-pub-6300362813805470~6771777236':'ca-app-pub-6300362813805470~3620870563';

const BannerAdmob = () => {
  return (
    <View>
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
    </View>
  )
}

export default BannerAdmob