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

  const [distributeurs, setDistributeurs] = useState([]);

  const handleItemSelection = (itemIndex, sectionIndex) => {
    const updatedData = [...distributeurs];
    updatedData[sectionIndex].data[itemIndex].selected =
      !updatedData[sectionIndex].data[itemIndex].selected;
    setDistributeurs(updatedData);
  };

  const filterDistribution = selectedAccommodation.distribution.map(item => item.replace(/["', ]|.com/g, ""));
  console.log(filterDistribution);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Ou voulez-vous que votre annonce apparaisse ?
      </Text>
      <FlatList
      style={styles.list}
        data={filterDistribution}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item}</Text>
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
  list:{
    flexDirection:"column",
    width:"40%",
    
  },
 text: { 
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginVertical: 10,
    fontSize: 30,
},
  img: {
    marginLeft: 20,
    height: 60,
    width: 100,
    resizeMode: "contain",
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