import { FlatList, View, Text, StyleSheet, ImageBackground, Platform, Touchable, TouchableOpacity } from 'react-native';
import silver from '../assets/game/tickets/silver.png';
import bronze from '../assets/game/tickets/bronze.png';
import gold from '../assets/game/tickets/gold.png';
import diamund from '../assets/game/tickets/diamund.png';
import { COLORS } from '../constants';

const data = [
  { key: '1', section: '300' ,path:bronze },
  { key: '2', section: '150' ,path:silver},
  { key: '3', section: '50' ,path:gold},
  { key: '4', section: '5' ,path:diamund},
];

const Grid = () => {
  return (
 
      <View style={styles.allGrid}>
        <FlatList
          data={data}
          numColumns={2} // Number of columns
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.itemContainer}>
              <ImageBackground style={styles.background}  source={item.path}>
                <Text style={styles.itemText}>{item.section}</Text>
              </ImageBackground>
            </TouchableOpacity>
            
          )}
        />
        </View>

  );
};

const styles = StyleSheet.create({
  allGrid:{
    top: Platform.OS ==='android'? 50:10,
  },
  itemContainer: {
    flex: 1,
   // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    height: 150, // Adjust the height of each section
    width: '50%', // Adjust the width of each section
    marginBottom:-20,
   // marginTop:20
   shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        // elevation: 3,
  },
  background:{
    flex:1,
    width:"100%",
    height:"80%",
    margin:2,
  },
  itemText: {
    position:'relative',
    top:84,
    left:120,
    fontSize: 18,
    color:COLORS.white,
    fontWeight:"600"

  },
});

export default Grid;
