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
import {LinearGradient} from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
// import { useDispatch, useSelector } from 'react-redux';
// import {  } from '../reducers/user';

export default function Footer(props) {
  const currentRoute = useSelector((state) => state.currentRoute.value);
  //console.log('selon le footer : ', currentRoute);
  
  let homeIconStyle = styles.fontawesomeIcon;
  if (currentRoute==='MyAccommodations') { homeIconStyle = 'styles.fontawesomeIconOn' } else { homeIconStyle = 'styles.fontawesomeIcon'}
  
  const HomeButton = () => {
    if (currentRoute==='MyAccommodations') {
      return (
        <View style={styles.fontawesomeIconOn}>
          <FontAwesome name="home" size={30} color={'#fff'} />
        </View>
      )
    } else {
      return (        
        <LinearGradient
        colors={['#CD43FD', '#FF7A00', '#FAB26F', '#FFE279']}
        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
        style={styles.fontawesomeIcon}>
          <TouchableOpacity onPress={() => props.navigation.navigate('MyAccommodations')} activeOpacity={0.3}>
            <FontAwesome name="home" size={30} color={'#fff'} />
          </TouchableOpacity>
        </LinearGradient>
      )
    }
  }

  const MyProfileButton = () => {
    if (currentRoute==='MyProfile') {
      return (
        <View style={styles.fontawesomeIconOn}>
          <FontAwesome name="user" size={30} color={'#fff'} />
        </View>
      )
    } else {
      return (        
        <LinearGradient
        colors={['#CD43FD', '#FF7A00', '#FAB26F', '#FFE279']}
        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
        style={styles.fontawesomeIcon}>
          <TouchableOpacity onPress={() => props.navigation.navigate('MyProfile')} activeOpacity={0.3}>
            <FontAwesome name="user" size={30} color={'#fff'} />
          </TouchableOpacity>
        </LinearGradient>
      )
    }
  }
  
  const MessageButton = () => {
    if (currentRoute==='Message') {
      return (
        <View style={styles.fontawesomeIconOn}>
          <FontAwesome name="comments" size={30} color={'#fff'} />
        </View>
      )
    } else {
      return (
        <LinearGradient
        colors={['#CD43FD', '#FF7A00', '#FAB26F', '#FFE279']}
        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
        style={styles.fontawesomeIcon}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Message')} activeOpacity={0.3}>
            <FontAwesome name="comments" size={30} color={'#fff'} />
          </TouchableOpacity>
        </LinearGradient>
      )
    }
  }

  return (
    <View style={styles.footer}>
      <MessageButton />
      <MyProfileButton />
      <HomeButton />
    </View>
  );
}

const styles = StyleSheet.create({
    footer: {
        height:54,
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        padding: 3,
        marginTop: 8,
      },
      fontawesomeIcon:{
        width: 46,
        height: 46,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
      },
      fontawesomeIconOn:{
        width: 46,
        height: 46,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
        backgroundColor: '#FFE279',
      }
});