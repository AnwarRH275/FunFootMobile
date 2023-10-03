import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import Background from '../../components/Background';
import Match from '../../components/Match';
import Scores from '../../components/Scores';
import { COLORS, ROUTES } from '../../constants';
import path from '../../assets/onboarding3.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../config/instance';
import { useAuth } from '../../context/AuthProvider';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Switch2 from '../../components/Switch2';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-6300362813805470/9752729993';
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});


const GameStage1 = ({route}) => {





  const [selectedIndex, setSelectedIndex] = useState(true);
  const [matchs,setMatchs] = useState(null);
  const [token,setToken] = useState(null);
  
  const { scores, setScores,username } = useAuth();


  const { typeGame } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
   //   setLoaded(true);
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  useEffect(() => {

    


    const checkToken = async () => {
      try {
       // await AsyncStorage.clear();
        let gettoken = await AsyncStorage.getItem('token');
        let getusername = await AsyncStorage.getItem('username');
        console.log(username)
       // console.log(gettoken)
        if (gettoken) {

          setToken(gettoken);
         // setUsername(getusername)

        }
       // setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    checkToken();

    const fetchData = async () => {
       
      try {
        const response = await axiosInstance.get(`match/matchs/${typeGame}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          
        });


        //console.log(response.data);
        handleUpdate(response.data,username,'username')
       // console.log(matchs)
        setMatchs(response.data);
      } catch (error) {
      //  console.error(error);
      }
    };
    fetchData();
  }, [token]);

  const handleResultUpdate = (id, newResult) => {
    const updatedMatchs = matchs.map(match => {
      if (match.id === id) {
        return { ...match, resultat: newResult,etat:"Gains Potentiel" };
      }
      return match;
    });
    setMatchs(updatedMatchs);
  };


  const handleUpdate = ( data,updatedValue, key) => {
    //setMatchs([]);
    const updatedData = data.map(item => {
      
        return { ...item, [key]: updatedValue };
      
     
    });
    console.log(updatedData)
    setMatchs(updatedData);
  };

      const handlePress = async () => {
       
      
        let validation = true;
          
        
        for (let i = 0; i < matchs.length; i++) {
          const item = matchs[i];
          if (item.resultat == null || item.resultat === '') {
            Alert.alert('Il faut compléter l\'ensemble de la grille !!');
            validation = false;
            break; // Exit the loop
          }
        }
        
        if(validation){
         // handleUpdate(username,'username')
          setScores(scores+1);
          //console.log(matchs)
          try {
            const response = await axiosInstance.post('/mesgrid/mesgrids/1/'+username, matchs, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            //console.log(response.data);

            Alert.alert('Accepté !');
            interstitial.show();
            //navigation.goBack();
            navigation.navigate(ROUTES.HOME);
          } catch (error) {
            console.error(error);
          }
          
        }
        



        
      };
  return (

    <Background  path={path}>
      <Scores scores={scores}/>
      <View style={styles.container}>
          <Switch2 typeGame={typeGame} resultat="Résultat" />
        
          <FlatList
          data={matchs}
          renderItem={({ item,index }) => (
            <Match key={item.id} number={item.id} equipe1={item.equipe1}  equipe2={item.equipe2} resultat={item.resultat} username={username}
            onResultUpdate={newResult => handleResultUpdate(item.id, newResult)}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={{alignItems:'center'}}>
            <TouchableOpacity style={styles.containerbtn}
            onPress={handlePress}
            >  
              <Text style={styles.text2}>Jouer</Text>
            </TouchableOpacity>
          </View> 
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'rgba(3, 3, 3, 0.4)',
    shadowColor: 'rgba(3, 3, 3, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    borderRadius: 15,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    paddingTop: 6,
    paddingBottom: 10,
    margin:10,
    marginBottom:Platform.OS === 'android' ? 30:40
  },
  containerSwitch:{
    width: 340,
    height: 60,
    backgroundColor: '#F2F8FF',
    borderRadius: 20,
    flexDirection:'row',
    justifyContent:'center',
    marginVertical:10,
   
  },
  button: {
    marginVertical:10,
    marginHorizontal:10,
    width: 151,
    height: 38,
   // margin:10,
    justifyContent:'center',
    backgroundColor: '#FF793F',
    borderRadius: 20,
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight:'bold'
    //padding: 12,
   // color: 'white'
  },
  containerbtn:{
    //flex:1,
    zIndex:2, 
    marginBottom:Platform.OS === 'android' ? 30:40,
    // bottom:Platform.OS === 'android' ? 80:0,
     width: 283,
     height: 50,
     backgroundColor: COLORS.green,
     borderRadius: 56,
     alignItems: 'center',
     justifyContent: 'center',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.8,
     shadowRadius: 3,
    //  elevation: 3,
 },
 text2: {
     color: '#fff',
     fontWeight: 'bold',
     fontSize: 35,
   },
});

export default GameStage1;
