import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentRoute } from "../reducers/currentRoute";
import { updateCurrentAccommodation } from "../reducers/currentAccommodation";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SectionList,
  Image,
  FlatList,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Footer from "../components/Footer";
// import { useDispatch, useSelector } from 'react-redux';
// import {  } from '../reducers/user';
// import {  } from '../reducers/accommodations';
// import {  } from '../reducers/messages';



const BACKEND_ADDRESS = "https://stay-backend.vercel.app";

export default function AgenciesScreen({ navigation }) {
  const dispatch = useDispatch();
  const selectedAccommodation = useSelector(
    (state) => state.currentAccommodation.value
  );
  // console.log(selectedAccommodation.distribution);

  useEffect(() => {
    dispatch(updateCurrentRoute("Agencies"));
  }, []);

  const distributeur = [
    {
      data: [
        {
          image: require("../assets/Logo-Booking.png"),
          name: "Booking.com",
          selected: false,
        },
        {
          image: require("../assets/Logo-Airbnb.png"),
          name: "AirBNB",
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

  const [distributeurs, setDistributeurs] = useState(() => {
    const initializedDistributeurs = distributeur[0].data.map((item) => ({
      ...item,
      selected: selectedAccommodation.distribution.includes(item.name),
    }));
    return initializedDistributeurs;
  });

  console.log(selectedAccommodation)

  const handleItemSelection = (itemIndex) => {
      // Create a copy of the distributeurs state
      const updatedDistributeurs = [...distributeurs];
  
      // Toggle the selected property of the clicked distributor
      updatedDistributeurs[itemIndex].selected = !updatedDistributeurs[itemIndex].selected;
  
      // Update the state with the modified data
      setDistributeurs(updatedDistributeurs);
    };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Ou voulez-vous que votre annonce apparaisse ?
      </Text>
      <FlatList
        style={styles.list}
        data={distributeurs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <TouchableOpacity onPress={() => handleItemSelection(index)}>
              {item.selected ? (
                <FontAwesome
                  style={styles.icon}
                  name={"check-square-o"}
                  color={"green"}
                  size={25}
                />
              ) : (
                <FontAwesome
                style={styles.icon}
                name={"square-o"}
                color={"black"}
                size={25}
              />
            )}
          </TouchableOpacity>
          <Image source={item.image} style={styles.img} />
        </View>
      )}
    />
      <Footer navigation={navigation} messageButton={true} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  
  icon:{
    marginLeft:50, 
  },
  list:{
    flexDirection:"column",
  },
 text: { 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: 10,
    paddingTop:0,
    paddingBottom:0,
    marginVertical: 0,
    fontSize: 30,
},
  img: {
    height: 80, // Ajustez la hauteur comme vous le souhaitez
    width: 200, // Ajustez la largeur comme vous le souhaitez
    resizeMode: "contain", // Ajustez la façon dont les images sont redimensionnées
    marginBottom: 10,
    marginTop: -30,
    marginLeft: 30, // Ajoutez un espacement vertical
    alignSelf: "center", 
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    marginTop: 50,
    marginHorizontal: 10,
    marginVertical: 10,
    marginBottom: 100,
    textAlign: "center",
    fontStyle: "italic",
  },
  modalTitle: {
    fontSize: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  item: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
  },
  checkboxContainer: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    paddingTop: 8,
    width: "100%",
    marginTop: 20,
    backgroundColor: "#fbe29c",
    borderRadius: 1,
  },
  textButton: {
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});