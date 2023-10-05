import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  axiosInstance  from '../config/instance';
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [scores,setScores] = useState(0);
  const [mesgrids,setMesgrids] = useState([]);
  const [coupons,setCoupons] = useState('');
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [tel,setTel] = useState('');
  const [nom,setNom] = useState('');
  const [sexe,setSexe] = useState('');
  const [date_naissance,setDate_naissance] = useState('');
  const [descriptionGame2,setDesciptionGame2] = useState('');
  
  useEffect(() => {
    const checkToken = async () => {
      try {
        let gettoken = await AsyncStorage.getItem('token');
        let username =  await AsyncStorage.getItem('username');
        let getcoupons =  await AsyncStorage.getItem('coupons');
        let getTel = await AsyncStorage.getItem('tel');
        let getEmail = await AsyncStorage.getItem('email');
        let getName = await AsyncStorage.getItem('nom')
        let getSexe = await AsyncStorage.getItem('sexe')
        let getDate_naissance = await AsyncStorage.getItem('date_naissance')

        
       // console.log(username)
        if (gettoken) {
           //console.log(gettoken)
           setUsername(username);
            setToken(gettoken);
            setCoupons(getcoupons);
            setEmail(getEmail);
            setTel(getTel);
            setNom(getName);
            setSexe(getSexe);
            setDate_naissance(getDate_naissance);
            try {
              const response = await axiosInstance.get(`Scores/scores/${username}`, {
                headers: {
                  Authorization: `Bearer ${gettoken}`,
                },
              });
            //  if(response.data){
            //   setScores(response.data.scores);
            //  }
             // console.log(response.data.scores)
              setScores(response.data.scores);
              
            } catch (error) {
            console.error(error);
            }
            try {
              const response = await axiosInstance.get(`mesgrid/mesgridDistinct/${username}`, {
                headers: {
                  Authorization: `Bearer ${gettoken}`,
                },
              });
             
              setMesgrids(response.data.reverse());
            //  console.log(response.data.reverse())
            } catch (error) {
              console.error(error);
            }
        }
       // setIsLoading(false);
      } catch (error) {
        console.error(error);
      }

          
    };
    checkToken();
  }, [scores]);


  return (
    <AuthContext.Provider value={{username, setUsername,token, setToken,scores,
      email,setEmail,tel,setTel,nom,setNom,
      setScores,mesgrids,setMesgrids,coupons,setCoupons,
      sexe,setSexe,date_naissance,setDate_naissance,descriptionGame2,setDesciptionGame2
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
