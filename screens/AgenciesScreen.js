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
      { image: require('../assets/Logo-Booking.png'), selected: false },
      { image: require('../assets/Logo-Airbnb.png'), selected: false },
      { image: require('../assets/Logo-Expedia.png'), selected: false },
    ],
    selectedAll: false,
  },
  
];export default function AgenciesScreen({ navigation }) {
  const [dataCont, setDataCont] = useState(distributeurs);
  
  const handleItemSelection2 = (itemIndex) => {
    const updatedData = [...dataCont];
    const sectionIndex = 0;
    updatedData[sectionIndex].data[itemIndex].selected = !updatedData[sectionIndex].data[itemIndex].selected;
    setDataCont(updatedData);
  };

  
  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Ou voulez-vous que votre annonce apparaisse ?</Text>
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
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Futura',
    fontSize: 30,
    fontWeight: '600',
    marginTop:50,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  image: {
    marginLeft:40,
    width: 270,
    height: 150,
    resizeMode: 'contain',
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    paddingTop: 8,
    width: '100%',
    marginTop: 20,
    backgroundColor: '#fbe29c',
    borderRadius: 1,
  },
  textButton: {
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
});