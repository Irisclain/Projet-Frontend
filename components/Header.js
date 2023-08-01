import React from "react";
import { useState } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dimensions} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { useDispatch, useSelector } from 'react-redux';
// import {  } from '../reducers/user';

export default function Header(props) {
  


  // <View>
  //   <ImageBackground source={require('../assets/Fond-banniere.png')} style={styles.header}>
  //     <TouchableOpacity onPress={() => props.navigation.navigate('Home')} activeOpacity={0.3}>
  //       <Image source={require('../assets/Logo-banniere.png')} style={styles.logo} />
  //     </TouchableOpacity>
  //     <Text style={styles.accommodationTitle}>{props.accommodation}</Text>        
  //   </ImageBackground>
  // </View>




  return (
      <View>
        <ImageBackground source={require('../assets/Fond-banniere.png')} style={styles.header}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Home')} activeOpacity={0.3}>
            <Image source={require('../assets/Logo-banniere.png')} style={styles.logo} />
          </TouchableOpacity>
          <Text style={styles.accommodationTitle}>{props.accommodation}</Text>        
        </ImageBackground>
      </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height:84,
    width: Dimensions.get('window').width,
    backgroundColor: '#348494',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop:12,
    paddingBottom:12,
  },
  logo:{
    top: 5,
    left: 5,
    width: 180,
    height: 50,
  },
  accommodationTitle:{
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
});