import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Dimensions,
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
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentRoute } from '../reducers/currentRoute';
import { updateCurrentAccommodation } from '../reducers/currentAccommodation';
import { useIsFocused } from '@react-navigation/native';  
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { addUser, login, logout } from '../reducers/user';
import Footer from '../components/Footer';

const BACKEND_ADDRESS = "https://stay-backend.vercel.app";

export default function MyAccommodationsScreen() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const user = useSelector(state => state.user.value);
  //console.log('Tout sur l\'user : ' , user); 
  // Ce console.log nous a servi à vérifier le bon fonctionnement du reducer user, 
  // et notamment le bon passage du token
  
  const [accommodationsData, setAccommodationsData] = useState([]);

  useEffect(() => {
    if (isFocused) {
      dispatch(updateCurrentRoute("MyAccommodations"));
      dispatch(updateCurrentAccommodation({}));
    }

    // En environnement de travail, il nous a été utile de simuler un faux utilisateur, 
    // pour faire des tests sans avoir besoin de ce connecter.
    // Ici, nous avons repris le token de MaximusProprio
    let ownerToken = 'kZg43tvoorU8F5ypqMv5QZBYZjLC426k' 

    // Dans une première partie du projet, le reducer user n'était pas encore développé, 
    // et la liste des hébergements de l'utilisateur était retrouvée par son id.
    // let owner = '64d0ab5e432f8c174dfa08c7'; // Il faudra prendre le user en Store. Pour l'instant, c'est Maxime

    // Mais dans le cas d'une vraie connexion (seule possible, hors environnement de travail, pour atteindre cette page), 
    // le faux token est écrasé par le vrai

    if (user.token!==null) {
      ownerToken = user.token;
    }

    fetch(`${BACKEND_ADDRESS}/accommodation/${ownerToken}`)
      .then((response) => response.json())
      .then((data) => {
        //console.log('allDatas : ', data);
        setAccommodationsData(data);
      });
  
    }, [isFocused]);


  const navigation = useNavigation();
  const accommodations = accommodationsData.map((data, i) => {
    // console.log(data.picture)
    const handleWorkOnOneAccommodation = (id) => {
      navigation.navigate("TabNavigator");
      dispatch(updateCurrentAccommodation(id));
    };
    return (
      <TouchableOpacity
        onPress={() => handleWorkOnOneAccommodation(data)}
        style={styles.accommodationContainer}
        key={i}
      >
        <Image
          // pour éviter le warning uri en environment de travail
          source={
            data.picture
              ? { uri: data.picture }
              : require("../assets/faux-appart-1.jpg")
          }
          style={styles.accommodationPicture}
        />
        <View style={styles.accommodationText}>
          <Text style={styles.accommodationTitle}>
            {data.name.substring(0, 20)}...
          </Text>
          <Text>{data.description.substring(0, 86)}...</Text>
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {user && user.username
          ? `Les hébergements de ${user.username}`
          : "Mes hébergements"}
      </Text>
      <View style={styles.scroll}>
        <ScrollView>{accommodations}</ScrollView>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("AddAccommodation")}>        
        <Text style={styles.submitButton}>Nouvel hébergement</Text>
      </TouchableOpacity>
      <Footer navigation={navigation} messageButton={true} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  title: {
    fontSize: 28,
    marginTop: 10,
    marginBottom: 22,
    fontWeight: "600",
    fontStyle: "italic",
    color: "#FF7A00",
  },
  scroll: {
    height: Dimensions.get("window").height - 300,
    //backgroundColor:'red',
  },
  submitButton:{
    borderRadius:30,
    borderWidth:0,
    backgroundColor: '#FF7A00',
    textAlign: 'center',
    width: 260,
    fontSize: 18,
    padding: 10,
    color: '#FFF',
    marginBottom: 20,
  },
  accommodationContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    width: Dimensions.get("window").width - 30,
    backgroundColor: "white",
    padding: 0,
    borderWidth: 1,
    borderColor: "#FF7A00",
    borderRadius: 12,
    marginBottom: 12,
  },
  accommodationPicture: {
    width: 98,
    height: 98,
    borderTopLeftRadius: 11,
    borderBottomLeftRadius: 11,
  },
  accommodationTitle: {
    fontSize: 18,
  },
  accommodationText: {
    margin: 12,
    width: Dimensions.get("window").width - 156,
  },
});