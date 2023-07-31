import { NavigationContainer } from '@react-navigation/native';
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
    screenOptions={() => ({
      tabBarStyle: {
          borderRadius: 10,
          marginTop: Platform.OS === "android" ? 37 : 0,
      },
    })}
    // screenOptions={({ route }) => ({
    //   tabBarIcon: ({ color, size }) => {
    //     let iconName: string = '';

    //     if (route.name === 'Snap') {
    //       iconName = 'camera';
    //     } else if (route.name === 'Gallery') {
    //       iconName = 'image';
    //     }

    //     return <FontAwesome name={iconName} size={size} color={color} />;
    //   },
    //   tabBarActiveTintColor: '#e8be4b',
    //   tabBarInactiveTintColor: '#b2b2b2',
    //   headerShown: false,
    // })}
    >
      <Tab.Screen name="MyAccommodations" component={MyAccommodationsScreen} />
      <Tab.Screen name="Reservations" component={ReservationsScreen} />
      <Tab.Screen name="Agencies" component={AgenciesScreen} />
      <Tab.Screen name="ServiceProviders" component={ServiceProvidersScreen} />
      <Tab.Screen name="OneAccommodation" component={OneAccommodationScreen} />
    </Tab.Navigator>
  );
};

    // <Provider store={store}>
    // </Provider>
    // ESSAYER : 
    // <SafeAreaProvider store={store}>
    // </SafeAreaProvider>

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="OwnerSignUp" component={OwnerSignUpScreen} />
          <Stack.Screen name="AddAccommodation" component={AddAccommodationScreen} />
          <Stack.Screen name="ServiceProviderSignUp" component={ServiceProviderSignUpScreen} />
          <Stack.Screen name="Message" component={MessageScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

