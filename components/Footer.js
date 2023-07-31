import React from "react";
import { useState } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dimensions} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { useDispatch, useSelector } from 'react-redux';
// import {  } from '../reducers/user';

export default function Footer(props) {
  
  return (
    <View style={styles.footer}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Message')} style={styles.messageButton} activeOpacity={0.3}>
            <FontAwesome name='comments' size={50} color={'#FFE279'} />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    footer: {
        height:58,
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        margin: '0 auto',
        padding: 4,
      },
});