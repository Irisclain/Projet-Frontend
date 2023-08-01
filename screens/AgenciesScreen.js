import React from "react";
import { useState } from 'react';
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

} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import { useDispatch, useSelector } from 'react-redux';
// import {  } from '../reducers/user';
// import {  } from '../reducers/accommodations';
// import {  } from '../reducers/messages';

const distributeurs = [
  {
    data: [
      { image: require('../assets/faux-appart-1.jpg'), selected: false },
      { name: 'Airbnb', selected: false },
      { name: 'Booking', selected: false },
      { name: 'Expedia', selected: false },
    ],
    selectedAll: false,
  },
];



export default function AgenciesScreen({ navigation }) {
  const [dataCont, setDataCont] = useState(distributeurs);
  
  const handleItemSelection2 = (itemIndex) => {
    const updatedData = [...dataCont];
    const sectionIndex = 0;
    updatedData[sectionIndex].data[itemIndex].selected = !updatedData[sectionIndex].data[itemIndex].selected;
    setDataCont(updatedData);
  };
  return (
      <SafeAreaView style={styles.container}>
        <Text>Ou voulez-vous que votre annonce apparaisse ?</Text>
        <SectionList
            sections={distributeurs}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, index }) => (
              <View style={styles.item}>
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity onPress={() => handleItemSelection2(index)} style={styles.checkbox}>
                    <FontAwesome
                      name={item.selected ? 'check-square-o' : 'square-o'}
                      color={item.selected ? 'green' : 'black'}
                      size={40}
                    />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>{item.name}</Text>
                  <Image source={item.image} style={styles.image} />
                </View>
              </View>
            )}
            
          />
        <Footer navigation={navigation} messageButton={true}/>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: Platform.OS === "android" ? 37 : 0,
  },
  image: {
    width: 200,
    height: 150,
    marginLeft: 10,
  },
  modalTitle: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  item: {
    borderRadius: 30,
    padding: 20,
    marginVertical: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    paddingTop: 8,
    width: '100%',
    marginTop: 30,
    backgroundColor: '#fbe29c',
    borderRadius: 1,
  },
  textButton: {
    //fontFamily: 'Futura',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
});