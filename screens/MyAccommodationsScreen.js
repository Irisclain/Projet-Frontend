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
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { updateCurrentRoute } from '../reducers/currentRoute';
import { updateCurrentAccommodation } from '../reducers/currentAccommodation';
  
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { useDispatch, useSelector } from 'react-redux';
// import {  } from '../reducers/user';
// import {  } from '../reducers/accommodations';
// import {  } from '../reducers/messages';

export default function MyAccommodationsScreen() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(updateCurrentRoute('MyAccommodations'));
    dispatch(updateCurrentAccommodation({}));
  }, []);

  const [accommodationsData, setAccommodationsData] = useState([]);
  
  // const accommodationSchema = mongoose.Schema({
  //   name: String,
  //   picture: String,
  //   address: String,
  //   description: String,
  //   price: Number,
  //   distribution: Array,
  //  });

  
  useEffect(() => {
    let owner = '64ca37d51d15d3410f974fa7'; // Il faudra prendre le user en Store. Pour l'instant, c'est Maxime

    fetch(`http://192.168.1.54:3000/accommodation/${owner}`)
      .then(response => response.json())
      .then(data => {
        //console.log('allDatas : ', data);
        setAccommodationsData(data);
      });
  }, []);

  /*const fauxHebergements=[{
      name: "Appartement Cosy au Cœur de la Ville",
      picture: require("../assets/faux-appart-1.jpg"),
      address: "45 rue des Chats Volants, Paris",
      description: "Charmant appartement situé au cœur de la ville, à quelques pas des boutiques, restaurants et attractions locales. Cet espace confortable offre une chambre spacieuse, une cuisine entièrement équipée et un salon lumineux. Profitez de vues pittoresques depuis le balcon privé ou détendez-vous dans le jardin commun. Idéal pour les voyageurs en quête de confort et de commodité.",
      price: 210,
      distribution: ["AirBNB", "Booking.com", "Expedia"],
    },
    {
      name: "Penthouse de Luxe avec Vue Panoramique",
      picture: require("../assets/faux-appart-2.jpg"),
      address: "28 avenue du Bonheur, New York",
      description: "Découvrez le luxe ultime dans ce magnifique penthouse avec vue panoramique sur la ville. Ce joyau architectural propose des équipements haut de gamme, tels qu'un spa, une salle de sport et une piscine sur le toit. L'intérieur élégant comprend une cuisine moderne, un salon élégant et des chambres somptueuses. Vivez une expérience inoubliable au sommet du monde.",
      price: 320,
      distribution: ["AirBNB", "Expedia"],
    },
    {
      name: "Appartement Artistique au Design Unique",
      picture: require("../assets/faux-appart-3.jpg"),
      address: "12 avenue des Peintres, Rome",
      description: "Plongez dans un univers artistique avec cet appartement au design unique. Chaque pièce est une toile vivante, mélangeant couleurs, textures et œuvres d'art originales. Détendez-vous dans le salon inspirant, cuisinez dans la cuisine créative ou reposez-vous dans une chambre thématique. Une escapade parfaite pour les amateurs d'art et les esprits créatifs.",
      price: 240,
      distribution: ["AirBNB", "Booking.com", "Expedia"],
    },
    {
      name: "Oasis Urbaine au Bord du Lac",
      picture: require("../assets/faux-appart-4.jpg"),
      address: "8 rue des Berges, Zurich",
      description: "Cet appartement paisible est niché au bord d'un lac scintillant, offrant une évasion urbaine sereine. Profitez des vues apaisantes depuis le balcon privé et promenez-vous dans les jardins paysagers. L'intérieur moderne dispose d'une suite parentale, d'une cuisine bien équipée et d'un espace de travail confortable. Une retraite parfaite pour se ressourcer.",
      price: 175,
      distribution: ["Expedia"],
    },
    {
      name: "Appartement Historique au Charme Ancien",
      picture: require("../assets/faux-appart-5.jpg"),
      address: "3 place des Châteaux, Lisbonne",
      description: "Plongez dans l'histoire avec cet appartement au charme ancien. Situé dans un bâtiment historique restauré, cet espace élégant offre des plafonds voûtés, des cheminées en marbre et des détails d'époque. Détendez-vous dans le salon raffiné, cuisinez dans la cuisine rustique ou reposez-vous dans une chambre opulente. Une expérience intemporelle.",
      price: 310,
      distribution: ["AirBNB"],
    },
    {
      name: "Appartement Hanté dans les quartiers Louches",
      picture: require("../assets/faux-appart-6.jpg"),
      address: "3 rue du Coupe-Gorge, Kitej",
      description: "Vivez une aventure trépidante ainsi que vos derniers instants, dans cette demeure ayant appartenu aux plus grands psychopathes de l'histoire. Décoré avec goût mais en hâte, cet endroit maudit vous offrira des instants inoubliables, que vous n'aurez pas le temps d'oublier. Volcan à cinq minutes à pied.",
      price: 310,
      distribution: ["AirBNB"],
    },
    {
      name: "Appartement Bohème au Style Boho",
      picture: require("../assets/faux-appart-7.jpg"),
      address: "7 allée des Bohémiens, Prague",
      description: "Entrez dans un monde bohème avec cet appartement au style boho. Des couleurs vives, des tapis orientaux et des plantes luxuriantes créent une atmosphère chaleureuse et accueillante. Détendez-vous dans le coin salon confortable, cuisinez dans la cuisine bohème ou détendez-vous dans une chambre aux accents artistiques. Une retraite bohème pittoresque.",
      price: 180,
      distribution: ["AirBNB", "Expedia"],
    },
    {
      name: "Appartement Familial Spacieux avec Jardin",
      picture: require("../assets/faux-appart-8.jpg"),
      address: "22 avenue des Familles, Melbourne",
      description: "Parfait pour les familles, cet appartement spacieux propose des chambres confortables, une salle de jeux pour les enfants et un jardin privé pour les moments de détente en plein air. La cuisine bien équipée et la salle à manger invitent aux repas en famille. Un havre de paix pour créer des souvenirs inoubliables.",
      price: 290,
      distribution: ["Expedia"],
    },
    {
      name: "Appartement Moderne en Centre-Ville",
      picture: require("../assets/faux-appart-9.jpg"),
      address: "5 boulevard des Citadins, Singapour",
      description: "Vivez l'effervescence de la vie en ville dans cet appartement moderne en centre-ville. L'emplacement pratique vous met à proximité des commerces, des restaurants et des transports en commun. Profitez de l'intérieur chic avec une cuisine contemporaine, un salon confortable et des équipements haut de gamme. Une escapade urbaine élégante.",
      price: 235,
      distribution: ["AirBNB", "Expedia"],
    },
    {
      name: "Appartement en Bord de Plage",
      picture: require("../assets/faux-appart-10.jpg"),
      address: "10 avenue des Palmiers, Miami",
      description: "Offrez-vous un séjour de rêve en bord de plage avec cet appartement au design balnéaire. Les larges fenêtres offrent une vue imprenable sur l'océan, tandis que l'intérieur lumineux est décoré dans des tons apaisants. Profitez de l'accès direct à la plage, des piscines et des terrasses ensoleillées. Une escapade de vacances parfaite pour se détendre et se ressourcer.",
      price: 320,
      distribution: ["AirBNB"],
    }
    ]
  */

    const navigation = useNavigation();

    const accommodations = accommodationsData.map((data, i) => {
      // console.log(data.picture)
      const handleWorkOnOneAccommodation = (id) => {
        navigation.navigate('TabNavigator');
        dispatch(updateCurrentAccommodation(id));
      }
      return (
        <TouchableOpacity onPress={() => handleWorkOnOneAccommodation({id: data._id, name:data.name, picture: data.picture,})} style={styles.accommodationContainer} key={i}>
          <Image
          source={{ uri:data.picture }}
          style={styles.accommodationPicture}
          />
          <View style={styles.accommodationText}>
            <Text style={styles.accommodationTitle}>{data.name.substring(0, 20)}...</Text>
            <Text>{data.description.substring(0, 86)}...</Text> 
          </View>
        </TouchableOpacity>
      );
    });

    // const [accommodation, setAccommodation] = useState([]);
  
    // useEffect(() => {
    //   const newAccommodation = (
    //     <View>
    //     <View style={{ height: 1, backgroundColor: 'black',marginTop:10 }} />
    //     <View style={styles.accommodationContainer}>        
    //       <Image source={require('../assets/icon.png')}
    //       style={{height:120, width:130}} />
    //       <View>
    //         <Text style={{fontSize: 20, marginTop:-40}}>Titre du bien </Text>
    //         <Text>Description de l'Appartement</Text> 
    //       </View>
    //       <TouchableOpacity onPress={() => navigation.navigate('AddAccommodationScreen')} style={styles.memobutton}>
    //         <Text>mémo d'achats</Text>
    //       </TouchableOpacity>
    //     </View>
    //     <View style={{ height: 1, backgroundColor: 'black' }} />
    //   </View>
    //   );
  
    //   setAccommodation((prevAccommodation) => [...prevAccommodation, newAccommodation]);
    // }, []);
  
   
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mes Hébergements</Text>
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
    fontSize:30, marginTop:10, marginBottom:22, fontWeight: '600', color: '#FF7A00',
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