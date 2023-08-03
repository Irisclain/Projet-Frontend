import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentRoute } from '../reducers/currentRoute';
import { updateCurrentAccommodation } from '../reducers/currentAccommodation';
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
// import {  } from '../reducers/accommodations';
// import {  } from '../reducers/messages';


const BACKEND_ADDRESS = 'https://stay-backend.vercel.app';


export default function OneAccommodationScreen({ navigation }) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(updateCurrentRoute('OnneAccommodation'));
    dispatch(updateCurrentAccommodation({}));
  }, []);

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.haut}>
          <Header navigation={navigation} accommodation=''/>
          <View style={styles.bider}>
            <Text style={styles.textButton}>(//bas de page//) Messagerie</Text>
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
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
});