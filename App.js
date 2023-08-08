// import React from "react";
import { 
  useNavigation, 
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AddAccommodationScreen from './screens/AddAccommodationScreen';
import AgenciesScreen from './screens/AgenciesScreen';
import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';
import MessageScreen from './screens/MessageScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import MyAccommodationsScreen from './screens/MyAccommodationsScreen';
import OneAccommodationScreen from './screens/OneAccommodationScreen';
import OwnerSignUpScreen from './screens/OwnerSignUpScreen';
import ReservationsScreen from './screens/ReservationsScreen';
import ServiceProviderSignUpScreen from './screens/ServiceProviderSignUpScreen';
import ServiceProvidersScreen from './screens/ServiceProvidersScreen';
import LoadingSignInScreen from './screens/LoadingSignInScreen';
import LoadingSignUpScreen from './screens/LoadingSignUpScreen';
// import Header from './components/Header';
import Footer from './components/Footer';
import {
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {StatusBarStyle} from 'react-native';
import currentRoute  from './reducers/currentRoute';
import currentAccommodation from './reducers/currentAccommodation';
import currentReservation from './reducers/currentReservation';
import user from './reducers/user';
// import message from './reducers/message';
// import accommodation from './reducers/accommodation';*/

const store = configureStore({
  reducer: { currentAccommodation, currentRoute, user, currentReservation },
});
const tabBarItemStyle = Dimensions.get('window').width/4;

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator 
    screenOptions={{
      tabBarActiveTintColor: '#FF7A00',
      tabBarInactiveTintColor: 'black',
      tabBarItemStyle: { width: Dimensions.get('window').width/4, height: 40, marginTop:-10 },
      tabBarIndicatorStyle: { backgroundColor: '#FF7A00' },
      tabBarLabelStyle: { fontSize: 12, margin:-6 },
    }}
    >
      <Tab.Screen name="Reservations" component={ReservationsScreen} options={{  title: 'Réservations' }} />
      <Tab.Screen name="Agencies" component={AgenciesScreen} options={{  title: 'Distribution' }} />
      <Tab.Screen name="ServiceProviders" component={ServiceProvidersScreen} options={{  title: 'Prestataires' }} />
      <Tab.Screen name="OneAccommodation" component={OneAccommodationScreen} options={{  title: 'Description' }} />
    </Tab.Navigator>
  );
};

 
    // ESSAYER : 
    // <SafeAreaProvider store={store}>
    // </SafeAreaProvider>


      const Header = () => {
      const currentRoute = useSelector((state) => state.currentRoute.value);
      const currentAccommodation = useSelector((state) => state.currentAccommodation.value); 
      // console.log ('nom de la page : ', currentRoute);
      // console.log ('nom de l\'hébergement : ', currentAccommodation);

      const navigation=useNavigation();
      if (currentRoute==='Home'){
        return ;
      } else {
        let destination = 'MyAccommodations';
        if (currentRoute==='OwnerSignUp' || currentRoute==='ServiceProviderSignUp'){
          destination = 'Home';
        }
        let currentAccommodationSrc;
        let currentAccommodationName;
        let currentAccommodationContainerStyle;
        if (currentAccommodation.name){
          currentAccommodationSrc=currentAccommodation.picture;
          currentAccommodationName=currentAccommodation.name.substring(0, 28);
          currentAccommodationContainerStyle = styles.currentAccommodationContainer;
        };
        
        return (
          <View>
          <ImageBackground source={require('./assets/Fond-banniere.png')} style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate(destination)} activeOpacity={0.3}>
              <Image source={require('./assets/Logo-banniere.png')} style={styles.logo} />
            </TouchableOpacity>            
            <TouchableOpacity onPress={() => navigation.navigate('OneAccommodation')} activeOpacity={0.3} style={currentAccommodationContainerStyle}>
              <Text style={styles.currentAccommodationTitle}>{currentAccommodationName}</Text>
              <Image
                style={styles.currentAccommodationImage}
                source={{ uri:currentAccommodationSrc }}
              />
            </TouchableOpacity>
          </ImageBackground>
          </View>
        );
        }
    };


export default function App() {

  return (
  <Provider store={store}>
    <NavigationContainer>
      <StatusBar animated={false} backgroundColor="#000"/>
      <Header/>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LoadingSignIn" component={LoadingSignInScreen} />
        <Stack.Screen name="OwnerSignUp" component={OwnerSignUpScreen} />
        <Stack.Screen name="ServiceProviderSignUp" component={ServiceProviderSignUpScreen} />
        <Stack.Screen name="LoadingSignUp" component={LoadingSignUpScreen} />
        <Stack.Screen name="MyProfile" component={MyProfileScreen} />
        <Stack.Screen name="MyAccommodations" component={MyAccommodationsScreen} />
        <Stack.Screen name="AddAccommodation" component={AddAccommodationScreen} />
        <Stack.Screen name="OneAccommodation" component={OneAccommodationScreen} />
        <Stack.Screen name="Reservations" component={ReservationsScreen} />
        <Stack.Screen name="ServiceProviders" component={ServiceProvidersScreen} />
        <Stack.Screen name="Message" component={MessageScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
  )
}

const styles = StyleSheet.create({
  header: {
    height:84,
    width: Dimensions.get('window').width,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop:12,
    paddingBottom:12,
  },
  logo:{
    top: 5,
    left: 5,
    width: 180,
    height: 50,
  },
  currentAccommodationContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    color: 'white',
    fontSize: 14,
    margin: 6,
    marginLeft:18,
    marginRight:0,
    padding: 0,
    paddingRight: 0,
    borderRadius: 6,
    borderWidth: 0,
    borderColor: '#FAB26F',
    backgroundColor: '#222',
    width: Dimensions.get('window').width - 198,   
  },
  currentAccommodationTitle:{
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    justifyContent: 'center',
    width: 120,   
  },
  currentAccommodationImage:{
    width: 72,
    height: 48,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    margin: 0,
    marginLeft: 3,
  }
});