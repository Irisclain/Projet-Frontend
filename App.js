// import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AddAccommodationScreen from './screens/AddAccommodationScreen';
import AgenciesScreen from './screens/AgenciesScreen';
import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';
import MessageScreen from './screens/MessageScreen';
import MyAccommodationsScreen from './screens/MyAccommodationsScreen';
import OneAccommodationScreen from './screens/OneAccommodationScreen';
import OwnerSignUpScreen from './screens/OwnerSignUpScreen';
import ReservationsScreen from './screens/ReservationsScreen';
import ServiceProviderSignUpScreen from './screens/ServiceProviderSignUpScreen';
import ServiceProvidersScreen from './screens/ServiceProvidersScreen';
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
import {StatusBarStyle} from 'react-native';

// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import user from './reducers/user';
// import message from './reducers/message';
// import accommodation from './reducers/accommodation';*/


const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator 
    screenOptions={{
      tabBarActiveTintColor: '#FF7A00',
      tabBarInactiveTintColor: 'black',
      style: { marginTop: -10, marginBottom: 12 },
      tabBarIndicatorStyle: { backgroundColor: '#FF7A00' },
    }}
    >
      <Tab.Screen name="Reservations" component={ReservationsScreen} options={{  title: 'Réservations' }} />
      <Tab.Screen name="Agencies" component={AgenciesScreen} options={{  title: 'Distribution' }} />
      <Tab.Screen name="ServiceProviders" component={ServiceProvidersScreen} options={{  title: 'Prestations' }} />
    </Tab.Navigator>
  );
};

    // <Provider store={store}>
    // </Provider>
    // ESSAYER : 
    // <SafeAreaProvider store={store}>
    // </SafeAreaProvider>


    const Header = () => {
      const navigation = useNavigation();
    
      return (
        <View>
        <ImageBackground source={require('./assets/Fond-banniere.png')} style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('MyAccommodations')} activeOpacity={0.3}>
            <Image source={require('./assets/Logo-banniere.png')} style={styles.logo} />
          </TouchableOpacity>
          <Text style={styles.accommodationTitle}></Text>        
        </ImageBackground>
        </View>
      );
    };    






export default function App() {

  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        //barStyle={statusBarStyle}
        //showHideTransition={statusBarTransition}
        //hidden={hidden}
      />
      {/* <Header navigation={navigation} accommodation=''/> */}
      <Header/>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="OwnerSignUp" component={OwnerSignUpScreen} />
      <Stack.Screen name="ServiceProviderSignUp" component={ServiceProviderSignUpScreen} />
      <Stack.Screen name="MyAccommodations" component={MyAccommodationsScreen} />
      <Stack.Screen name="AddAccommodation" component={AddAccommodationScreen} />
      {/* <Stack.Screen name="ServiceProviders" component={ServiceProvidersScreen} options={{ title: 'Prestations' }} /> */}
      <Stack.Screen name="Message" component={MessageScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
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
    //marginTop: Platform.OS === "android"? 37 : 0,
  },
  logo:{
    top: 5,
    left: 5,
    width: 180,
    height: 50,
  },
  accommodationTitle:{
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
});

