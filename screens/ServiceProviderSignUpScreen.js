import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { updateCurrentRoute } from '../reducers/currentRoute';
import { updateCurrentAccommodation } from '../reducers/currentAccommodation';
import { addUser } from '../reducers/user';
import { useDispatch } from 'react-redux';

const BACKEND_ADDRESS = 'http://192.168.1.77:3000';

export default function ServiceProviderSignUpScreen({ navigation }) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(updateCurrentRoute('ServiceProviderSignUp'));    
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    services: {
      prestation: '',
      company: '',
      address: '',
      position: ''},
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    role: 'prestataire',
  });

  const selectPrestation = (presta) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      services: {
        ...prevFormData.services,
        prestation: presta,
      },
    }));
    setModalVisible(false);
  };

  const handlePressOpen = () => {
    setModalVisible(true);
  };

  const handleNewUser = () => {
    console.log("formData:", formData);
    fetch(`${BACKEND_ADDRESS}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Utilisateur enregistré avec succès!');
          dispatch(addUser(formData));
          navigation.navigate('MyAccommodations');
        } else {
          console.error('Erreur lors de l\'enregistrement de l\'utilisateur');
        }
      })
      .catch((error) => {
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
      });
  };
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.haut}>
        <Text style={styles.title}>Inscription Prestataire</Text>
          <View style={styles.bider}>
          <TextInput
            placeholder="Prestation..."
            style={styles.inputs}
            value={formData.services.prestation}
            editable={false}
            onChangeText={(text) => setFormData(prevFormData => ({
              ...prevFormData,
              services: {
                ...prevFormData.services,
                prestation: text,
              }
              }))}/>
            <View style={styles.buttons}> 
            <TouchableOpacity onPress={handlePressOpen}>
              <FontAwesome name="angle-down" color="#868686" size={25} />
            </TouchableOpacity>
            </View>
            <Modal
              animationType="none"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Pressable onPress={() => selectPrestation('Ménage')}>
                    <Text style={styles.modalText}>Ménage</Text>
                  </Pressable>
                  <Pressable onPress={() => selectPrestation('Dépannage')}>
                    <Text style={styles.modalText}>Dépannage</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <TextInput placeholder="Entreprise..." style={styles.inputs} onChangeText={(text) => setFormData(prevFormData => ({
              ...prevFormData,
              services: {
                ...prevFormData.services,
                company: text,
              },
            }))}/>
            <TextInput placeholder="Adresse..." style={styles.inputs} onChangeText={(text) => setFormData(prevFormData => ({
              ...prevFormData,
              services: {
                ...prevFormData.services,
                address: text,
              },
            }))} />
            <TextInput placeholder="Position..." style={styles.inputs} onChangeText={(text) => setFormData(prevFormData => ({
              ...prevFormData,
              services: {
                ...prevFormData.services,
                position: text,
              },
            }))}/>
            <TextInput placeholder="Nom..." style={styles.inputs} onChangeText={(text) => setFormData({ ...formData, lastname: text })}/>
            <TextInput placeholder="Prénom..." style={styles.inputs} onChangeText={(text) => setFormData({ ...formData, firstname: text })}/>
            <TextInput placeholder="Username..." style={styles.inputs} onChangeText={(text) => setFormData({ ...formData, username: text })}/>
            <TextInput placeholder="Email..." style={styles.inputs} onChangeText={(text) => setFormData({ ...formData, email: text })}/>
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
            </View>
            <TouchableOpacity onPress={() => handleNewUser()} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>S'inscrire</Text>
            </TouchableOpacity>
            <Text style={styles.text}>ou</Text>
            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => handleNewUser()} style={styles.signUpButtonFb} activeOpacity={0.8}>
            <Image source={require('../assets/Logo-fb.png')} style={styles.logoFb} />
                <Text style={styles.buttonText}>Via Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNewUser()} style={styles.signUpButtonGoogle} activeOpacity={0.8}>
            <Image source={require('../assets/Logo-google.png')} style={styles.logoGoogle} />
                <Text style={styles.buttonText}>Via Google</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  bider: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d4d4d4',
    width: 280,
    height: 50,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#a6a6a6',
  },
  buttons:{
    position: 'absolute',
    right: 100,
    top: 2,
  }, 
  buttonContainer: {
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 30,
  },
  centeredView: {
    position: 'absolute',
    top: 200,
    left: 220,
    right: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 40,
  },
  haut: {
    alignItems: 'center',
    width: '100%',
  },
  inputs: {
    width: 280,
    height: 30, 
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
    right: 15,
    bottom: 25,
    zIndex: 1,
  },
  logoFb:{
    width: 27,
    height: 33,
    position: 'absolute',
    top: '40%',
    left: '50%',
    marginLeft: -13.5,
    marginTop: -26.5, 
  },
  logoGoogle:{
    width: 27,
    height: 33,
    position: 'absolute',
    top: '43%',
    left: '50%',
    marginLeft: -13.5,
    marginTop: -26.5, 
  },
  modalText: {
    margin: 5,
    textAlign: 'center',
    fontSize: 16,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  signUpButtonFb: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B589E',
    width: 153,
    height: 103,
    borderRadius: 10,
    marginRight: 15,
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DC4B38',
    width: 153,
    height: 103,
    borderRadius: 10,
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
    marginBottom: 10,
    marginTop: 10,
  },
  textButton: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    color: '#000',
    fontSize: 24,
    justifyContent: 'center',
    textAlign: 'center',
    textDecorationLine:'underline',
    marginBottom: 10,
    marginTop: -10,
  },
});