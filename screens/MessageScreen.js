import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { randomUsernames } from '../data/randomUsernames';
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome from'react-native-vector-icons/FontAwesome';

export default function MessageScreen({ navigation }) {
  const handleNavigation = () => {
    const username = randomUsernames[Math.floor(Math.random() * randomUsernames.length - 1)];
    navigation.navigate('Chat', { username });
  };

  return (
    <View style={styles.container}>
      <View style={styles.bannerbackground}/>
      <Image source={require('../assets/Fond-banniere.png')} style={styles.blackBanner} />
        <Image source={require('../assets/Logo-banniere.png')} style={styles.bannerImage} />

      <View style={styles.inset}>
      <Text style={styles.title}>Messagerie</Text>

      <Text style={styles.accomodationList}>Choix du logement <FontAwesome name="angle-down" color="black" size={25} margin={10} /></Text>
      
      <View style={styles.allbuttons}>
      <View style={styles.buttonPrestaContainer}>
      <LinearGradient
     colors={['#CD43FD', '#FF7A00', '#FAB26F', '#FFE279']}
     start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
     style={styles.header}>
      <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ménage</Text>
        </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
     colors={['#CD43FD', '#FF7A00', '#FAB26F', '#FFE279']}
     start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
     style={styles.header}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Dépannage</Text>
        </TouchableOpacity>
      </LinearGradient>
      </View>

      <View style={styles.buttonLocaContainer}>
      <LinearGradient
     colors={['#CD43FD', '#FF7A00', '#FAB26F', '#FFE279']}
     start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
     style={styles.locaHeader}>
        <TouchableOpacity style={styles.locaButton}>
          <Text style={styles.buttonText}>Locataires</Text>
        </TouchableOpacity>
        </LinearGradient>
        </View>
        </View>

        <Text style={styles.contactList}>Choix de contacts <FontAwesome name="angle-down" color="black" size={25} margin={10} /></Text>
        <TouchableOpacity onPress={() => handleNavigation()} style={styles.buttonSend}>
          <Text style={styles.buttonSendText}>Send message 👉🏼</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white',
      paddingTop: 40,
    },
    bannerbackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 30,
      backgroundColor: '#000',
    },
    blackBanner:{
      marginTop: -20,
      width: '100%',
      height: 50,
      marginBottom: -20,
    },
    bannerImage:{
      position: 'absolute',
      top: 5,
      left: 5,
      width: 180,
      height: 50,
    },
    inset: {
      flex: 1,
      width: '100%',
      backgroundColor: 'white',
      paddingTop: 30,
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 30,
      justifyContent: 'space-between', 
      paddingBottom: 10, 
    },
  title: {
    color: '#000',
    fontSize: 28,
    justifyContent: 'center',
    textAlign: 'center',
    textDecorationLine:'underline',
  },
  accomodationList: {
    color: '#000',
    fontSize: 20,
    justifyContent: 'center',
    marginTop: -120, 
  },
  allbuttons: {
    marginTop: -130,
  },
  buttonPrestaContainer:{
    display: 'flex',
    width: 101,
    height: 41,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -15,
  },
  buttonLocaContainer:{
    display: 'flex',
    width: 101,
    height: 41,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -15,
  },
  header: {
    width: 159,
    height: 68,
    marginBottom: -10,
    borderRadius: 10,
    borderRadius: 10,
    marginTop: 60,
    marginRight: 15,
    marginLeft: 5,
  },
  button: {
    width: 155,
    height: 64,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderRadius: 10,
    margin: 2,
    justifyContent: 'center',
  },
  buttonText: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 14,
      justifiyContent: 'center',
      marginBottom: 5,
  },
  locaHeader: {
    width: 334,
    height: 68,
    marginBottom: -10,
    borderRadius: 10,
    borderRadius: 10,
    marginTop: 150,
    marginHorizontal: 8,
  },
  locaButton: {
    width: 330,
    height: 64,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderRadius: 10,
    margin: 2,
    justifyContent: 'center',
  },
  contactList: {
    color: '#000',
    fontSize: 20,
    justifyContent: 'center',
    marginTop: -20,
  },
  buttonSend: {
    backgroundColor: '#fae4b3',
    width: '80%',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#ffe09',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 6.41,
    elevation: 1.2,
    //fontFamily: 'actor',
    fontSize: 18,
    opacity: 0.7,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
},
buttonSendText: {
  fontSize: 16,
  fontStyle: 'bold',
},
});