import React from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet } from 'react-native';

export default function LoadingSignUpScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={60} color='#951b81' />
      <Image source={require('../assets/Canapiris.png')} style={styles.image} />
      <Text style={styles.text}>Canapiris est en train de préparer votre compte...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white' 
        },
        image:{
            marginTop: -80,
            width: "70%",
            height: "50%",
        },
        text: {
            fontSize: 30,
            textAlign: 'center',
            fontStyle: 'italic',
        },
});
