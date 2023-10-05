import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  BottomSheetBackdrop,
    BottomSheetModal
  } from "@gorhom/bottom-sheet";
  import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';
import Separator from './Separateur';
import { useAuth } from '../context/AuthProvider';
import axiosInstance from '../config/instance'
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhoneNumberInput from 'react-native-phone-number-input';
import { CheckBox } from 'react-native-elements';

  

const ModelShowSetting = () => {
    const {username,email,setEmail,tel,setTel,nom,setNom,sexe,setSexe,date_naissance,setDate_naissance,setDesciptionGame2} = useAuth();
    const bottomSheetModalRef = useRef();
    const [codePays, setCodePays] = useState('');
    const [numero, setNumero] = useState('');
    const [isMale, setIsMale] = useState(false);
    const [isFemale, setIsFemale] = useState(false);
    const [birthdate, setBirthdate] = useState(null);
    

    function handleMaleCheckbox() {
      setIsMale(!isMale);
      setIsFemale(false);
      setSexe('Homme');
    }
  
    function handleFemaleCheckbox() {
      setIsFemale(!isFemale);
      setIsMale(false);
      setSexe('Femme');
    }

    const handleDateChange = (date) => {
      setDate_naissance(date);
    };
  
    const concatener = () => {
      let numeroComplet = `${codePays}`;
      setTel(numeroComplet); // affiche le numéro de téléphone complet dans la console
    };

 

    const snapPoints = useMemo(()=> ["90%"],[]);

    const handleSheetChange = useCallback( index =>{
       
       
       
    }, [])

    useEffect(() => {
      if (sexe === 'Homme') {
        setIsMale(true);
        setIsFemale(false);
      } else if (sexe === 'Femme') {
        setIsMale(false);
        setIsFemale(true);
      }
    }, [sexe]);

    const handleBackButton = () => {
      bottomSheetModalRef.current?.close();
      return true;
    }

  

    const handleSave = async () => {
      
     
      if(email != '' && email != null){
        await AsyncStorage.setItem('email', email);
      }
      if(tel != '' && tel != null){
        await AsyncStorage.setItem('tel', tel);
      }
      if(tel != '' && nom != null){
        await AsyncStorage.setItem('nom', nom);
      }
      if(sexe != '' && sexe != null){
        await AsyncStorage.setItem('sexe', sexe);
      }
      if(date_naissance != '' && date_naissance != null){
        await AsyncStorage.setItem('date_naissance', date_naissance);
      }
      console.log(username)
       const response = await axiosInstance.put('/auth/signup', {
        "username":username,
        "password":"",
         "email":email,
         "tel":tel,
         "nom":nom,
         "prenom":'',
         "sexe":sexe,
         "date_naissance":date_naissance

       });
       setDesciptionGame2('');
      bottomSheetModalRef.current?.close(); // ferme le BottomSheetModal
  }

    return (
     
        <View style={styles.container}>
           <KeyboardAvoidingView behavior="padding" enabled> 
                <TouchableOpacity style={styles.profileButton} onPress={() => bottomSheetModalRef.current.present()}>
                    <Icon name="ios-person" size={24} color="#1D3557" style={styles.menuB} />
                </TouchableOpacity>

                <BottomSheetModal 
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    onChange={handleSheetChange}
                    //backdropPressBehavior="hide"
                    backdropComponent={(backdropProps) => (
                      <BottomSheetBackdrop {...backdropProps} blurType="dark" 
                        onPress={()=>{bottomSheetModalRef.current.close();}}
                      />
                    )}
                >
                    <Separator onPress={handleBackButton} />
                    <View style={styles.contentContainer} onPress={handleBackButton} >
                        
                        <Text style={styles.headerText}>Information profile</Text>
                      
                    </View>
            <View style={styles.containerInformation}>
            <View style={styles.inputContainer}>
              <Icon name="person-circle-outline" size={25} color="#1D3557" style={styles.inputIcon} />
              <TextInput
                style={styles.inputT}
                placeholder="Usename "
                value={username}
                autoCapitalize="none"
                returnKeyType="done"
                
              />
            </View> 


            <View style={styles.inputContainer}>
              <Icon name="person-circle-outline" size={25} color="#1D3557" style={styles.inputIcon} />
              <TextInput
                style={styles.inputT}
                placeholder="Nom Prénom"
                onChangeText={text => setNom(text)}
                value={nom}
                autoCapitalize="none"
                returnKeyType="done"
                
              />
            </View> 
            
            <View style={styles.inputContainer}>
              <Icon name="mail-outline" size={25} color="#1D3557" style={styles.inputIcon} />
              <TextInput
                style={styles.inputT}
                placeholder="Email"
                
                onChangeText={text => setEmail(text)}
                value={email}
                autoCapitalize="none"
                returnKeyType="done"
               
              />
            </View> 

            <View style={styles.inputContainer}>

            <Icon name="calendar-outline" size={25} color="#1D3557" style={styles.inputIcon} />
              <TextInput
                style={styles.inputT}
                placeholder="Date de naissance"
                onChangeText={text => handleDateChange(text)}
                value={date_naissance}
                autoCapitalize="none"
                returnKeyType="done"
              />
            </View> 

            <View style={styles.inputContainer}>
            
             
             <PhoneNumberInput
                
                placeholder="Numéro de téléphone"
                defaultCode="MA"
                layout="first"
                onChangeText={(text) => {setTel(text);
                  concatener();
                }}
                onChangeFormattedText={(text) => setCodePays(text)}
                value={tel}
                autoFormat={true}
                autoCapitalize="none"
                returnKeyType="done"
                containerStyle={{...styles.inputT,backgroundColor:COLORS.grayLight}}
                textInputProps={{
                  style: {
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: '#1D3557',
                    paddingLeft: 10,
                  },
                }}
              />

            </View> 

      
 
            <View style={styles.checkboxContainer}>
              <CheckBox
                title="Homme"
                checked={isMale}

                onPress={handleMaleCheckbox}
              />
              <CheckBox
                title="Femme"
                checked={isFemale}
                onPress={handleFemaleCheckbox}
              />
            </View>
            <TouchableOpacity
                   onPress={handleSave}
                  activeOpacity={0.7}
                  style={styles.loginBtnWrapper}
                  >
                   <Text 
                  style={styles.loginText}
                  >Sauvegarder </Text> 
            </TouchableOpacity>
            <TouchableOpacity
                   onPress={handleBackButton}
                  activeOpacity={0.7}
                  style={styles.loginBtnWrapper2}
                  >
                   <Text 
                  style={styles.loginText}
                  >Fermer </Text> 
            </TouchableOpacity>
            </View>   

                </BottomSheetModal>
           </KeyboardAvoidingView>
        </View>
       
    )
}


