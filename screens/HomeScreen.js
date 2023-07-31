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
// import { useDispatch, useSelector } from 'react-redux';
// import {  } from '../reducers/user';




export default function HomeScreen({ navigation }) {
  const handleOwnerSignUp = () => {
      navigation.navigate('OwnerSignUpScreen');
  };
  const handleServiceProviderSignUp = () => {
      navigation.navigate('ServiceProviderSignUpScreen');
  };
  const handleConnection = () => {
    navigation.navigate('TabNavigator');
  };
  
  return (
      <View style={styles.inputContainer}>
        <Text>HomeScreen</Text>
        <TouchableOpacity onPress={() => handleOwnerSignUp()} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>SignUp Propriétaire</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleServiceProviderSignUp()} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>SignUp Prestataire</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleConnection()} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>(//après connection//) Mes hébergements</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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