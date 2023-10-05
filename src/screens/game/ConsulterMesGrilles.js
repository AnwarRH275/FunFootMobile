import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import path from '../../assets/onboarding3.png'
import Background from '../../components/Background';
import axiosInstance from '../../config/instance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthProvider';
import MatchsGriser from './MatchsGriser';

const ConsulterMesGrilles = ({route}) => {
    const {numero_grid,numero_match,categorie_match,username} = route.params;

    const [matchs,setMatchs] = useState(null);
    const {token} = useAuth();
   
    const fetchData = async () => {
           
        try {
          console.log({
              "numero_match": numero_match,
              "categorie_match": categorie_match,
              "numero_grid": numero_grid,
              "username": username      
            })
          const response = await axiosInstance.post(`mesgrid/getMesGrids`, {
              "numero_match": numero_match,
              "categorie_match": categorie_match,
              "numero_grid": numero_grid,
              "username": username      
            }, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
         // console.log(response.data);

          setMatchs(response.data);
        } catch (error) {
          console.error(error);
        }
      };

    useEffect(() => {
        fetchData();
      }, [username]);



  return (
    <Background  path={path}>
        <View style={styles.container}>
            
        <FlatList
          data={matchs}
          renderItem={({ item,index }) => (
            <MatchsGriser key={index} number={index} equipe1={item.equipe1}  equipe2={item.equipe2} resultat={item.resultat} 

            />
          )}
          keyExtractor={item=>item.id}
        />
        </View>
    </Background>
  )
}

export default ConsulterMesGrilles;


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
  });