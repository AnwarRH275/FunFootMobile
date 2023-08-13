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



const Erreur = () => {

  const [email,setEmail] = useState('');
  const [message,setMessage] = useState('');
  const [etat,setEtat] = useState('En cours');
  const { username,token } = useAuth();
  const navigation = useNavigation();


  const handleSubmit = async () =>{
    try{
      const response = await axiosInstance.post(`erreur/erreurs`, {
        
        "username": username,
        "email": email,
        "message": message,
        "etat": etat
       
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert(`Votre demande a été transmise au support technique.`);
      navigation.goBack();
      //console.log(response.data);
    }catch (error) {
      console.error(error);
    }
  }


  return (
    <Background path={path}>
    <Header />
    
    <View style={styles.containerd}>
        <Text style={styles.text}>Informer l'administrateur de l'application de toute erreur rencontrée. </Text>
    </View>

    <View style = {styles.container}>
      <View style={styles.inputContainer}>
               
            <Icon name="mail-outline" size={25} color="#1D3557" style={styles.inputIcon} />
             
              <TextInput
                style={styles.inputT}
                placeholder="Veuillez entrer votre email"
                onChangeText={text => {setEmail(text)}}
                 value={email}
                autoCapitalize="none"
                returnKeyType="done"
               
                
              />
        </View> 

        <View style={styles.inputContainer}>
               
               <Icon name="chatbox-outline" size={25} color="#1D3557" style={styles.inputIcon} />
                
                 <TextInput
                   style={styles.inputT}
                   placeholder="Veuillez entrer votre message d'erreur"
                   onChangeText={text => {setMessage(text)}}
                    value={message}
                   autoCapitalize="none"
                   returnKeyType="done"
                   multiline={true}
                   numberOfLines={5}
                   textAlignVertical="top"
                   
                 />
           </View> 

            <TouchableOpacity
                   onPress={handleSubmit}
                  activeOpacity={0.7}
                  style={styles.loginBtnWrapper}
                  >
                   <Text 
                  style={styles.loginText}
                  >Transmettre le message</Text> 
            </TouchableOpacity>
    </View>

  </Background>
  )
}

export default Erreur;



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
      height: 130,
     
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
      fontSize: 20,
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