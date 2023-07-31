import React from "react";
import { useState, useEffect } from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Button,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { useDispatch, useSelector } from 'react-redux';
// import {  } from '../reducers/user';
// import {  } from '../reducers/accommodations';
// import {  } from '../reducers/messages';





export default function MyAccommodationsScreen({ navigation }) {

    const [accommodation, setAccommodation] = useState([]);
  
    useEffect(() => {
      const newAccommodation = (
        <View style={styles.accomodationcontainer}>
          <Image source={require('../assets/favicon.png')} />
          <View>
            <Text style={{fontSize: 20, marginTop:-40}}>Titre du bien !</Text>
            <Text>Description de l'Appartement</Text> 
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('AddAccommodationScreen')} style={styles.memobutton}>
            <Text>mémo d'achats</Text>
          </TouchableOpacity>
        </View>
      );
  
      setAccommodation((prevAccommodation) => [...prevAccommodation, newAccommodation]);
    }, []);
  
   
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize:30}}>Mes Hébergements</Text>
    {/* <View>{accommodation}</View>   */}
      <Text>MyAccommodationsScreen === Page de tous les hébergements (navigation par tab)</Text>
      <View style={styles.containerbutton}>
        <TouchableOpacity onPress={() => navigation.navigate('AddAccommodation')} style={styles.button} activeOpacity={0.8}>
          <LinearGradient
     colors={['#CD83FD', '#FAB28F', '#FFE279','white']}
     start={{ x: 1.0, y: 0.0 }} end={{ x: 1.0, y: 1.0 }}
     height={50}
     borderRadius={20}
     
     >
            <Text style={styles.textButton}>Nouvel Hébergement</Text>
            </LinearGradient>
        </TouchableOpacity>
        </View>
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
  containerbutton:{
    paddingTop:500,
    display: 'flex',
    flexDirection:'column',
    alignItems:'center',
    
  },
  textButton: {  
    paddingLeft:5,
    paddingTop:10,  
    width: 200,
    height: '100%',
    fontWeight: '400',
    fontSize: 20,
  },
  
  accomodationcontainer: {
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height:120,
    paddingTop: 8,
    width: '100%',
    marginTop: 30,  
    backgroundColor: 'white',
    paddingLeft:20,
    paddingRight:20,
  },
  memobutton: {
    alignItems:'center',
    justifyContent: 'center',
    borderColor: '#fbe29c',
    borderWidth:2,
    width: 80,
    height: 80,
    borderRadius:40,
  },  
});
