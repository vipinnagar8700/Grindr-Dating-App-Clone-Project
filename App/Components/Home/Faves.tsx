// CustomHeader.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Colors from '../HelperComponents/Colors';
import { AntDesign } from '@expo/vector-icons';
import FavourateScreenData from './FavourateScreenData';

const FavesScreen = () => {
  return (
    <View style={styles.container}>

    <View style={styles.header}>
      <Text style={styles.headerText}>Favorites</Text>
      <AntDesign name="filter" size={24} color={Colors.BLACK} />
    </View>
   <FavourateScreenData />
    </View>

  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND, // Set background color to transparent
      },
  header: {
    flexDirection:'row',
    backgroundColor: Colors.BACKGROUND,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color:Colors.BLACK,
    fontSize: 18,
    fontFamily:'appfont-medium'
  },
});

export default FavesScreen;
