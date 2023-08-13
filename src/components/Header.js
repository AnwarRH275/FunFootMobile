import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, Platform } from 'react-native';

import {useNavigation} from '@react-navigation/native';
import menu from '../assets/align-left.png';

import { COLORS } from '../constants';

import ModelShowSetting from './ModelShowSetting';
import Scores from './Scores';
import { useAuth } from '../context/AuthProvider';

function Header() {

    const navigation = useNavigation();
    const { scores, setScores } = useAuth();



    return (
        <View>
            
            <SafeAreaView style={styles.headerContainer}>
            <TouchableOpacity style={styles.menuButton} onPress={() => { navigation.openDrawer() }}>
                {/* <Icon name="ios-menu" size={24} color="#fff" /> */}
                <Image source={menu} style ={styles.menuB} />
            </TouchableOpacity>
            
            <Scores scores={scores}/>
            {/* <Text style={styles.scoreText}> <Image source ={dollar}/> 1000 <Image source ={dollar}/></Text>
            <TouchableOpacity style={styles.profileButton} onPress={showModal}>
                <Icon name="ios-person" size={24} color={COLORS.primary} style={styles.menuB} />
            </TouchableOpacity>
             */}
              <ModelShowSetting />
        </SafeAreaView>
      
        </View>
        
    );
}

const styles = StyleSheet.create({
    menuB:{
        width: 25,
        height: 25,
        margin:10,
        
        
    },
    headerContainer: {
        // height: 56,
       paddingHorizontal:Platform.OS === 'android' ? 10:30,
        paddingVertical:Platform.OS === 'android' ? 0:20,
        paddingTop:Platform.OS === 'android' ? 0:0,
        
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
    },
    menuButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    scoreText: {
        
        color: COLORS.red,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 24,
        lineHeight: 32,
    },
    profileButton: {
        
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Header;
