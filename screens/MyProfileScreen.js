import React from "react";
import {
  Dimensions,
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
        <View style={styles.inputsContainer}>
          <View style={styles.inputLine}>
            <TextInput placeholder="Prénom" style={styles.title} value={formData.firstname} onChangeText={(text) => setFormData({ ...formData, firstname: text })}/>
            <Text style={styles.title}> </Text>
            <TextInput placeholder="Nom" style={styles.title} value={formData.lastname} onChangeText={(text) => setFormData({ ...formData, lastname: text })}/>
          </View>
          <View style={styles.inputLine}>
            <Text>Alias : </Text>
            <TextInput placeholder="Nom d'utilisateur..." style={styles.inputs} value={formData.username} onChangeText={(text) => setFormData({ ...formData, username: text })}/>
          </View>
            <TextInput placeholder="Email..." style={styles.inputs} value={formData.email} onChangeText={(text) => setFormData({ ...formData, email: text })}/>
            <View style={styles.passwordContainer}>
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
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
    margin: 0,
    padding: 20,
    width: Dimensions.get("window").width,
  },
  title: {
    fontSize: 30,
    marginTop: 0,
    marginBottom: 22,
    fontWeight: "600",
    color: "#FF7A00",
    justifyContent: 'center',
    marginBottom: 10,
  },
  inputLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    // width: Dimensions.get("window").width - 30,
  },
  inputsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: Dimensions.get("window").width - 30,
    backgroundColor: "white",
    padding: 12,
    borderWidth: 1,
    borderColor: "#FF7A00",
    borderRadius: 12,
    margin: 0,
    marginBottom: 3,
    marginTop: 12,
  },
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
  passwordContainer: {
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
});