
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {COLORS, IMGS} from '../constants';
import logoFB from '../assets/logo/Facebook.png';
import logoApple from '../assets/logo/youtube.png';
import logoInsta from '../assets/logo/Instagram.png';


const {width} = Dimensions.get('screen');

const CustomDrawer = props => {
  return (
    <DrawerContentScrollView {...props}>
      <ImageBackground source={IMGS.bgPattern} style={{height: 140}}>
        <Image source={IMGS.user} style={styles.userImg} />
      </ImageBackground>
      <View style={styles.drawerListWrapper}>
        <DrawerItemList {...props} />
      </View>
      <View style={styles.containerMedia}>
              <TouchableOpacity style={styles.mediabtn} onPress={() => {Linking.openURL('https://web.facebook.com/profile.php?id=100091414601079');}}>
              <Image
                  style={styles.image}
                  source={logoFB}
              />

              </TouchableOpacity>
              <TouchableOpacity  style={styles.mediabtn} onPress={() => {Linking.openURL('https://instagram.com/funfootworld');}}>
              <Image
                  style={styles.image}
                  source={logoInsta}
              />
              </TouchableOpacity>
              <TouchableOpacity  style={styles.mediabtn} onPress={() => {Linking.openURL('https://www.youtube.com/@FunFoot-fc6xs/featured');}}>
              <Image
                  style={styles.image}
                  source={logoApple}
              />
              </TouchableOpacity>
            </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  userImg: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    position: 'absolute',
    left: width / 2 - 130,
    bottom: -130 / 2,
    borderWidth: 4,
    backgroundColor:COLORS.primary,
     borderColor: COLORS.white,
  },
  drawerListWrapper: {
    marginTop: 65,
  },
  mediabtn:{
    alignItems: 'center',
    justifyContent: 'center',
    width: 68,
    height: 55,
    marginHorizontal:10,
    //top:150,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  containerMedia:{
    margin:20,
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  image:{
    transform: [{scale: 0.7}],
  },
  

});