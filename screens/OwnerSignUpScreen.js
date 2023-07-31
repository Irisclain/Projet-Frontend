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
import Header from '../components/Header';
// import { useDispatch, useSelector } from 'react-redux';
// import {  } from '../reducers/user';

export default function OwnerSignUpScreen({ navigation }) {

  const handleConnection = () => {
    navigation.navigate('TabNavigator');
  };


  // <ImageBackground source={require('../assets/Fond-banniere.png')} style={styles.header}>
  // <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.messageButton} activeOpacity={0.3}>
  //   <Image source={require('../assets/Logo-banniere.png')} style={styles.logo} />
  // </TouchableOpacity>            
  // </ImageBackground>







  
  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.haut}>
          <Header/>
          <View style={styles.bider}>
            <Text>//OwnerSignUpScreen === Page d'inscription pour un propriétaire</Text>
            <TouchableOpacity onPress={() => handleConnection()} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>(//après connection//)Mes hébergements</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>(//retour à la page des inscriptions//)</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('Message')} style={styles.messageButton} activeOpacity={0.3}>
            <FontAwesome name='comments' size={50} color={'#FFE279'} />
          </TouchableOpacity>
        </View>


        
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS === "android" ? 37 : 0,
    backgroundColor: '#ddd',
    borderWidth: 1,
    borderColor: 'red',
  },
  haut: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
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
  bider: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'red',
  },
  footer: {
    height:58,
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    margin: '0 auto',
    padding: 4,
  },
  // bannerbackground: {
  //   position: 'absolute',
  //   top: -30,
  //   left: 0,
  //   right: 0,
  //   height: 50,
  //   backgroundColor: '#000',
  // },
  // bannerImage:{
  //   position: 'absolute',
  //   top: 5,
  //   left: 5,
  //   width: 180,
  //   height: 50,
  // },
  blackBanner:{
    marginTop: -20,
    width: '100%',
    height: 50,
    marginBottom: -20,
  },
  button: {
    alignItems: 'center',
    paddingTop: 8,
    width: '100%',
    marginTop: 30,
    backgroundColor: '#fbe29c',
    borderRadius: 1,
  },
  textButton: {
    //fontFamily: 'Futura',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
});