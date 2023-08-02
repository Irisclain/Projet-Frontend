import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
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
// import { useDispatch, useSelector } from 'react-redux';
// import {  } from '../reducers/user';
// import {  } from '../reducers/accommodations';
// import {  } from '../reducers/messages';
const BACKEND_ADDRESS = "http://192.168.1.6:3000";

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
    selectedAll: false,
  },
];


const getSelectedItems2 = (data) => {
  const selectedItems2 = [];
  data.forEach((section) => {
    section.data.forEach((item) => {
      if (item.selected) {
        selectedItems2.push(item.name);
        // setFormData({ ... formData, distribution: selectedItems2 });
        // ;
      }
    });
  });
  return selectedItems2;
  
};

export default function AddAccommodationScreen({ navigation }) {
  const [selectAllCont, setSelectAllCont] = useState(false);
  const [image, setImage] = useState(null);
  const [dataCont, setDataCont] = useState(distributeurs);
  const selectedItems2 = getSelectedItems2(dataCont);

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

  const [formData, setFormData] = useState({
    name: "",
    picture: "",
    address: "",
    description: "",
    price: "",
    distribution:"",
  });
  

  const handleNewAccommodation = () => {
    fetch(`${BACKEND_ADDRESS}/accommodation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("hébergement enregistré avec succès!");
          // dispatch(addAccommodation(formData));
          navigation.navigate("MyAccommodations");
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

  const [modalVisible, setModalVisible] = useState(false);
  const handlePressOpen = () => {
    setModalVisible((prevState) =>!prevState);
  
  };
 

  const handleItemSelection2 = (itemIndex) => {
    const updatedData = [...dataCont];
    const sectionIndex = 0;
    updatedData[sectionIndex].data[itemIndex].selected =
      !updatedData[sectionIndex].data[itemIndex].selected;
    const allSelected = updatedData[sectionIndex].data.every(
      (item) => item.selected
     
    );
    updatedData[sectionIndex].selectedAll = allSelected;
    setSelectAllCont(allSelected);
    setDataCont(updatedData);
     setFormData({ ...formData, distribution: selectedItems2 });console.log(selectedItems2);
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          marginTop: 10,
          marginBottom: 20,
          textDecorationLine: "underline",
          alignItems: "center",
        }}
      >
        Ajouter un Hébergement
      </Text>
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

        <TextInput style={styles.distriInput}>Canaux de distributions : </TextInput>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={handlePressOpen}>
            <FontAwesome name="angle-down" color="black" size={25} />
          </TouchableOpacity>
        </View>
        <Modal style={{borderWidth:3}}
          animationType="none"
          transparent={true}
          visible={modalVisible}
        >
          <TouchableOpacity
          
            activeOpacity={1}
            onPressOut={() => setModalVisible(false)}
          >
            <View  style={styles.centeredView}>
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
                          handleItemSelection2(index);
                          {selectedItems2.map((name, index) => (
                            <Text key={index} >
                              {name}
                            </Text>
                          ))}                           
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
          </TouchableOpacity>        
        </Modal>      
        <Button title="Submit" onPress={() => handleNewAccommodation()} />
      </View>
      <Footer navigation={navigation} messageButton={true} />
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  modalcontainer:{
    height: 300,
    width: 300,
    borderWidth:3,
    
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
    width: 350,
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
  modalText: {
    margin: 5,
    textAlign: "center",
    fontSize: 16,
  },
  modalView: {
    // marginTop: 350,
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
    //fontFamily: 'Futura',
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },
});
