import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {
  SafeAreaView,
} from 'react-native-safe-area-context';
//import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import Footer from '../components/Footer';
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
      navigation.navigate('MyAccommodations');
  };
  
  return (
      <SafeAreaView style={styles.container}>
          <Image source={require('../assets/Logo-PA.png')} style={styles.logoImage} />

        <View style={styles.haut}>
          <View style={styles.buttonContainer}>
          <LinearGradient
            colors={['#CD43FD', '#FF7A00', '#FAB26F', '#FFE279']}
            start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
            style={styles.headers}>
            <TouchableOpacity style={styles.button} onPress={() => handleOwnerSignUp()}>
                <Text style={styles.buttonText}>Inscription Propriétaire</Text>
              </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
            colors={['#CD43FD', '#FF7A00', '#FAB26F', '#FFE279']}
            start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
            style={styles.headers}>
              <TouchableOpacity style={styles.button} onPress={() => handleServiceProviderSignUp()}>
                <Text style={styles.buttonText}>Inscription Prestataire</Text>
              </TouchableOpacity>
              </LinearGradient>
          </View>
          <Text style={styles.text}>Se connecter :</Text>
          <View style={styles.bider}>
            <TouchableOpacity onPress={() => handleConnection()} style={styles.signUpButtonFb} activeOpacity={0.8}>
            <Image source={require('../assets/Logo-fb.png')} style={styles.logoFb} />
                <Text style={styles.textButton}>Via Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleConnection()} style={styles.signUpButtonGoogle} activeOpacity={0.8}>
            <Image source={require('../assets/Logo-google.png')} style={styles.logoGoogle} />
                <Text style={styles.textButton}>Via Google</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleConnection()} style={styles.signUpButtonEmail} activeOpacity={0.8}>
              <Image source={require('../assets/Logo-email.png')} style={styles.logoEmail} />
                <Text style={styles.textButton}>Via email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bider :{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#fff',
  },
  button: {
    width: 168,
    height: 64,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderRadius: 10,
    margin: 2,
    justifyContent: 'center',
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    height: 41,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 40,
  },
  headers: {
    width: 172,
    height: 68,
    borderRadius: 10,
    borderRadius: 10,
    marginTop: -190,
    marginRight: 9,
    marginLeft: 9,
  },
  logoEmail:{
    width: '20%',
    height: '60%',
    marginLeft: -105,
  },
  logoFb:{
    width: '15%',
    height: '80%',
    marginLeft: -87,
  },
  logoGoogle:{
    width: '15%',
    height: '80%',
    marginLeft: -87,
  },
  logoImage:{
    alignItems: 'center',
    marginTop: -160,
   },
  signUpButtonEmail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d4d4d4',
    width: 280,
    height: 50,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#a6a6a6',
    shadowColor: '#ffe09',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 6.41,
    elevation: 4,
  },
  signUpButtonFb: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B589E',
    width: 280,
    height: 50,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#ffe09',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 6.41,
    elevation: 4,
  },
  signUpButtonGoogle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DC4B38',
    width: 280,
    height: 50,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#ffe09',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 6.41,
    elevation: 4,
  },
  text: {
    fontSize: 18,
    alignSelf: 'center',
  },
  textButton: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
    marginLeft: 50,
  },
});