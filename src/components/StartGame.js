import { View, Text, StyleSheet, Image ,Platform, Dimensions, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import NavigationCat from './NavigationCat';
import { COLORS, ROUTES } from '../constants';
import InformationGame from './InformationGame';
import { useAuth } from '../context/AuthProvider';
import condition100 from '../assets/game/100.jpg';
import condition150 from '../assets/game/150.jpg';
import condition1000 from '../assets/game/1000.jpg';
import BannerAdmob from './BannerAdmob';
import axiosInstance from '../config/instance'


const StartGame = ({setStartGame,banner,type}) => {

  const { scores, setScores,username,tel,descriptionGame2,setDesciptionGame2 } = useAuth();
  const [descriptionGame,setDesciptionGame] = useState('');
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const isTablet = windowWidth >= 600 && windowHeight >= 600;
  const imageStyle = isTablet ?  styles.imageT : styles.image;
  useEffect( ()=>{
    
  const fetchdata  = async ()=>{

    try{
      
      const response = await axiosInstance.get('/Gagnants/ListDesGagnants');
      
      response.data.map(item => {
      
       
        if(item['username']==username){
         
         if(item['etat'].split(' ')[2] == '100'){
          Alert.alert('Félicitation vous avez gagner 100 000');
         }else{
          if(item['etat'].split(' ')[2] == '5'){
            Alert.alert('Félicitation vous avez gagner 5 000');
          }else{
            if(item['etat'].split(' ')[2] == '10'){
              Alert.alert('Félicitation vous avez gagner 10 000');
            }else{
              Alert.alert('Félicitation vous avez gagner '+item['etat'].split(' ')[2])
            }
          }
          
         }
        }

        
      })
    
    } catch (error) {
      //  console.error(error);
      
    }
   
    if(tel == null || tel == ""){ 
      setDesciptionGame2('Compléter votre profil  pour\n bénéficier de vos gains !')
    }else{
      setDesciptionGame2('');
    }
  }
  fetchdata();
    

  },[descriptionGame2])

  return (
    
    <View style={{flexDirection:'column',justifyContent:'center'}}>
   
      <View style={styles.container}>
           <BannerAdmob />

      {descriptionGame != '' && <InformationGame text={descriptionGame} size={50}/>  } 
    {type == 'stage1' && (
          <View style={{width:"80%"}}> 
          <Image style={imageStyle} source={banner} />
          {descriptionGame2 != '' && <InformationGame text={descriptionGame2} size={70}/>  } 
       </View>
    )}
          
         
          {type != 'stage1' && (
          <View style={{width:"80%"}}> 
          <Image style={imageStyle} source={banner} />
          {descriptionGame2 != '' && <InformationGame text={descriptionGame2} size={70}/>  } 
       </View>
    )}
        
      </View>
      
      {setStartGame == ROUTES.GAME_S1 && setStartGame != ROUTES.GAME_S2 &&
      setStartGame != ROUTES.GAME_S3 && setStartGame != ROUTES.GAME_S4 && (
      <View>
          {/**/}
      
          <NavigationCat setStartGame={setStartGame} />
          <View style={{position:"relative",resizeMode: 'cover',justifyContent:'center',alignSelf:'center',marginVertical:20}}>
           
           </View>
      </View>
      )}

{setStartGame != ROUTES.GAME_S1 && setStartGame == ROUTES.GAME_S2 &&
      setStartGame != ROUTES.GAME_S3 && setStartGame != ROUTES.GAME_S4 && scores >= 100 && (
      <View>
          {/* <InformationGame text={descriptionGame}/> */}
          
          <NavigationCat setStartGame={setStartGame} />
          <View style={{flex:1,position:"relative",justifyContent:'center',alignSelf:'center',marginVertical:10}}>
            <BannerAdmob />
           </View>
      </View>
      )}

{setStartGame != ROUTES.GAME_S1 && setStartGame == ROUTES.GAME_S2 &&
      setStartGame != ROUTES.GAME_S3 && setStartGame != ROUTES.GAME_S4 && scores <= 100 && (
      <View style={styles.content}>
         <Image style={styles.imageC} source={condition100} />
        <View style={{flex:1,position:"relative",justifyContent:'center',alignSelf:'center',marginVertical:10}}>
            <BannerAdmob />
           </View>
         
      </View>
      )}
     


     {setStartGame != ROUTES.GAME_S1 && setStartGame != ROUTES.GAME_S2 &&
      setStartGame == ROUTES.GAME_S3 && setStartGame != ROUTES.GAME_S4 && scores >= 150 && (
      <View>
          {/* <InformationGame text={descriptionGame}/> */}
          
          <NavigationCat setStartGame={setStartGame} />
          <View style={{flex:1,position:"relative",
          top:10,
           resizeMode: 'cover',
           justifyContent:'center',alignSelf:'center',
          marginVertical:10}}>
            <BannerAdmob />
           </View>
      </View>
      )}


{setStartGame != ROUTES.GAME_S1 && setStartGame != ROUTES.GAME_S2 &&
      setStartGame == ROUTES.GAME_S3 && setStartGame != ROUTES.GAME_S4 && scores <= 150 && (
      <View style={styles.content}>
        <Image style={styles.imageC} source={condition150} />
         <View style={{flex:1,position:"relative",
         justifyContent:'center',alignSelf:'center',
        top:10,
          resizeMode: 'cover',
         marginVertical:10}}>
            <BannerAdmob />
           </View>
          
      </View>
      )}

{setStartGame != ROUTES.GAME_S1 && setStartGame != ROUTES.GAME_S2 &&
      setStartGame != ROUTES.GAME_S3 && setStartGame == ROUTES.GAME_S4 && scores >= 1000 && (
      <View>
          {/* <InformationGame text={descriptionGame}/> */}
          
          <NavigationCat setStartGame={setStartGame} />
          <View style={{flex:1,position:"relative",marginVertical:10}}>
            <BannerAdmob />
           </View>
      </View>
      )}

{setStartGame != ROUTES.GAME_S1 && setStartGame != ROUTES.GAME_S2 &&
      setStartGame != ROUTES.GAME_S3 && setStartGame == ROUTES.GAME_S4 && scores < 1000 && (
      <View style={styles.content}>
         <Image style={styles.imageC} source={condition1000} />
         <View style={{flex:1,position:"relative",
         top:10,
         resizeMode: 'cover',
         marginVertical:10}}>
            <BannerAdmob />
           </View>
         
      </View>
      )}
      

        

 


      </View>
  )
}

export default StartGame;

const styles = StyleSheet.create({
  content:{
    position:'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:350,
   
    //marginTop:60
  },
    container: {
    //  flex:1,
      width:"100%",
    //  height: 94,
      alignItems:"center",
    //  marginBottom:"10%"
      //backgroundColor: '#FFFFFF',
    },
    imageC:{
      // flex:1,
      top:10,
       width:"100%",
       height:'52%',
      resizeMode: 'cover',
    },
    imageT:{
      position:'relative',
      marginTop: 30,  
      transform: [{ scale: 0.6 }],
      width:"100%",
      height:320,
      //height:"50%",
    // resizeMode: 'cover',
      
      //  height:"20%",
      
      borderColor: COLORS.primary,
      shadowColor: COLORS.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.8,
      shadowRadius: 3,
    // elevation: 5,
        
    },
    image:{
      position:'relative',
      marginTop: "20%",  
      width:"100%",
      zIndex: 1, 
     
      //  height:"20%",
      
      borderColor: COLORS.primary,
      shadowColor: COLORS.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.8,
      shadowRadius: 3,
    // elevation: 5,
        
    },
    containerbtn:{
      //  flex:1,
        marginBottom:150,
        bottom:Platform.OS === 'android' ? 80:0,
        width: 283,
        height: 50,
        backgroundColor: COLORS.red,
        borderRadius: 56,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        // elevation: 3,
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 35,
      },
      footer:{
          position:'absolute',
          width:Platform.OS==='ios' ?"94.5%" : "100%",
          backgroundColor:COLORS.white,
          bottom: Platform.OS==='ios' ?  0:0,
          height:Platform.OS==='ios' ?10:40,
          borderRadius:20,
          right: Platform.OS==='ios' ? 10 : 0,
          left: Platform.OS==='ios' ? 10 : 0,

          
          
      }
  });
  