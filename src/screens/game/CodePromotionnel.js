import { View, Text, StyleSheet, TextInput, TouchableOpacityBase, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Background from '../../components/Background'
import Header from '../../components/Header'
import path from '../../assets/onboarding3.png'
import { COLORS, ROUTES } from '../../constants'
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../context/AuthProvider';
import axiosInstance from '../../config/instance';
import { useNavigation } from '@react-navigation/native';



const CodePromotionnel = () => {

  const [codeP,setCodeP] = useState('');

  const { scores, setScores,coupons,username,token } = useAuth();
  const navigation = useNavigation();


  const handleSubmit = async () =>{
    let authorisation = false;
    try{
      const response = await axiosInstance.post(`userCoupons/verifierCoupons`, {
          
        "username": username,
        "coupons": codeP,
      
       
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.data.username != null){
        authorisation = true;
      }
    } catch (error) {
      console.error(error);
    }
    
    if(coupons !== codeP && codeP.length == 6 && authorisation){
      console.log(token,username,codeP)
      try{
        const response = await axiosInstance.put(`Coupons/addcoupons`, {
          
          "username": username,
          "coupons": codeP,
        
         
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
       
        if(response.data.coupons){
          
          setScores(scores+response.data.nombre_de_pieces);
          console.log(scores)
          Alert.alert(`Félicitations vous avez gagné ${response.data.nombre_de_pieces} pièces !`);
         navigation.navigate(ROUTES.HOME);
        }else{
          alert('Coupons Invalid !!')
        }
      } catch (error) {
        console.error(error);
      }

    }else{
      Alert.alert('Coupons Invalid !!');
    }

    if(codeP.length == 7 && authorisation){
      
      try{
        const response = await axiosInstance.put(`Coupons/addcoupons`, {
          
          "username": username,
          "coupons": codeP,
        
         
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
       
        if(response.data.coupons){
          
          setScores(scores+response.data.nombre_de_pieces);
          console.log(scores)
          Alert.alert(`Félicitations vous avez gagné ${response.data.nombre_de_pieces} pièces !`);
         navigation.navigate(ROUTES.HOME);
        }else{
          alert('Coupons Invalid !!')
        }
      } catch (error) {
        console.error(error);
      }
      try{
        const response = await axiosInstance.put(`Affiliation/CodeAffiliation`, {
          
          "code_affiliation": codeP
         
        
         
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }else{
      Alert.alert('Coupons Invalid !!');
    }
    
  }
  return (
    <Background path={path}>
    <Header />
    
    <View style={styles.containerd}>
        <Text style={styles.text}>Gagnez des pièces en entrant le code promotionnel ou partagez votre code d'affiliation pour gagner 10 pièces chacun.  ✌🏻 🥂 </Text>
    </View>

    <View style = {styles.container}>
      <View style={styles.inputContainer}>
               
            <Icon name="pricetag" size={25} color="#1D3557" style={styles.inputIcon} />
             
              <TextInput
                style={styles.inputT}
                placeholder="Veuillez entrer le code d'affiliation"
                onChangeText={text => {setCodeP(text)}}
                 value={codeP}
                autoCapitalize="none"
                returnKeyType="done"
                
              />
            </View> 

            <TouchableOpacity
                   onPress={handleSubmit}
                  activeOpacity={0.7}
                  style={styles.loginBtnWrapper}
                  >
                   <Text 
                  style={styles.loginText}
                  >Valider le code</Text> 
            </TouchableOpacity>
    </View>

  </Background>
  )
}

export default CodePromotionnel;



const styles = StyleSheet.create({
   
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
      height: 155,
     
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
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F1FAEE',
      borderRadius: 10,
      marginVertical:5,
  
      padding: 2,
    },
    inputIcon: {
      padding: 10,
    },
    inputT: {
      flex: 1,
      fontSize: 18,
      // paddingLeft: 10,
    },
    loginBtnWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      gap: 10,
      position: 'relative',
      top:10,
      height: 47,
      backgroundColor: COLORS.primary,
      shadowColor: COLORS.white,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 20,
      borderRadius: 10,
    },
    loginText: {
   
      height: 27,
      
      fontWeight: '600',
      fontSize: 20,
      lineHeight: 27,
      color: '#F1FAEE',
      
    },
    container: {
      flex: 1,
      alignItems: 'center',
      margin: 20,
    },
    

  })