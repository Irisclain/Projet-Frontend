import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { randomUsernames } from '../data/randomUsernames';
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome from'react-native-vector-icons/FontAwesome';

export default function HomeScreen({ navigation }) {
  const handleNavigation = () => {
    const username = randomUsernames[Math.floor(Math.random() * randomUsernames.length - 1)];
    navigation.navigate('Chat', { username });
  };

  return (
    <View style={styles.container}>
      <View style={styles.blackBanner}>
        <Image source={require('../assets/Logo-banniere.png')} style={styles.bannerImage} />
      </View>
      <View style={styles.inset}>
      <Text style={styles.title}>Messagerie</Text>
      <Text style={styles.accomodationList}>Choix du logement <FontAwesome name="angle-down" color="black" size={25} margin={10} /></Text>
      <View style={styles.buttonContainer}>
      <LinearGradient
     colors={['#CD43FD', '#FF7A00', '#FAB26F', '#FFE279']}
     start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
     style={styles.header}
   >
      <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ménage</Text>
        </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
     colors={['#CD43FD', '#FF7A00', '#FAB26F', '#FFE279']}
     start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
     style={styles.header}
   >
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Dépannage</Text>
        </TouchableOpacity>
      </LinearGradient>
      </View>
      <LinearGradient
     colors={['#CD43FD', '#FF7A00', '#FAB26F', '#FFE279']}
     start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
     style={styles.header}
   >
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Locataires</Text>
        </TouchableOpacity>
        </LinearGradient>
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
    blackBanner: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 70,
      backgroundColor: '#000',
    },
    bannerImage:{
      position: 'absolute',
      top: 10,
      left: 5,
      width: 180,
      height: 50,
    },
  inset: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
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
    marginTop: 30,
  },
  buttonContainer:{
    display: 'flex',
    width: 101,
    height: 41,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -15,
  },
  header: {
    width: 109,
    height: 68,
    marginBottom: -10,
    borderRadius: 10,
    borderRadius: 10,
    marginTop: 60,
    marginRight: 10,
  },
  button: {
    width: 105,
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
  contactList: {
    color: '#000',
    fontSize: 20,
    justifyContent: 'center',
    marginTop: 80,
  },
  buttonSend: {
    backgroundColor: '#fae4b3',
    width: '60%',
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
  }
});


/*inset: {
    width: '100%',
    height: '35%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: 'rgba(13, 8, 9, 0.9)',
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
    borderTopColor: '#ffe099',
    borderLeftColor: '#ffe099',
    borderRightColor: '#ffe099',
    borderTopWidth: 4,
    borderRightWidth: 0.1,
    borderLeftWidth: 0.1
  },*/
