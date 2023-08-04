import React from "react";
import {LinearGradient} from 'expo-linear-gradient';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentRoute } from '../reducers/currentRoute';
import { updateCurrentAccommodation } from '../reducers/currentAccommodation';
import { useIsFocused } from '@react-navigation/native';
  
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const BACKEND_ADDRESS = 'https://stay-backend.vercel.app';


export default function MyAccommodationsScreen() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const users = useSelector(state => state.user.value);
  //console.log(users[0].firstname);
  
  useEffect(() => {
    if (isFocused) {      
      dispatch(updateCurrentRoute('MyAccommodations'));  
      dispatch(updateCurrentAccommodation({}));
    }
  }, [isFocused]);

  const [accommodationsData, setAccommodationsData] = useState([]);
  
  useEffect(() => {
    let owner = '64ca37d51d15d3410f974fa7'; // Il faudra prendre le user en Store. Pour l'instant, c'est Maxime

    fetch(`${BACKEND_ADDRESS}/accommodation/${owner}`)
      .then(response => response.json())
      .then(data => {
        //console.log('allDatas : ', data);
        setAccommodationsData(data);
      });
  }, []);
    const navigation = useNavigation();
    const accommodations = accommodationsData.map((data, i) => {
      // console.log(data.picture)
      const handleWorkOnOneAccommodation = (id) => {
        navigation.navigate('TabNavigator');
        dispatch(updateCurrentAccommodation(id));
      }
      return (
        <TouchableOpacity onPress={() => handleWorkOnOneAccommodation(data)} style={styles.accommodationContainer} key={i}>
          <Image
          // pour éviter le warning uri
         source={data.picture ? { uri: data.picture } : require("../assets/faux-appart-1.jpg")}
          style={styles.accommodationPicture}
          />
          <View style={styles.accommodationText}>
            <Text style={styles.accommodationTitle}>{data.name.substring(0, 20)}...</Text>
            <Text>{data.description.substring(0, 86)}...</Text> 
          </View>
        </TouchableOpacity>
      );
    });
    
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Les Hébergements de {users[0].firstname}</Text>
      <View style={styles.scroll}>
        <ScrollView>
          {accommodations} 
        </ScrollView>  
      </View>
      <View style={styles.containerbutton}>
        <TouchableOpacity onPress={() => navigation.navigate('AddAccommodation')} style={styles.button} activeOpacity={0.8}>
          <LinearGradient
            colors={[ '#FAB28F', 'pink','white']}
            start={{ x: 1.0, y: 0.0 }} end={{ x: 1.0, y: 1.0 }}
            height={50}
            borderRadius={20}            
          >
            <Text style={styles.textButton}>Nouvel Hébergement</Text>
          </LinearGradient>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  title: {
    fontSize:28, marginTop:10, marginBottom:22, fontWeight: '600', fontStyle:'italic', color: '#FF7A00',
  },
  scroll: {
    height:Dimensions.get('window').height-300,
    //height:500,
    //backgroundColor:'red',
  },
  containerbutton:{
    paddingTop:40,
    marginBottom:200,
    display: 'flex',
    flexDirection:'column',
    alignItems:'center',    
  },
  textButton: {  
    paddingLeft:5,
    paddingTop:10,  
    width: 200,
    height: '100%',
    fontWeight: '400',
    fontSize: 20,
  },  
  accommodationContainer: {    
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height:100,
    width: Dimensions.get('window').width-30, 
    backgroundColor: 'white',
    padding: 0,
    borderWidth:1,
    borderColor: '#FF7A00',
    borderRadius:12,
    marginBottom:12,
  },
  accommodationPicture: {
      width: 98,
      height: 98,
      borderTopLeftRadius:11,
      borderBottomLeftRadius:11,
  },
  accommodationTitle: {
    fontSize: 18,
  },
  accommodationText: {
    margin:12,
    width: Dimensions.get('window').width-156,
  },
  memobutton: {
    alignItems:'center',
    justifyContent: 'center',
    borderColor: '#fbe29c',
    borderWidth:2,
    width: 80,
    height: 80,
    borderRadius:40,
    marginBottom:10,
  },  
});