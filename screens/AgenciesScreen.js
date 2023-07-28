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
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { useDispatch, useSelector } from 'react-redux';
// import {  } from '../reducers/user';
// import {  } from '../reducers/accommodations';
// import {  } from '../reducers/messages';





export default function AgenciesScreen() {

  return (
      <View style={styles.inputContainer}>
        <Text>Distribution (navigation par tab)</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MessageScreen')} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>(//bas de page//)Messagerie</Text>
        </TouchableOpacity>
      </View>
  );
}