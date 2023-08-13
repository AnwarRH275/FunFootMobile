import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import {COLORS, ROUTES} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import WalkthroughScreen from './WalkthroughScreen/WalkthroughScreen';
import WalkthroughAppConfig from './WalkthroughAppConfig';
import DynamicAppStyles from './DynamicAppStyles';
import Background from '../../components/Background';
import Icon from 'react-native-vector-icons/Ionicons';
import path from '../../assets/onboarding3.png';
import axiosInstance from '../../config/instance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthProvider';


const Login = props => {
  // const {navigation} = props;
  const navigation = useNavigation();
  const [showRealApp, setShowRealApp] = useState(true);
  const [usernameTmp, setUsernameTmp] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [checked, setChecked] = useState(false);
  const { setScores,setUsername,setToken,setMesgrids,setCoupons } = useAuth();


  const saveToken = async (token,usernames) => {
    console.log(usernames)
    setUsername(usernames);
    setToken(token);
    try {
      const response2 = await axiosInstance.get(`Scores/scores/${usernames}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response3 = await axiosInstance.get(`Coupons/getMyCoupons/${usernames}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await axiosInstance.get(`mesgrid/mesgridDistinct/${usernames}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     
      setMesgrids(response.data);
     
      console.log(response3.data.coupons)
      console.log(response2.data.scores)
      setScores(response2.data.scores);
      setCoupons(response3.data.coupons)
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('username', usernames);
      await AsyncStorage.setItem('coupons', response3.data.coupons);


    } catch (error) {
      console.error(error);
    }
  };


  const handleSubmitAnonyme = async () => {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const milliseconds = now.getMilliseconds().toString();

    const uniqueString = year + month + day + milliseconds;

    const newUser = "user_"+uniqueString;

      const response = await axiosInstance.post('/auth/signup', {
        "username":newUser,
        "email":newUser,
        "password":newUser
      });

  
      if(response.data.message == "User created succes"){
        Alert.alert(response.data.message)
        try {
          const response = await axiosInstance.post('/auth/login', {
            "username": newUser,
            "password": newUser
          });

          console.log(newUser)
          
          if(response.data.acces_token){
            saveToken(response.data.acces_token,newUser);
           
            navigation.navigate(ROUTES.HOME)
          }else{
            alert(response.data.message)
          }
          
        } catch (error) {
          console.error(error);
        }
         
      }else{
        Alert.alert(response.data.message)
      }
    
  }

  const handleSubmit=  async () => {
    console.log(usernameTmp)
    console.log(password)
    if(!usernameTmp && !password){
      alert('Nom d\'utilisateur et mot de passe requis, connexion anonyme possible');

    }else{
      try {
        const response = await axiosInstance.post('/auth/login', {
          "username":usernameTmp,
          "password":password
        });

        
        if(response.data.acces_token){
          saveToken(response.data.acces_token,usernameTmp);
         
          navigation.navigate(ROUTES.HOME)
        }else{
          alert(response.data.message)
        }
        
      } catch (error) {
        console.error(error);
      }
      
    }
    
  }

  return (
    <View style={{flex:1}}>
       {showRealApp ? (
        <View  style={{flex:1}}>
         
        <WalkthroughScreen 
        appConfig={WalkthroughAppConfig}
        appStyles={DynamicAppStyles}
        // showRealAppw = {showRealApp}
       // nav = {navigation}
        setShowRealApp = {setShowRealApp}
        />
        </View>
       ):(
        <Background path={path}>
        <SafeAreaView style={styles.main}>
        <View style={styles.container}>
          <View style={styles.wFull}>
            <View style={styles.row}>
              {/* <Logo width={55} height={55} style={styles.mr7} /> */}
              <Text style={styles.brandName}>FUN FOOT</Text>
            </View>

            <Text style={styles.loginContinueTxt}>Connectez-vous pour continuer</Text>
           <View style={styles.inputContainer}>
              <Icon name="person-circle-outline" size={25} color="#1D3557" style={styles.inputIcon} />
              <TextInput
                style={styles.inputT}
                placeholder="Nom d'utilisateur"
                onChangeText={text => setUsernameTmp(text)}
                value={usernameTmp}
                autoCapitalize="none"
                returnKeyType="done"
                onSubmitEditing={() => {
                  if (!usernameTmp) {
                    alert('Username is required');
                  }
                }}
              />
            </View> 
            
            <View style={styles.inputContainer}>
              <Icon name="lock-closed" size={25} color="#1D3557" style={styles.inputIcon} />
              <TextInput
                style={styles.inputT}
                placeholder="Mot de passe"
                secureTextEntry={hidePassword}
                onChangeText={password => setPassword(password)}
                value={password}
              />

              <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                  <Icon
                    name={hidePassword ? "ios-eye-off" : "ios-eye"}
                    size={22}
                    color="#1D3557"
                    style={styles.inputIcon}
                  />
              </TouchableOpacity>
          </View>

       
          {/* <View style={styles.containerCheck}>
            <TouchableOpacity onPress={() => setChecked(!checked)}>
              {checked ? (<Icon style={{color:COLORS.white}} name="checkbox-outline" size={24} color="#4F8EF7" />):( <View style={styles.box} />)}  
              
            </TouchableOpacity>
            <Text style={styles.textCheck}> Se souvenir</Text>
          </View>
        */}
         
            {/* <View style={styles.loginBtnWrapper}
           
            > */}
          
              
                <TouchableOpacity
                   onPress={handleSubmit}
                  activeOpacity={0.7}
                  style={styles.loginBtnWrapper}
                  >
                   <Text 
                  style={styles.loginText}
                  >SE CONNECTER</Text> 
                </TouchableOpacity>
      
            {/* </View> */}

            
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(ROUTES.FORGOT_PASSWORD)
              }
              style={styles.forgotPassBtn}>
              <Text style={styles.forgotPassText}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
          </View>

          
      
            <View style={styles.forgotPassBtn}>
              
                
                <TouchableOpacity
                   onPress={handleSubmitAnonyme}
                  activeOpacity={0.7}
                  style={{...styles.connexionAnonyme,top:100,padding:20}}
                  >
                   <Text 
                  style={styles.loginText}
                  >CONNEXION ANONYME</Text> 
                </TouchableOpacity>
      
            </View>
{/* 
            <View style={styles.containerMedia}>
            
      
              <TouchableOpacity style={styles.mediabtn} onPress={() => {}}>
              <Image
                  style={styles.image}
                  source={logoGoogle}
              />

              </TouchableOpacity>
              <TouchableOpacity  style={styles.mediabtn} onPress={() => {}}>
              <Image
                  style={styles.image}
                  source={logoMeta}
              />
              </TouchableOpacity>
              <TouchableOpacity  style={styles.mediabtn} onPress={() => {}}>
              <Image
                  style={styles.image}
                  source={logoApple}
              />
              </TouchableOpacity>
            </View> */}

          <View style={styles.footer}>
            <Text style={styles.footerText}> Vous n'avez pas de compte? </Text>
            
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.REGISTER)}>
              <Text style={styles.signupBtn}>S'inscrire</Text>
            </TouchableOpacity>
          </View>
       </View>
       </SafeAreaView>
       </Background>
       )}
      </View>
    
  );
};

export default Login;

const styles = StyleSheet.create({
  connexionAnonyme:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
   
    position: 'relative',
    top:0,
    height: 47,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderRadius: 10,
  },
  mediabtn:{
    alignItems: 'center',
    justifyContent: 'center',
    width: 68,
    height: 55,
    marginHorizontal:10,
    top:80,
    backgroundColor: '#F1FAEE',
    borderRadius: 10,
  },
  containerMedia:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  box: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#4F8EF7',
    backgroundColor:COLORS.white
  },
  checked: {
    backgroundColor: COLORS.green,
  },
  containerCheck: {
    flexDirection: 'row',
    left:5,
    top:5,
    button:5,
   // alignSelf: 'flex-start',
    //justifyContent: 'center',
  
  },
  textCheck:{
    top:2,
    left:2,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 19,
    color: COLORS.white,
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
  main: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 16,
  },
  container: {
    padding: 15,
    width: '100%',
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    top:70
    // justifyContent: 'center',
  },
  brandName: {
    fontSize: 60,
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.white,
    opacity: 0.9,
  },
  loginContinueTxt: {
    fontSize: 21,
    textAlign: 'center',
    color: COLORS.white,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 21,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    backgroundColor: COLORS.bgInput,
    color: COLORS.dark,
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    height: 55,
    paddingVertical: 0,
  },
  // Login Btn Styles
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
    backgroundColor: COLORS.red,
    shadowColor: COLORS.red,
    shadowOffset: { width: 0, height: 0 },
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
    // flex: 'none',
    // order: 0,
    // flexGrow: 0,
  },
  forgotPassText: {
    top:10,
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 15,
  },
  // footer
  footer: {
   
    // backgroundColor:COLORS.white,
    padding:10,
    borderRadius:10,
   
    textAlign: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 70,
    
    
  },
  footerText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  signupBtn: {
    color: COLORS.red,
    fontWeight: 'bold',
  },
  // utils
  wFull: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  mr7: {
    marginRight: 7,
  },
});