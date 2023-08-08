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
import Footer from "../components/Footer";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentRoute } from '../reducers/currentRoute';
import { updateCurrentAccommodation } from '../reducers/currentAccommodation';
import { addUser, login, logout } from '../reducers/user';

const BACKEND_ADDRESS = 'https://stay-backend.vercel.app';

export default function MyProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.value);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(user);
  
  const [statistics, setStatistics] = useState({accommodationNb: 0, prices: '', earnings: 0, earningsWithoutUs: 0});

  useEffect(() => {
    dispatch(updateCurrentRoute('MyProfile'));  
    dispatch(updateCurrentAccommodation({}));

    fetch(`${BACKEND_ADDRESS}/users/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setFormData(data);
      });

    fetch(`${BACKEND_ADDRESS}/accommodation/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        //console.log('allDatas : ', data);
        let accommodationNb = data.length;
        let dailyEarnings=0;
        let prices = '';
        
        for (let i = 0; i < accommodationNb-2; i++) {
          dailyEarnings = dailyEarnings + data[i].price;
          prices += data[i].price.toString() + ', ';
          //console.log('daily : ', data[i].price, dailyEarnings, ' et la phrase ', prices);
        }
        
        if (accommodationNb > 1) {
          dailyEarnings = dailyEarnings + data[accommodationNb-2].price;
          prices += data[accommodationNb-2].price.toString() + ' et ';
          //console.log('daily : ', data[accommodationNb-2].price, dailyEarnings, ' et la phrase ', prices);
        }

        dailyEarnings = dailyEarnings + data[accommodationNb-1].price;
        prices += data[accommodationNb-1].price.toString();
        //console.log('daily : ', data[accommodationNb-1].price, dailyEarnings, ' et la phrase ', prices);



        let earnings = dailyEarnings*30;
        let lowEarnings = earnings / 10;
        setStatistics({accommodationNb: accommodationNb, prices:prices, earnings:earnings, earningsWithoutUs: lowEarnings});
      });


  }, []);

  //const users = useSelector((state) => state.user.value);
  //console.log(users);

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Home");
  };

  const handleUpdateUser = () => {
    // fetch(`${BACKEND_ADDRESS}/users/signup`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // })
    // .then(response => response.json())
    // .then(data => {
    //     if (data) {
    //       console.log('Utilisateur enregistré avec succès!');
    //       //dispatch(addUser(formData));
    //       dispatch(login({ username: formData.username, token: data.token }));
    //       //console.log({ username: formData.username, token: data.token });
    //       navigation.navigate('MyAccommodations');
    //     } else {
    //       console.error('Erreur lors de l\'enregistrement de l\'utilisateur');
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
    //   });
  };
  
  return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Text style={styles.disclaimer}>Modifiez vos informations en appuyant sur un élément</Text>
        <View style={styles.inputsContainer}>
          <View style={styles.inputLine}>
            <TextInput placeholder="Prénom" style={styles.title} value={formData.firstname} onChangeText={(text) => setFormData({ ...formData, firstname: text })}/>
            <Text style={styles.title}> </Text>
            <TextInput placeholder="Nom" style={styles.title} value={formData.lastname} onChangeText={(text) => setFormData({ ...formData, lastname: text })}/>
          </View>
          <View style={styles.inputLine}>
            <Text style={styles.inputLabel}>Pseudo : </Text>
            <TextInput style={styles.inputText} placeholder="Nom d'utilisateur..." value={formData.username} onChangeText={(text) => setFormData({ ...formData, username: text })}/>
          </View>
          <View style={styles.inputLine}>
            <Text style={styles.inputLabel}>Email : </Text>
            <TextInput style={styles.inputText} placeholder="Email..." value={formData.email} onChangeText={(text) => setFormData({ ...formData, email: text })}/>
          </View>
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
            <TouchableOpacity onPress={() => handleUpdateUser()}>
              <Text style={styles.submitButton}>Enregistrer les modifications</Text>
            </TouchableOpacity>
          </View>
        <Text>Vos statistiques sur StayNomad Gestion</Text>
        <View onPress={() => handleLogout()} style={styles.dataContainer}>
          <Text style={styles.dataText}>- Nombres d'annonces sur l'appli : {statistics.accommodationNb}</Text>
          <Text style={styles.dataText}>- Tarifs de vos hébergements : {statistics.prices} euros à la nuitée</Text>
          <Text style={styles.dataText}>- Revenus potentiels sur 30 jours : {statistics.earnings} euros</Text>
        </View>
        <TouchableOpacity onPress={() => handleLogout()} style={styles.inputsContainer}>
          <Text style={styles.title}>Déconnexion</Text>
        </TouchableOpacity>
      <Footer navigation={navigation} messageButton={true} />
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
    fontSize: 25,
    marginTop: 0,
    fontWeight: "600",
    color: "#FF7A00",
    justifyContent: 'center',
  },
  inputLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'left',
    padding: 3,
    width: Dimensions.get("window").width - 58,
  },
  inputText: {
    fontSize: 18,
  },
  inputLabel: {
    fontSize: 18,
    color: "#666",
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
    marginBottom: 22,
  },
  dataContainer: {
    width: Dimensions.get("window").width - 30,
    backgroundColor: "white",
    padding: 12,
    borderWidth: 1,
    borderColor: "#FF7A00",
    borderRadius: 12,
    margin: 0,
    marginBottom: 22,
  },
  dataText: {
    fontSize: 16,
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
    fontSize: 18,
  },
  passwordContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get("window").width - 80,
    height: 40,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    borderWidth:1,
    borderColor: '#FF7A00',
    backgroundColor: '#FFF',
    textAlign: 'center',
    width: Dimensions.get('window').width-58,
    margin: 2,
    martginTop: 10,
  },
  submitButton:{
    height: 40,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    borderWidth:1,
    borderColor: '#FF7A00',
    backgroundColor: '#FFF',
    textAlign: 'center',
    width: Dimensions.get('window').width-58,
    fontSize: 18,
    padding: 7,
    color: '#FF7A00',
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