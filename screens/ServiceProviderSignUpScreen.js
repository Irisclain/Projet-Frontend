import React from "react";
import { useState } from 'react';
import {
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
import Footer from '../components/Footer';
// import { useDispatch, useSelector } from 'react-redux';
// import {  } from '../reducers/user';




export default function ServiceProviderSignUpScreen({ navigation }) {

  const handleConnection = () => {
    navigation.navigate('TabNavigator');
  };
  
  return (
      <SafeAreaView style={styles.container}>
      <View style={styles.haut}>
        <Header navigation={navigation} accommodation=''/>
        <View style={styles.bider}>
          <Text>//ServiceProviderSignUpScreen === Page d'inscription pour un prestataire</Text>
        <TouchableOpacity onPress={() => handleConnection()} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>(//après connection//)Mes hébergements</Text>
        </TouchableOpacity>
          </View>
        </View>
        <Footer navigation={navigation} messageButton={true}/>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: Platform.OS === "android" ? 37 : 0,
    backgroundColor: '#DDD'
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