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

const distributeurs = [
  {
    data: [
      { image: require("../assets/Logo-Booking.png"), selected: false },
      { image: require("../assets/Logo-Airbnb.png"), selected: false },
      { image: require("../assets/Logo-Expedia.png"), selected: false },
    ],
    selectedAll: false,
  },
];

const BACKEND_ADDRESS = "https://stay-backend.vercel.app";

export default function AgenciesScreen({ navigation }) {
  const dispatch = useDispatch();
  const selectedAccommodation = useSelector(
    (state) => state.currentAccommodation.value
  );
  console.log(selectedAccommodation.distribution);

  useEffect(() => {
    dispatch(updateCurrentRoute("Agencies"));
  }, []);

  const [distributeurs, setDistributeurs] = useState([]);

  const handleItemSelection = (itemIndex, sectionIndex) => {
    const updatedData = [...distributeurs];
    updatedData[sectionIndex].data[itemIndex].selected =
      !updatedData[sectionIndex].data[itemIndex].selected;
    setDistributeurs(updatedData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        OÃ¹ voulez-vous que votre annonce apparaisse ?
      </Text>
      <FlatList
        data={selectedAccommodation.distribution}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item}</Text>
          </View>
        )}
      />
      <Footer navigation={navigation} messageButton={true} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    marginTop: 50,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  image: {
    marginLeft: 40,
    width: 270,
    height: 150,
    resizeMode: "contain",
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
