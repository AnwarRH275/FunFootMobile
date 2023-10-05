import { View, ImageBackground } from 'react-native'
import React from 'react'

const Background = ({children,path}) => {
  return (
    <View>
      <ImageBackground source={path}
        style={{height:'100%',width:'100%'}}
      >
             {children}
      </ImageBackground>
    </View>
  )
}

export default Background;