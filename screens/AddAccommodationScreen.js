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
// import {  } from '../reducers/accommodations';
// import {  } from '../reducers/messages';





export default function AddAccommodationScreen({ navigation }) {

  return (
      <SafeAreaView style={styles.container}>
      <Text>//AddAccommodationScreen === Page pour ajouter un hébergement</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Message')} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>(//bas de page//) Messagerie</Text>
        </TouchableOpacity>
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
