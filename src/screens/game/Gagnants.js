import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react';
import Background from '../../components/Background';
import Header from '../../components/Header';
import path from '../../assets/onboarding3.png';
import { COLORS } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import BannerTitle from '../../components/BannerTitle';
import axiosInstance from '../../config/instance';

const Gagnants = () => {
  const navigation = useNavigation();
  const [images, setImages] = useState([]);

  useEffect(()=>{

    fetchData();
    
  },[])

  const fetchData = async () =>{
    const response =  await axiosInstance.get(`uploadImage/uploadImage_all`);
    console.log(response.data+'ddddd')
    setImages(response.data);
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ImageDetail', { image: item })}>
      <Image source={{ uri: item.path  }} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <Background path={path}>
    <Header />

    <BannerTitle title="Liste des Gagnants FUN FOOT" />

    
    <View style={styles.containerImage}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  </Background>
  )
}

export default Gagnants




const styles = StyleSheet.create({
  containerImage: {
    flex: 1,
   // backgroundColor: '#fff',
   backgroundColor: 'rgba(255, 255, 255, 0.2)',

   justifyContent:'center',
   alignItems:'center'
  },
  contentContainer: {
    paddingVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius:10,
  },
    row:{
      //flex:1,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      
      
    },
    containerd: {
      flexDirection:'row',
      justifyContent:'center',
  
      alignSelf:'center',
      padding: 18,
     
      marginVertical:30,
      width: 336,
      height: 125,
     
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderColor: '#D1D1D6',
      borderRadius: 15,
    },
    container:{
      backgroundColor:COLORS.white,
      padding: 10,
      borderTopStartRadius:10,
      borderBottomStartRadius:10,
      borderColor:COLORS.dark,
      borderWidth: 1,
    },
    text:{
     textAlign:'center',
      fontWeight: '600',
      fontSize: 17,
      lineHeight: 22,
      letterSpacing: -0.32,
      color: '#000000',
    }
  })