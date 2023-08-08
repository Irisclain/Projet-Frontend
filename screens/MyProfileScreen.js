import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentRoute } from '../reducers/currentRoute';
import { updateCurrentAccommodation } from '../reducers/currentAccommodation';
import { addUser, login, logout } from '../reducers/user';

const BACKEND_ADDRESS = 'https://stay-backend.vercel.app';

export default function OwnerSignUpScreen({ navigation }) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(updateCurrentRoute('OwnerSignUp'));  
    dispatch(updateCurrentAccommodation({}));  
  }, []);

  //const users = useSelector((state) => state.user.value);
  //console.log(users);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    role: 'propriétaire',
    services: {
      prestation: '',
      company: '',
      address: '',
      position: ''},
  });


  const handleNewUser = () => {
    fetch(`${BACKEND_ADDRESS}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
          console.log('Utilisateur enregistré avec succès!');
          //dispatch(addUser(formData));
          dispatch(login({ username: formData.username, token: data.token }));
          //console.log({ username: formData.username, token: data.token });
          navigation.navigate('MyAccommodations');
        } else {
          console.error('Erreur lors de l\'enregistrement de l\'utilisateur');
        }
      })
      .catch((error) => {
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
      });
  };
  console.log()
  
  return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
         <View style={styles.haut}>
        <Text style={styles.title}>Mon profil</Text>
          <View style={styles.bider}>
            <TextInput placeholder="Nom..." style={styles.inputs} value={formData.lastname} onChangeText={(text) => setFormData({ ...formData, lastname: text })}/>
            <TextInput placeholder="Prénom..." style={styles.inputs} value={formData.firstname} onChangeText={(text) => setFormData({ ...formData, firstname: text })}/>
            <TextInput placeholder="Nom d'utilisateur..." style={styles.inputs} value={formData.username} onChangeText={(text) => setFormData({ ...formData, username: text })}/>
            <TextInput placeholder="Email..." style={styles.inputs} value={formData.email} onChangeText={(text) => setFormData({ ...formData, email: text })}/>
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
                <Text style={styles.textButton}>Enregistrer les modifications</Text>
            </TouchableOpacity>
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
    height: 50, 
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
    bottom: 33,
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
    marginTop: 40,
  },
});