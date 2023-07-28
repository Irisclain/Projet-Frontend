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


const handleConnection = () => {
  navigation.navigate('MyAccommodationsScreen');
};


export default function ServiceProviderSignUpScreen() {

  return (
      <View style={styles.inputContainer}>
        <Text>Page d'inscription pour un prestataire</Text>
        <TouchableOpacity onPress={() => handleConnection()} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>(//après connection//)Mes hébergements</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>(//retour à la page des inscriptions//)</Text>
        </TouchableOpacity>
      </View>
  );
}