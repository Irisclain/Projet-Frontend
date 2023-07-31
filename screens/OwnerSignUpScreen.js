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
import {Dimensions} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
          <Header navigation={navigation} accommodation=''/>
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
        <Footer navigation={navigation} messageButton={false}/>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS === "android" ? 37 : 0,
    backgroundColor: '#fff',
  },
  haut: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  bider: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
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