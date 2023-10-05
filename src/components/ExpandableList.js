import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';

const ExpandableList = ({ items }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const toggleExpand = id => {
    setExpanded(!expanded);
    setSelectedId(id);
  };

  const renderItem = item => {
    return (
        <TouchableOpacity key={item.numero_grid}  style={styles.container}
        
        >
        <View style={styles.containerRow}> 
        <Text style={styles.text}> N° </Text>
        <Text style={styles.text}> {item.numero_grid} </Text>
        <Text style={styles.text}>  ----- </Text>
        <Text style={styles.text}> {item.categorie_match} </Text>
        <Text style={styles.text}>  ----- </Text>
        <Text style={styles.text}> {item.numero_match} </Text>

        
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
          data={items}
          renderItem={({ item,index }) => (
            renderItem(item)
          )}
          keyExtractor={item => item.numero_grid}
        />
  );
};


export default ExpandableList;
