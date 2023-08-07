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
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentRoute } from "../reducers/currentRoute";
import { updateCurrentAccommodation } from "../reducers/currentAccommodation";
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
// import {  } from '../reducers/user';
// import {  } from '../reducers/accommodations';
// import {  } from '../reducers/messages';
const BACKEND_ADDRESS = "https://stay-backend.vercel.app";
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
  const currentAccommodation = useSelector(
    (state) => state.currentAccommodation.value
  );

  useEffect(() => {
    if (isFocused) {
      dispatch(updateCurrentRoute("OneAccommodation"));
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
    return;
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

  //const objectId = '64ca37d51d15d3410f974fa7';
  //etat pour la modification de l'hébergement
  const [formData, setFormData] = useState(currentAccommodation);

  //dispatch pour la modification de l'hébergement
  const handleUpdateAccommodation = () => {
    console.log(formData);
    //fetch(`${BACKEND_ADDRESS}/accommodation/update/${trouverl'ID ???}`, {
    fetch(`${BACKEND_ADDRESS}/accommodation/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.result) {
          console.log("hébergement enregistré avec succès!");
          setFormData({ ...formData, distribution: [] });
          //navigation.navigate("MyAccommodations");
          dispatch(updateCurrentAccommodation({ formData }));
        } else {
          console.error("Erreur lors de l'enregistrement de l'hébergement");
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de l'enregistrement de l'hébergement:",
          error
        );
      });
  };

  console.log(formData);

  return (
    <View style={styles.container}>
      <View style={styles.accommodationContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: formData.picture }}
            style={styles.accommodationPicture}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <TextInput
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            style={styles.inputTitle}
            multiline={true}
          />
          <View style={styles.priceContainer}>
            <View style={styles.priceEuros}>
              <TextInput
                value={formData.price.toString()}
                onChangeText={(number) =>
                  setFormData({ ...formData, price: number })
                }
                style={styles.inputPrice}
              />
              <Text style={styles.textPrice}> €</Text>
            </View>
            <Text style={styles.textNight}>/nuit</Text>
          </View>
        </View>
        <TextInput
          value={formData.address}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
          style={styles.inputAdress}
        />
        <TextInput
          value={formData.description}
          onChangeText={(text) =>
            setFormData({ ...formData, description: text })
          }
          style={styles.inputDescription}
          multiline={true}
        />
      </View>
      <Text style={styles.submitSuggestion}>
        Modifiez l'annonce en appuyant sur n'importe quel élément
      </Text>

      <LinearGradient
        colors={["#CD43FD", "#FF7A00", "#FAB26F", "#FFE279"]}
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={styles.signInButtonConnexion}
      >
        <TouchableOpacity onPress={() => handleUpdateAccommodation()}>
          <Text style={styles.submitButton}>Enregistrer les modifications</Text>
        </TouchableOpacity>
      </LinearGradient>
      <Footer navigation={navigation} messageButton={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    width: Dimensions.get("window").width,
  },
  title: {
    fontSize: 30,
    marginTop: 10,
    marginBottom: 22,
    fontWeight: "600",
    color: "#FF7A00",
  },
  accommodationContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: Dimensions.get("window").width - 30,
    backgroundColor: "white",
    padding: 0,
    borderWidth: 1,
    borderColor: "#FF7A00",
    borderRadius: 12,
    margin: 0,
    marginBottom: 3,
    marginTop: 12,
  },
  accommodationPicture: {
    width: Dimensions.get("window").width - 32,
    height: Dimensions.get("window").width - 160,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    marginBottom: 12,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 12,
    marginTop: 0,
    width: Dimensions.get("window").width - 54,
  },
  inputTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF7A00",
    margin: 0,
    width: Dimensions.get("window").width - 54 - 62 - 6,
  },
  priceContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginRight: 0,
    marginLeft: 6,
    padding: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 12,
    backgroundColor: "#DDD",
    width: 62,
  },
  priceEuros: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 20,
  },
  inputPrice: {
    margin: 0,
    padding: 0,
    fontSize: 18,
    fontWeight: "600",
    color: "#FF7A00",
  },
  textPrice: {
    margin: 0,
    padding: 0,
    paddingTop: 3,
    fontSize: 16,
    fontWeight: "600",
  },
  textNight: {
    fontStyle: "italic",
    marginTop: -3,
  },
  inputDescription: {
    fontSize: 16,
    margin: 12,
    marginTop: 0,
  },
  submitSuggestion: {
    fontSize: 12,
    fontStyle: "italic",
    marginBottom: 12,
    textAlign: "center",
  },
  signInButtonConnexion: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d4d4d4",
    alignSelf: "center",
    width: Dimensions.get("window").width - 54,
    height: 50,
    borderRadius: 22,
    margin: 0,
    marginTop: 12,
    shadowColor: "#868686",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 4,
  },
  submitButton: {
    height: 46,
    borderRadius: 20,
    borderWidth: 0,
    borderColor: "#FF7A00",
    textAlign: "center",
    width: Dimensions.get("window").width - 58,
    fontSize: 18,
    padding: 10,
    color: "#FFF",
  },
  inputAdress: {
    fontSize: 16,
    margin: 12,
    marginTop: 0,
    fontStyle: "italic",
    textAlign: "left",
    width: Dimensions.get("window").width - 54,
    fontWeight: "bold",
  },
  picturename: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  closeButtonText: {
    left: 10,
    top: 10,
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
    position: "absolute",
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
    width: Dimensions.get("window").width - 100,
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
    width: Dimensions.get("window").width - 100,
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
