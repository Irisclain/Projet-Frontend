import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {
  SafeAreaView,
} from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { updateCurrentRoute } from '../reducers/currentRoute';
import { updateCurrentAccommodation } from '../reducers/currentAccommodation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';


const BACKEND_ADDRESS = 'https://stay-backend.vercel.app';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  useEffect(() => {
    dispatch(updateCurrentRoute('Home'));    
  }, []);
  
  const handleOwnerSignUp = () => {
      navigation.navigate('OwnerSignUp');
  };
  const handleServiceProviderSignUp = () => {
      navigation.navigate('ServiceProviderSignUp');
  };

  const handleConnection = () => {
      navigation.navigate('MyAccommodations');
  };

  const handlePressOpen = () => {
    setModalVisible(true);
  };

  const handleUserConnexion = () => {
      fetch(`${BACKEND_ADDRESS}/users/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then(response => response.json())
    .then(data => {
      if (data.result) {
            console.log('Connexion réussie!');
            navigation.navigate('MyAccommodations');
          } else {
            console.error('Utilisateur inconnu');
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la connexion de l\'utilisateur:', error);
        });
        setModalVisible(false); 
    };
  return (
      <SafeAreaView style={styles.container}>
        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
        <TextInput placeholder="Username..." style={styles.inputs} onChangeText={(text) => setFormData({ ...formData, username: text })}/>
        <View style={styles.inputsContainer}>
          <TextInput
            secureTextEntry={!showPassword}
            placeholder="*** Mot de passe ***"
            style={styles.inputs}
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}/>
          <TouchableOpacity
            onPress={() => setShowPassword((prevShowPassword) => !prevShowPassword)}
            style={styles.iconContainer}>
            <FontAwesome name={showPassword ? 'eye' : 'eye-slash'} size={24} color="#a6a6a6" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} activeOpacity={0.8} onPress={() => handleUserConnexion()}>
            <Text style={styles.textButtons}>Connexion</Text>
          </TouchableOpacity>
          </View>
          </View>
      </View>
      </Modal>
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
            <LinearGradient
            colors={['#CD43FD', '#FF7A00', '#FAB26F', '#FFE279']}
            start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
            style={styles.signInButtonConnexion}>
            <TouchableOpacity onPress={() => handlePressOpen()} activeOpacity={0.8}>
                <Text style={styles.textButtonConnexion}>Connexion</Text>
            </TouchableOpacity>
            </LinearGradient>
          <Text style={styles.text}>Ou connexion :</Text>
          <View style={styles.bider}>
            <TouchableOpacity onPress={() => handleConnection()} style={styles.signUpButtonFb} activeOpacity={0.8}>
            <Image source={require('../assets/Logo-fb.png')} style={styles.logoFb} />
                <Text style={styles.textButton}>Via Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleConnection()} style={styles.signUpButtonGoogle} activeOpacity={0.8}>
            <Image source={require('../assets/Logo-google.png')} style={styles.logoGoogle} />
                <Text style={styles.textButton}>Via Google</Text>
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
    borderRadius: 8,
    margin: 2,
    justifyContent: 'center',
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#d4d4d4',
    width: 280,
    height: 50,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#a6a6a6',
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  centeredView: {
    position: 'absolute',
    bottom: 300,
    left: 20,
    right: 20,
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
  inputs: {
    width: 280,
    height: 50, 
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#a6a6a6',
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 18,
    paddingHorizontal: 12,
  },
  inputsContainer: {
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    right: 65,
    bottom: 98,
    zIndex: 1,
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
  modalView: {
    paddingVertical: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 100,
  },
  signInButtonConnexion: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d4d4d4',
    alignSelf: 'center',
    width: 280,
    height: 50,
    borderRadius: 10,
    marginBottom: 35,
    marginTop: -35,
    shadowColor: '#868686',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 15,
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
    marginTop:10,
  },
  textButton: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
    marginLeft: 50,
  },
  textButtons: {
    color: 'white',
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  textButtonConnexion: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});