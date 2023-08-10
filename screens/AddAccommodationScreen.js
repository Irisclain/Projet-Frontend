import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentRoute } from '../reducers/currentRoute';
import { updateCurrentAccommodation } from '../reducers/currentAccommodation';
import { useIsFocused } from '@react-navigation/native';  
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
import Footer from "../components/Footer";
import FontAwesome from "react-native-vector-icons/FontAwesome";


const BACKEND_ADDRESS = "https://stay-backend.vercel.app";
//const BACKEND_ADDRESS = "http://192.168.1.54:3000";


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

  const user = useSelector(state => state.user.value);
  
  useEffect(() => {
    if (isFocused) {
      dispatch(updateCurrentRoute("AddAccommodation"));
      dispatch(updateCurrentAccommodation({}));
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
      // console.log('result.canceled : ', result.canceled);
       console.log('result.assets[0].uri : ', result.assets[0].uri);
      // console.log('result : ', result);

      
      // pictureFormData.append('photoFromFront', {
      //   uri: result.assets[0].uri,
      //   name: 'photo.jpg',
      //   type: 'image/jpeg',
      // });



      setImage(result.assets[0].uri);
      // setFormData({ ...formData, picture: pictureFormData });
    }
  };
  
  let ownerToken = 'kZg43tvoorU8F5ypqMv5QZBYZjLC426k'
    
  if (user.token!==null) {
    ownerToken = user.token;
  }

  const objectId = "64ca37d51d15d3410f974fa7";
  //etat pour l'enregistrement de l'hébergement
  const [formData, setFormData] = useState({
    name: "",
    picture: "photo",
    address: "",
    description: "",
    price: "",
    distribution: [],
    ownerToken: ownerToken,
  });

  const handleNewAccommodation = () => {
    const pictureFormData = new FormData();
    
    //console.log('toutes les infos : ' , formData);
    pictureFormData.append("name", formData.name);
    pictureFormData.append("address", formData.address);
    pictureFormData.append("description", formData.description);
    pictureFormData.append("price", formData.price);
    pictureFormData.append("distribution", formData.distribution);
    pictureFormData.append("ownerToken", formData.ownerToken);
    pictureFormData.append("photoFromFront", {
        uri: image,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });

    console.log('pictureFormData : ', pictureFormData);


    fetch(`${BACKEND_ADDRESS}/accommodation`, {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // body: JSON.stringify(pictureFormData),
      body: pictureFormData
    })
      .then((response) => response.json())
      .then((response) => {
        //console.log('Response : ', response);
        if (response.result) {
          //console.log("hébergement enregistré avec succès!");
          setFormData({ ...formData, distribution: [] });
          navigation.navigate("MyAccommodations");
        } else {
          console.error("Erreur lors de l'enregistrement de l'hébergement, response.result: ", response.result);
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de l'enregistrement de l'hébergement:",
          error
        );
      });
  };

  //état pour rendre le modal visible ou non
  const [modalVisible, setModalVisible] = useState(false);

  //ouvrir le modal
  const handlePressOpen = () => {
    setModalVisible((prevState) => !prevState);
  };

  // fonction pour les séléctions de la modale
  const handleItemSelection = (itemIndex) => {
    const selectedList = [...formData.distribution]; // selectedList= tableau distribution
    const updatedData = [...data]; // updatedData= tableau distributeurs

    switch (itemIndex) {
      case 0:
        if (!selectedList.includes("Booking")) {
          selectedList.push("Booking"); // on ajoute Booking à la liste si il n'est pas déjà présent
        } else {
          const index = selectedList.indexOf("Booking");
          selectedList.splice(index, 1); // On l'enlève si il est déjà là
        }
        updatedData[0].data[0].selected = selectedList.includes("Booking"); //dans la data de Bookin, on selectionne si la liste inclus Booking
        break;
      case 1:
        if (!selectedList.includes("Airbnb")) {
          selectedList.push("Airbnb"); // on ajoute Airbnb à la liste si il n'est pas déjà présent
        } else {
          const index = selectedList.indexOf("Airbnb");
          selectedList.splice(index, 1); // On l'enlève si il est déjà là
        }
        updatedData[0].data[1].selected = selectedList.includes("Airbnb"); //dans la data de Airbnb, on selectionne si la liste inclus Airbnb
        break;
      case 2:
        if (!selectedList.includes("Expedia")) {
          selectedList.push("Expedia"); // Aon ajoute Expedia à la liste si il n'est pas déjà présent
        } else {
          const index = selectedList.indexOf("Expedia");
          selectedList.splice(index, 1); // On l'enlève si il est déjà là
        }
        updatedData[0].data[2].selected = selectedList.includes("Expedia"); //dans la data de Expedia, on selectionne si la liste inclus Expedia
        break;
      default:
        break;
    }

    setFormData({ ...formData, distribution: selectedList }); // update de formData avec la selectedList à jour
  };
  // console.log("formdata",formData.picture);
  // console.log('selecteditems', selectedItems2);
  // setFormData({ ...formData, distribution: selectedItems2 });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un Hébergement</Text>
        <View style={styles.pictureLine}>
          <TouchableOpacity onPress={pickImage} style={styles.inputPhoto}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <FontAwesome name="image" style={styles.icon} color="grey" size={30} />
            )}
            {!image && <Text>Ajouter une photo</Text>}
          </TouchableOpacity>
        

          <TextInput
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Nom du bien..."
            style={styles.inputName}
          />
        </View>
        <TextInput
          value={formData.address}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
          placeholder="Adresse..."
          style={styles.input}
        />
        <TextInput
          value={formData.description}
          onChangeText={(text) =>
            setFormData({ ...formData, description: text })
          }
          placeholder="Description..."
          style={styles.input}
        />
        {/* <TextInput
          value={formData.planning}
          onChangeText={(text) => setFormData({ ...formData, planning: text })}
          placeholder="Planning"
          style={styles.input}
        /> */}
        <TextInput
          value={formData.price}
          onChangeText={(number) => setFormData({ ...formData, price: Number(number) })}
          placeholder="Prix à la nuitée (€)..."
          style={styles.input}
          keyboardType="numeric"
        />
        <View>
        <TouchableOpacity onPress={handlePressOpen} style={styles.distriInput}>
          <Text style={styles.distriText}>Canaux de distributions</Text>
          <FontAwesome name="angle-down" color="grey" size={30} />
        </TouchableOpacity>
        </View>
        <Modal
          style={{ borderWidth: 3 }}
          animationType="none"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <SectionList
                sections={distributeurs}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item, index }) => (
                  <View style={styles.item}>
                    <TouchableOpacity
                      onPress={() => {
                        handleItemSelection(index);
                        {
                          selectedItems.map((name, index) => (
                            <Text key={index}>{name}</Text>
                          ));
                        }
                      }}
                      style={styles.checkbox}
                    >
                      <FontAwesome
                        name={item.selected ? "check-square-o" : "square-o"}
                        color={item.selected ? "green" : "black"}
                        size={20}
                      />
                    </TouchableOpacity>
                    <Image source={item.image} style={styles.img} />
                  </View>
                )}
              />
            </View>
          </View>
        </Modal>
        <TouchableOpacity onPress={() => handleNewAccommodation()}>
          <Text style={styles.submitButton}>Enregistrer</Text>
        </TouchableOpacity>
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
    margin: 0,
    padding: 20,
    width: Dimensions.get("window").width,
  },
  title: {
    fontSize: 30,
    margin: 0,
    marginBottom: 22,
    fontWeight: "600",
    color: "#FF7A00",
  },
  pictureLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: Dimensions.get("window").width-40,
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
    width: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  modalcontainer: {
    height: 300,
    width: 300,
    borderWidth: 3,
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
  centeredView: {
    position: "absolute",
    width: 150,
    top: 350,
    left: 270,
    right: 20,
  },
  distriInput: {
    padding:12,
    paddingLeft:20,
    width: Dimensions.get("window").width-40,
    height: 60,
    borderWidth: 1,
    borderColor: "#FF7A00",
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 20,
    color: "#868686",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  distriText: {
    fontSize: 20,
    color: "#868686",
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
    color: "gray",
    textAlign: 'center',
  },
  inputPhoto: {
    width: 114,
    padding: 0,
  },
  inputName: {
    borderRadius: 10,
    marginLeft: 10,
    height: 60,
    width: Dimensions.get("window").width-170,
    borderColor: "#FF7A00",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    padding: 12,
    paddingLeft: 20,
    fontSize: 16,
  },
  input: {
    borderRadius: 10,
    marginLeft: 0,
    height: 60,
    borderColor: "#FF7A00",
    borderWidth: 1,
    marginTop: 0,
    marginBottom: 20,
    padding: 12,
    paddingLeft: 12,
    fontSize: 16,
    width: Dimensions.get("window").width-40
  },
  modalText: {
    margin: 5,
    textAlign: "center",
    fontSize: 16,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    alignItems: "center",
    paddingTop: 8,
    width: "100%",
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
