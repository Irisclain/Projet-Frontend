import React from "react";
import { useState } from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { useDispatch, useSelector } from 'react-redux';
// import {  } from '../reducers/user';




export default function Header({ navigation }) {
  
  return (
      <View>
        <ImageBackground source={require('../assets/Fond-banniere.png')} style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} activeOpacity={0.3}>
            <Image source={require('../assets/Logo-banniere.png')} style={styles.logo} />
          </TouchableOpacity>            
        </ImageBackground>
      </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height:100,
    width: '100%',
    backgroundColor: '#348494',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  logo:{
    top: 5,
    left: 5,
    width: 180,
    height: 50,
    margin: 20,
    marginLeft:0,
  },
});