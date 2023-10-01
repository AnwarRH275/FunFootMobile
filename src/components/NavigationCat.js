import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, ImageBackground, Image,Alert } from 'react-native';
import { COLORS } from '../constants';
import background from '../assets/ICONNAVIGATION/back.png'
import axiosInstance from '../config/instance'
import AsyncStorage from '@react-native-async-storage/async-storage';
import loading_gif from '../assets/game/loading.gif'
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthProvider';
import moment from 'moment-timezone';
import { format, isSameDay } from 'date-fns';
import {Dimensions} from 'react-native';


const NavigationCat = ({setStartGame}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [categories,setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const {token } = useAuth();
  const navigation = useNavigation();

  const [clickCount, setClickCount] = useState(0);

  // Récupère le fuseau horaire de l'utilisateur



  const handlePress = (typeGame, date, heure) => {
    const currentDate = new Date();
    const userDate = new Date(date + ' ' + heure); // Combine date and time into a single string and parse as a Date object
    
    if (userDate.getTime() < currentDate.getTime()) {
      Alert.alert('Pari terminé.', 'Le ' + date + ' à ' + heure);
      return;
    }
    
    navigation.navigate(setStartGame, { typeGame });
  }


  const retrieveClickCount = async () => {
    try {
      const storedDate = await AsyncStorage.getItem('clickDate');
      const storedCount = await AsyncStorage.getItem('clickCount');
      if (storedDate && isSameDay(new Date(storedDate), new Date())) {
        setClickCount(parseInt(storedCount));
      } else {
        resetClickCount();
      }
    } catch (error) {
      console.log('Error retrieving click count:', error);
    }
  };


  const storeClickCount = async () => {
    try {
      await AsyncStorage.setItem('clickDate', format(new Date(), 'yyyy-MM-dd').toString());
      await AsyncStorage.setItem('clickCount', clickCount.toString());
    } catch (error) {
      console.log('Error storing click count:', error);
    }
  };

  const resetClickCount = async () => {
    try {
      await AsyncStorage.removeItem('clickDate');
      await AsyncStorage.removeItem('clickCount');
      setClickCount(0);
    } catch (error) {
      console.log('Error resetting click count:', error);
    }
  };

  const handleButtonClick = (numero_match,date,heure) => {
    if (clickCount < 100) {
      setClickCount(clickCount + 1);
      handlePress(numero_match,date,heure);
      console.log(clickCount)
    } else {
      Alert.alert('Limite dépassée', 'Vous avez atteint le nombre maximal de grilles pour aujourd\'hui.');
    }
  };
  useEffect(() => {
    retrieveClickCount();
  }, []);

  useEffect(() => {
    storeClickCount();
  }, [clickCount]);
  

  useEffect(() => {

    console.log(token)

    const fetchData = async () => {
       
      try {
        const response = await axiosInstance.get('/category/Categories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setCategories(response.data.reverse());
        setLoading(false);
      } catch (error) {
      //  console.error(error);
      }
    };
    fetchData();
  }, [token]);

  const _renderItem = ({ item, index }) => {
   
    const userTimezone = moment.tz.guess(); 

   
    const marocTime = moment.tz(`${item.date} ${item.heure}`, 'YYYY-MM-DD HH:mm', 'Africa/Casablanca'); // Convertit l'heure du Maroc en utilisant le fuseau horaire de Casablanca

    const userTime = marocTime.clone().tz(userTimezone); 

    const formattedTime =  userTime.format('HH:mm'); // Formate l'heure dans le fuseau horaire de l'utilisateur
   
  
   
    return (
      <View>
         {loading ? (
        <Image
        source={loading_gif}
        style={{ position:'relative',
      
        margin:14,
        marginBottom:200
        }}
      />
       
      ) : (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          { borderColor: index === selectedIndex ? COLORS.dark : COLORS.white,
          backgroundColor: index === selectedIndex ? COLORS.white : COLORS.dark
        },
        ]}
        onPress={() => {
            setSelectedIndex(index)
            
            handleButtonClick(item.numero_match,item.date,item.heure)
          }
        }
      >
        <ImageBackground  source={background}
         style={{...styles.buttonColumn,height:'125%',width:'110%',marginTop:"-5%"}}
        >
            {/* <View style={styles.buttonColumn}> */}
            
                <Text style={[
                styles.itemText,
                { color: index === selectedIndex ? COLORS.dark : COLORS.white },
                ]}>N° {item.numero_match}</Text>

                <Text style={[
                styles.itemText2,
                { color: index === selectedIndex ? COLORS.dark : COLORS.white },
                ]}>{item.categorie_match}</Text>
                <Text style={[
                styles.itemText4,
                { color: index === selectedIndex ? COLORS.dark : COLORS.white },
                ]}>{item.description}</Text>
                <Text style={[
                styles.itemText3,
                { color: index === selectedIndex ? COLORS.dark : COLORS.white },
                ]}> Fin validation </Text>
                 <Text style={[
                styles.itemText4,
                { color: index === selectedIndex ? COLORS.dark : COLORS.white },
                ]}>Le {item.date} à {formattedTime}</Text>
                
            {/* </View> */}

        </ImageBackground>
        
        
      </TouchableOpacity>
      )}
      </View>
    );
};

  return (
    <View style={styles.container}>
      <FlatList
        //data={data}
        data={categories}
        renderItem={_renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = {
  container: {
   // flex: 1,

  // position:'relative',
 //   alignItems: 'center',
  //  justifyContent: 'center',
    //marginVertical:20,
  //  marginTop:60
    
  },
  buttonColumn:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    // flex: 1,
    // top:"-50%",
    alignItems: 'flex-start',
    alignItems: 'center',
    padding: Dimensions.get('window').height > 768 ? 4 : 9,
    margin: 10,
  //  marginBottom:180,
    width:  260,
    height: 230,
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
   // borderColor: '#4B4B4B',
    borderRadius: 29,
  },
  itemText: {
    fontWeight: '600',
    fontSize:  Dimensions.get('window').height > 768 ? 18 : 15,
    lineHeight: 39,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  itemText2:{
    fontWeight: '800',
    fontSize:  Dimensions.get('window').height > 768 ? 23 : 20,
    lineHeight: 39,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  itemText4:{
    fontWeight: '600',
    fontSize:  Dimensions.get('window').height > 768 ? 15 : 12,
    lineHeight: 39,
    textAlign: 'center',
    // marginVertical:'-3',
    // marginHorizontal:'1',
    color: '#FFFFFF',
  },
  itemText3:{
    fontWeight: '800',
    marginVertical:-7,
    fontSize:  Dimensions.get('window').height > 768 ? 15 : 12,
    lineHeight: 39,
    textAlign: 'center',
    color: '#FFFFFF',
  }
};

export default NavigationCat;