export default ModelShowSetting

const styles =  StyleSheet.create({
  datePicker: {
    flex: 2,
    // swidth: '100%',
  },
  dateInput: {
    borderWidth: 0,
    // alignItems: 'flex-start',
    // justifyContent: 'center',
  },
  dateIcon: {
    // width: 0,
    // height: 0,
  },
  dateText: {
    fontSize: 16,
    color: COLORS.dark,
    textAlign: 'left',
   
  },
  placeholderText: {
    fontSize: 16,
    color: COLORS.dark,
    textAlign: 'left',
  },
  btnTextConfirm: {
    color: COLORS.dark,
  },
  btnTextCancel: {
    color: COLORS.dark,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position:'relative',
    justifyContent:'center',
    marginTop: 10,
    
   
  },
  checkboxLabel: {
    marginLeft: 10,
  },
    containerInformation:{
     //top:30,
    // marginTop:40
    },
    contentContainer:{
         flex:1,
         alignSelf:'center',
        //marginBottom:10
        // justifyContent: 'center',

    },
    profileButton: {
        
        alignItems: 'center',
       // justifyContent: 'center',
       right:10
    },
    headerText:{
        //margin:17,
        
        fontSize:20,
        fontWeight:"800",
        //color:COLORS.dark
    },
    inputContainer: {
       // flex:1,
        flexDirection: 'row',
        marginTop:10,
       // alignItems: 'center',
         margin :20,
        backgroundColor: COLORS.grayLight,
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
       
      },
      loginBtnWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
       
        margin:20,
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
      loginBtnWrapper2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
       
        margin:20,
        position: 'relative',
        marginBottom:50,
        height: 47,
        backgroundColor: COLORS.red,
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

 });