import React from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Modal,
  Pressable,
  SectionList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentRoute } from '../reducers/currentRoute';
import { updateCurrentAccommodation } from '../reducers/currentAccommodation';
import { useIsFocused } from '@react-navigation/native';
// import {  } from '../reducers/user';
// import {  } from '../reducers/accommodations';
// import {  } from '../reducers/messages';
const BACKEND_ADDRESS = 'https://stay-backend.vercel.app'; 
//'https://stay-backend.vercel.app';

const distributeurs = [
  {
    data: [
      {
        image: require("../assets/Logo-Booking.png"),
        name: "Booking",
        selected: false,
      },
      {
        image: require("../assets/Logo-Airbnb.png"),
        name: "Airbnb",
        selected: false,
      },
      {
        image: require("../assets/Logo-Expedia.png"),
        name: "Expedia",
        selected: false,
      },
    ],
  },
];


const getSelectedItems = (data) => {
  const selectedItems = [];
  data.forEach((section) => {
    section.data.forEach((item) => {
      if (item.selected) {
        selectedItems.push(item.name);
      }
    });
  });
  return selectedItems;
  
};

export default function AddAccommodationScreen({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  
  const currentAccommodation = useSelector((state) => state.currentAccommodation.value); 
  
  useEffect(() => {
    if (isFocused) {      
      dispatch(updateCurrentRoute('OneAccommodation')); 
      // dispatch(updateCurrentAccommodation(
      //   {
      //   "_id": "64ca3ea77b6e67041bbc7c8e", 
      //   "address": "45 rue des Chats Volants, Paris", 
      //   "description": "EXEMPLE 1 DE LA BDD --- Charmant appartement situé au cœur de la ville, à quelques pas des boutiques, restaurants et attractions locales. Cet espace confortable offre une chambre spacieuse, une cuisine entièrement équipée et un salon lumineux. Profitez de vues pittoresques depuis le balcon privé ou détendez-vous dans le jardin commun. Idéal pour les voyageurs en quête de confort et de commodité.", 
      //   "distribution": ["AirBNB", "Booking.com", "Expedia"], 
      //   "name": "Appartement Cosy au Cœur de la Ville", 
      //   "owner": "64ca37d51d15d3410f974fa7", 
      //   "picture": "https://news.airbnb.com/wp-content/uploads/sites/4/2019/06/PJM020719Q202_Luxe_WanakaNZ_LivingRoom_0264-LightOn_R1.jpg?fit=3200%2C2133", 
      //   "price": 210
      //   }
      // ));
    }
  }, [isFocused]);

  const [image, setImage] = useState(null);
  const [data, setData] = useState(distributeurs);
  const selectedItems = getSelectedItems(data);


  //icone photo nouvel hébergement
  const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    setImage(result.assets[0].uri);
    setFormData({ ...formData, picture: result.assets[0].uri });
  }
};

const objectId = '64ca37d51d15d3410f974fa7';
//etat pour l'enregistrement de l'hébergement
  const [formData, setFormData] = useState(currentAccommodation);
  
//dispatch pour l'enregistrement de l'hébergement
  const handleNewAccommodation = () => {
    console.log(formData);
    fetch(`${BACKEND_ADDRESS}/accommodation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then (response => response.json())
      .then((response) => {
        console.log(response);
        if (response.result) {
          console.log("hébergement enregistré avec succès!");
          setFormData({ ...formData, distribution: [] });
          navigation.navigate("MyAccommodations");
        } else {
          console.error("Erreur lors de l'enregistrement de l'hébergement");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'enregistrement de l'hébergement:", error);
      });
  };
  

  
console.log(formData);

  return (
    <View style={styles.container}>

      
      <View style={styles.accommodationContainer}>
        <Text>ESSAI</Text>
        <Image
          source={{ uri:currentAccommodation.picture }}
          style={styles.accommodationPicture}
        />
        <View style={styles.accommodationText}>
        <TextInput
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder={currentAccommodation.name}
          style={styles.inputTitle}
          multiline={true}
        />
        <TextInput
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          style={styles.inputDescription}
          multiline={true}
        />
          <Text>{data.description}...</Text> 
        </View>
      </View>

      
      






      





      <Text style={styles.title}>{currentAccommodation.name}</Text>
      <View style={styles.container1}>
        <View style={styles.picturename}>
          <TouchableOpacity onPress={pickImage} style={styles.inputphoto}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <FontAwesomeIcon name="image" style={styles.icon} />
            )}
          </TouchableOpacity>

          <TextInput
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Nom du bien ..."
            style={styles.inputname}
          />
        </View>
        {!image && <Text>Ajouter une photo</Text>}
        <TextInput
          value={formData.address}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
          placeholder="Adresse ..."
          style={styles.input}
        />
        <TextInput
          value={formData.description}
          onChangeText={(text) =>
            setFormData({ ...formData, description: text })
          }
          placeholder="Description ..."
          style={styles.input}
        />
        <TextInput
          value={formData.planning}
          onChangeText={(text) => setFormData({ ...formData, planning: text })}
          placeholder="Planning"
          style={styles.input}
        />
        <TextInput
          value={formData.price}
          onChangeText={(number) => setFormData({ ...formData, price: number })}
          placeholder="Tarif ..."
          style={styles.input}
        />    
        <Button title="Submit" onPress={() => handleNewAccommodation()} />
      </View>
      <Footer navigation={navigation} messageButton={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    width: Dimensions.get('window').width,
  },
  title: {
    fontSize:30, marginTop:10, marginBottom:22, fontWeight: '600', color: '#FF7A00',
  },
  inputTitle: {
    fontSize:22, 
    margin:12,
    marginTop:10, marginBottom:22,
    fontWeight: '400', color: '#FF7A00',
    //width: Dimensions.get('window').width-100,
  },
  picturename: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  closeButtonText: {
    left:10,
    top:10,
    fontSize: 20,
  },
  img: {
    marginLeft: 20,
    height: 60,
    width: 100,
    resizeMode: "contain",
  },
  checkbox: {
    paddingLeft: 20,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    position: 'absolute',
    width: 150,
    top: 350,
    left: 270,
    right: 20,
  },
  buttons: {
    position: "absolute",
    marginTop: 520,
    right: 35,
    top: 13,
  },
  distriInput: {
    marginTop: 20,
    paddingTop: 15,
    width: Dimensions.get('window').width-100,
    height: 60,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 18,
    paddingHorizontal: 12,
    paddingVertical: 11,
    color: "#868686",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  container1: {
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 140,
    height: 100,
    borderRadius: 10,
    marginLeft: -20,
    marginTop: -30,
  },
  icon: {
    fontSize: 70,
    marginTop: -7,
    paddingLeft: 2,
    color: "gray",
  },
  inputphoto: {
    borderRadius: 10,
    height: 80,
    width: 100,
    marginTop: 10,
    padding: 10,
  },
  inputname: {
    borderRadius: 10,
    marginLeft: 50,
    height: 60,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  input: {
    borderRadius: 10,
    marginLeft: 0,
    height: 60,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
  },
  button: {
    alignItems: "center",
    paddingTop: 8,
    width: Dimensions.get('window').width-100,
    marginTop: 30,
    backgroundColor: "#fbe29c",
    borderRadius: 1,
  },
  textButton: {
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },
});
