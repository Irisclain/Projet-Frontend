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




export default function OwnerSignUpScreen({ navigation }) {

  const handleConnection = () => {
    navigation.navigate('MyAccommodationsScreen');
  };
  
  return (
      <View style={styles.inputContainer}>
        <Text>Page d'inscription pour un propriétaire</Text>
        <TouchableOpacity onPress={() => handleConnection()} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>(//après connection//)Mes hébergements</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>(//retour à la page des inscriptions//)</Text>
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