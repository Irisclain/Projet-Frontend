import React from "react";
import { useState } from 'react';
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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import { useDispatch, useSelector } from 'react-redux';
// import {  } from '../reducers/user';
// import {  } from '../reducers/accommodations';
// import {  } from '../reducers/messages';

export default function AddAccommodationScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [planning, setPlanning] = useState('');
  const [price, setPrice] = useState('');
  const [channels, setChannels] = useState('');

  

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    ;}
  };

const handleSubmit =  () => {
   
      
    };
  

  return (
    <View style={styles.container}>
        <Text style={{fontSize:30, marginTop:10, marginBottom:20,textDecorationLine: "underline",alignItems:'center'}}>Ajouter un Hébergement</Text>
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
            value={name}
            onChangeText={setName}
            placeholder="Nom du bien ..."
            style={styles.inputname}
          />
          </View>
          {!image && <Text>Ajouter une photo</Text>}
          <TextInput 
            value={address}
            onChangeText={setAddress}
            placeholder="Adresse ..."
            style={styles.input}
          />
          <TextInput 
            value={description}
            onChangeText={setDescription}
            placeholder="Description ..."
            style={styles.input}
          />
          <TextInput 
            value={planning}
            onChangeText={setPlanning}
            placeholder="Planning"
            style={styles.input}
          />
          <TextInput 
            value={price}
            onChangeText={setPrice}
            placeholder="Tarif ..."
            style={styles.input}
          />
          <TextInput 
            value={channels}
            onChangeText={setChannels}
            placeholder="Canaux de distributions"
            style={styles.input}
          />
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      <Footer navigation={navigation} messageButton={true}/>      
    </View>
  );
};
  const styles = StyleSheet.create({    
 picturename: {
  flexDirection: 'row',
  justifyContent:'space-between',
  alignItems: 'center',
  marginBottom: 10,
 },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: Platform.OS === "android" ? 37 : 0,
  }, 
  container1: { 
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 140,
    height: 120,
    borderRadius: 10,
    marginLeft:-20,
    marginTop:-30,
    },
  icon: {
    fontSize: 70,
    marginTop:-7,
    paddingLeft:2,
    color: 'gray',
  },
  inputphoto: {
    borderRadius:10,
    height: 80,
    width:100,
    marginTop: 10,
    padding: 10,
  },
  inputname: {
    borderRadius:10,
    marginLeft: 50,
    height: 60,
    width:200,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    },
  input: {
    borderRadius:10,
    marginLeft:0,
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
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


