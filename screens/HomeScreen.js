import React from "react";
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import { useDispatch, useSelector } from 'react-redux';
// import {  } from '../reducers/user';




export default function HomeScreen({ navigation }) {
  const handleOwnerSignUp = () => {
      navigation.navigate('OwnerSignUp');
  };
  const handleServiceProviderSignUp = () => {
      navigation.navigate('ServiceProviderSignUp');
  };
  const handleConnection = () => {
    navigation.navigate('TabNavigator');
  };
  
  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.haut}>
          <View style={styles.bider}>
            <Text>//Screen HomeScreen === Page d'accueil avant connexion//</Text>
            <TouchableOpacity onPress={() => handleOwnerSignUp()} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>SignUp Propriétaire</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleServiceProviderSignUp()} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>SignUp Prestataire</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleConnection()} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>(//après connection//) Mes hébergements</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Message')} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>(//Vers la Messagerie//)</Text>
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
    justifyContent: 'flex-start',
    marginTop: Platform.OS === "android" ? 37 : 0,
    backgroundColor: '#DDD',
    borderWidth: 1,
    borderColor: 'red',
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