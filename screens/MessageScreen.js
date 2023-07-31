import { Image, StyleSheet, Text, TouchableOpacity, View, SectionList, Modal } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
//import FontAwesome from'react-native-vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

const DATA = [
  {
    title: 'Mes hébergements',
    data: [
      { name: 'Appartement Bordeaux centre', selected: false },
      { name: 'Villa Marmande', selected: false },
      { name: 'Maison Toulon', selected: false },
      { name: 'Loft Paris', selected: false },
    ],
  },
];

const contactsData = [
  {
    title: 'Mes contacts',
    data: [
      { name: 'Jean-José MENAGE', selected: false },
      { name: 'Irène MECANO', selected: false },
      { name: 'Ursule LESBONSTUYAUX', selected: false },
      { name: 'Jean-Jacques ASPIRATEUR', selected: false },
    ],
  },
];

export default function MessageScreen({ navigation }) {
  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [data, setData] = useState([]);

  const handleNavigation = () => {
    //const username = randomUsernames[Math.floor(Math.random() * randomUsernames.length)];
    const username = 'Iris';

    navigation.navigate('Chat', { username });
  };

  const handlePress1 = (e) => {
    setModal1Visible(true);
  };

  const handleClose1 = () => {
    setModal1Visible(false);
  };

  const handlePress2 = (e) => {
    setModal2Visible(true);
  };

  const handleClose2 = () => {
    setModal2Visible(false);
  };

  //console.log(modalVisible)

  const handleItemSelection = (itemIndex) => {
    const updatedData = [...DATA];
    const sectionIndex = 0;
    updatedData[sectionIndex].data[itemIndex].selected = !updatedData[sectionIndex].data[itemIndex].selected;
    setData(updatedData);
  };

  const handleItemSelection2 = (itemIndex) => {
    const updatedData = [...contactsData];
    const sectionIndex = 0;
    updatedData[sectionIndex].data[itemIndex].selected = !updatedData[sectionIndex].data[itemIndex].selected;
    setData(updatedData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.bannerbackground}/>
      <Image source={require('../assets/Fond-banniere.png')} style={styles.blackBanner} />
        <Image source={require('../assets/Logo-banniere.png')} style={styles.bannerImage} />

      <View style={styles.inset}>
      <Text style={styles.title}>Messagerie</Text>

      <Text style={styles.accomodationList}>Choix du logement
      <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handlePress1} style={styles.angles}>
            <FontAwesome name="angle-down" color="black" size={25} />
          </TouchableOpacity>
      </View>
      </Text>
      <Modal visible={modal1Visible} animationType="fade" transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <SectionList
            sections={DATA}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, index }) => (
              <View style={styles.item}>
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity onPress={() => handleItemSelection(index)} style={styles.checkbox}>
                    <FontAwesome
                      name={item.selected ? 'check-square-o' : 'square-o'}
                      color={item.selected ? 'green' : 'black'}
                      size={25}
                    />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>{item.name}</Text>
                </View>
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.modalHeader}>{title}</Text>
            )}
          />
           <TouchableOpacity onPress={() => handleClose1()} style={styles.modalButton} activeOpacity={0.8}>
              <Text style={styles.textModalButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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

        <Text style={styles.contactList}>Choix de contacts
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handlePress2} style={styles.angles}>
            <FontAwesome name="angle-down" color="black" size={25} />
          </TouchableOpacity>
        </View>
        </Text>
        <Modal visible={modal2Visible} animationType="fade" transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <SectionList
            sections={contactsData}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, index }) => (
              <View style={styles.item}>
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity onPress={() => handleItemSelection2(index)} style={styles.checkbox}>
                    <FontAwesome
                      name={item.selected ? 'check-square-o' : 'square-o'}
                      color={item.selected ? 'green' : 'black'}
                      size={25}
                    />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>{item.name}</Text>
                </View>
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.modalHeader}>{title}</Text>
            )}
          />
           <TouchableOpacity onPress={() => handleClose2()} style={styles.modalButton} activeOpacity={0.8}>
              <Text style={styles.textModalButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

        <TouchableOpacity onPress={() => handleNavigation()} style={styles.buttonSend}>
          <Text style={styles.buttonSendText}>Send message 👉🏼</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  accomodationList: {
    color: '#000',
    fontSize: 20,
    justifyContent: 'center',
    marginTop: -120, 
  },
  allbuttons: {
    marginTop: -130,
  },
  angles: {
    marginLeft: 5,
    marginBottom: -4,
  },
  bannerbackground: {
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#000',
  },
  bannerImage:{
    position: 'absolute',
    top: 5,
    left: 5,
    width: 180,
    height: 50,
  },
  blackBanner:{
    marginTop: -20,
    width: '100%',
    height: 50,
    marginBottom: -20,
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
  buttonLocaContainer:{
    display: 'flex',
    width: 101,
    height: 41,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -15,
  },
  buttonPrestaContainer:{
    display: 'flex',
    width: 101,
    height: 41,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -15,
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
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
    justifiyContent: 'center',
    marginBottom: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactList: {
    color: '#000',
    fontSize: 20,
    justifyContent: 'center',
    marginTop: -20,
  },
  container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white',
      paddingTop: 40,
      marginTop: 10,
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
  item: {
    backgroundColor: '#EBEAE7',
    borderRadius: 30,
    padding: 20,
    marginVertical: 8,
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
  locaHeader: {
    width: 334,
    height: 68,
    marginBottom: -10,
    borderRadius: 10,
    borderRadius: 10,
    marginTop: 150,
    marginHorizontal: 8,
  },
  modalButton: {
    width: 150,
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 8,
    backgroundColor: '#fae4b3',
    borderRadius: 10,
  },
  modalHeader: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textModalButton: {
    color: 'black',
    height: 24,
    fontWeight: '600',
    fontSize: 15,
  },
  title: {
    color: '#000',
    fontSize: 28,
    justifyContent: 'center',
    textAlign: 'center',
    textDecorationLine:'underline',
  },
});