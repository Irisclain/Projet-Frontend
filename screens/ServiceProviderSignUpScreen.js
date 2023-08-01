import React from "react";
import { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Pressable
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function ServiceProviderSignUpScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [presta, setPresta] = useState('');

  const handleConnection = () => {
    navigation.navigate('TabNavigator');
  };

  const handlePress = (e) => {
      setModalVisible(false);
      setPresta(e);
    };
  const handlePressOpen = () => {
    setModalVisible(true);
  };
  
  return (
      <SafeAreaView style={styles.container}>
      <View style={styles.haut}>
        <Text style={styles.title}>Inscription Prestataire</Text>
          <View style={styles.bider}>
            <Text style={styles.prestaInput}>Prestation : {presta ? ` ${presta}` : ''}</Text>
            <View style={styles.buttons}> 
            <TouchableOpacity onPress={handlePressOpen}>
              <FontAwesome name="angle-down" color="black" size={25} />
            </TouchableOpacity>
            </View>
            <Modal
              animationType="none"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Pressable onPress={() => handlePress('Ménage')}>
                  <Text style={styles.modalText}>Ménage</Text>
                  </Pressable>
                  <Pressable onPress={() => handlePress('Dépannage')}>
                  <Text style={styles.modalText}>Dépannage</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <TextInput placeholder="Nom..." style={styles.inputs}/>
            <TextInput placeholder="Prénom..." style={styles.inputs}/>
            <TextInput placeholder="Email..." style={styles.inputs}/>
            <TextInput placeholder="*** Mot de passe ***" style={styles.inputs}/>
            <TouchableOpacity onPress={() => handleConnection()} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>S'inscrire</Text>
            </TouchableOpacity>
            <Text style={styles.text}>ou</Text>
            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => handleConnection()} style={styles.signUpButtonFb} activeOpacity={0.8}>
            <Image source={require('../assets/Logo-fb.png')} style={styles.logoFb} />
                <Text style={styles.buttonText}>Via Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleConnection()} style={styles.signUpButtonGoogle} activeOpacity={0.8}>
            <Image source={require('../assets/Logo-google.png')} style={styles.logoGoogle} />
                <Text style={styles.buttonText}>Via Google</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bider: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d4d4d4',
    width: 280,
    height: 50,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#a6a6a6',
  },
  buttons:{
    position: 'absolute',
    right: 100,
    top: 13,
  }, 
  buttonContainer: {
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 30,
  },
  centeredView: {
    position: 'absolute',
    top: 235,
    left: 220,
    right: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 40,
  },
  haut: {
    alignItems: 'center',
    width: '100%',
  },
  inputs: {
    width: 280,
    height: 50, 
    borderWidth: 1,
    borderColor: '#a6a6a6',
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 18,
    paddingHorizontal: 12,
  },
  logoFb:{
    width: 27,
    height: 33,
    position: 'absolute',
    top: '40%',
    left: '50%',
    marginLeft: -13.5,
    marginTop: -26.5, 
  },
  logoGoogle:{
    width: 27,
    height: 33,
    position: 'absolute',
    top: '43%',
    left: '50%',
    marginLeft: -13.5,
    marginTop: -26.5, 
  },
  modalText: {
    margin: 5,
    textAlign: 'center',
    fontSize: 16,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  prestaInput: {
    width: 280,
    height: 50, 
    borderWidth: 1,
    borderColor: '#a6a6a6',
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 18,
    paddingHorizontal: 12,
    paddingVertical: 11,
    color: '#545454',
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  signUpButtonFb: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B589E',
    width: 153,
    height: 103,
    borderRadius: 10,
    marginRight: 15,
    shadowColor: '#ffe09',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 6.41,
    elevation: 4,
  },
  signUpButtonGoogle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DC4B38',
    width: 153,
    height: 103,
    borderRadius: 10,
    shadowColor: '#ffe09',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 6.41,
    elevation: 4,
  },
  text: {
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  textButton: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    color: '#000',
    fontSize: 24,
    justifyContent: 'center',
    textAlign: 'center',
    textDecorationLine:'underline',
    marginBottom: 10,
    marginTop: 40,
  },
});