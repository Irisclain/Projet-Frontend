import { StyleSheet, Text, TouchableOpacity, View, Modal, FlatList } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome from'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { updateCurrentRoute } from '../reducers/currentRoute';
import { updateCurrentAccommodation } from '../reducers/currentAccommodation';

const BACKEND_ADDRESS = 'https://stay-backend.vercel.app';

export default function MessageScreen({ navigation }) {

  const [modalAccommodationsVisible, setModalAccommodationsVisible] = useState(false);
  const [modalContactsVisible, setModalContactsVisible] = useState(false);
  const [accommodations, setAccommodations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedAccommodations, setSelectedAccommodations] = useState([]);
  const [selectAllAccommodations, setSelectAllAccommodations] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectAllContacts, setSelectAllContacts] = useState(false);
  const [selectedPrestation, setSelectedPrestation] = useState(null);


  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  
    useEffect(() => {
      if (isFocused) {
      dispatch(updateCurrentRoute('MyAccommodations'));
      dispatch(updateCurrentAccommodation({}));
      }
      }, [isFocused]);

    useEffect(() => {
      // Récupérer les données d'hébergements depuis le serveur MongoDB
      fetchAccommodations();
      fetchContacts();
    }, []);
  
    const fetchAccommodations = async () => {
      try {
        const response = await fetch(`${BACKEND_ADDRESS}/accommodation`);
        const data = await response.json();
    
        if (data && data.accommodationList) {
          const accommodationNames = data.accommodationList.map(accommodation => ({
            id: accommodation._id,
            name: accommodation.name
          }));
          setAccommodations(accommodationNames);
        } else {
          console.log("Les données ne sont pas au format attendu.");
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des hébergements :', error);
      }
    };

    const fetchContacts = async () => {
      try {
        const response = await fetch(`${BACKEND_ADDRESS}/users`);
        const data = await response.json();
    
        if (data) {
          //console.log(data);
          const contactsNames = data.map(contact => ({
            id: contact._id,
            name: contact.username,
            prestation: contact.services ? contact.services.prestation : "N/A"
          }));
          setContacts(contactsNames);
        } else {
          console.log("Les données ne sont pas au format attendu.");
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des contacts :', error);
      }
    };
  
    //Partie Accommodations
    const handleSelectAccommodation = (accommodation) => {
      const selectedList = [...selectedAccommodations];
    
      if (!selectedList.includes(accommodation.name)) {
        selectedList.push(accommodation.name);
      } else {
        const index = selectedList.indexOf(accommodation.name);
        selectedList.splice(index, 1);
      }
    
      setSelectedAccommodations(selectedList);
    
      if (selectedList.length === accommodations.length) {
        setSelectAllAccommodations(true);
      } else {
        setSelectAllAccommodations(false);
      }
    };

    const handleSelectAllAccommodations = () => {
      if (selectAllAccommodations) {
        setSelectedAccommodations([]);
      } else {
        const allAccommodationNames = accommodations.map(accommodation => accommodation.name);
        setSelectedAccommodations(allAccommodationNames);
      }
      setSelectAllAccommodations(!selectAllAccommodations);
    };

    const renderItemAccommodations = ({ item }) => (
      <TouchableOpacity onPress={() => handleSelectAccommodation(item)}>
        <View style={styles.checkboxContainer}>
          <FontAwesome
            name={selectedAccommodations.includes(item.name) ? "check-square-o" : "square-o"}
            color={selectedAccommodations.includes(item.name)? "green" : "black"}
            size={25}
          />
          <Text style={styles.modalTitle}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
    
    const handleNavigation = (selectedUsername) => {
      navigation.navigate('Chat', { username: selectedUsername });
    };
// Partie Contacts
const handleSelectContacts = (contact) => {
  const selectedList = [...selectedContacts];

  if (!selectedList.includes(contact.name)) {
    selectedList.push(contact.name);
  } else {
    const index = selectedList.indexOf(contact.name);
    selectedList.splice(index, 1);
  }

  setSelectedContacts(selectedList);

  if (selectedList.length === contacts.length) {
    setSelectAllContacts(true);
  } else {
    setSelectAllContacts(false);
  }
};

const handleSelectAllContacts = () => {
  if (selectAllContacts) {
    setSelectedContacts([]);
  } else {
    const allContactsNames = contacts
      .filter(contact => contact.prestation === selectedPrestation)
      .map(contact => contact.name);
    setSelectedContacts(allContactsNames);
  }
  setSelectAllContacts(!selectAllContacts);
};

const renderItemContact = ({ item }) => {
  if (item.prestation === selectedPrestation) {
    return (
      <TouchableOpacity onPress={() => handleSelectContacts(item)}>
      <View style={styles.checkboxContainer}>
        <FontAwesome
          name={selectedContacts.includes(item.name) ? "check-square-o" : "square-o"}
          color={selectedContacts.includes(item.name)? "green" : "black"}
          size={25}
        />
        <Text style={styles.modalTitle}>{item.name}</Text>
      </View>
    </TouchableOpacity>
    );
  } else {
    return null;
  }
};


  return (
    <View style={styles.container}>

      <View style={styles.inset}>
      <Text style={styles.title}>Messagerie</Text>

      <Text style={styles.accomodationList}>Choix du logement
      <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => setModalAccommodationsVisible(true)} style={styles.angles}>
            <FontAwesome name="angle-down" color="black" size={25} />
          </TouchableOpacity>
      </View>
      </Text>
      <Modal
      visible={modalAccommodationsVisible}
      onRequestClose={() => setModalAccommodationsVisible(false)}
      animationType="slide"
    >
      <View style={styles.centeredView}>
      <View style={styles.modalView}>
      <View style={styles.selectionModalContent}>
      <TouchableOpacity onPress={handleSelectAllAccommodations} style={{ marginRight: 10 }}>
        <FontAwesome
          name={selectAllAccommodations ? "check-square-o" : "square-o"}
          color={selectAllAccommodations? "green" : "black"}
          size={25}
        />
        </TouchableOpacity>
        <Text style={styles.selection}>Sélectionner tout</Text>
      </View>
        <Text style={styles.modalHeader}>Liste des hébergements</Text>
        <FlatList
          data={accommodations}
          renderItem={renderItemAccommodations}
          keyExtractor={(item) => item.id}
        />
        <TouchableOpacity onPress={() => setModalAccommodationsVisible(false)}>
          <Text>Fermer</Text>
        </TouchableOpacity>
      </View>
      </View>
    </Modal>

      <View style={styles.selectedItemsContainer}>
          {selectedAccommodations.length > 3 ? (
            <View>
              {selectedAccommodations.slice(0, 3).map(accommodationName => (
                <Text key={accommodationName} style={styles.selectedItemText}>
                  {accommodationName}
                </Text>
              ))}
              <Text style={styles.selectedItemText}>
                +{selectedAccommodations.length - 3} hébergements
              </Text>
            </View>
          ) : (
            selectedAccommodations.map(accommodationName => (
              <Text key={accommodationName} style={styles.selectedItemText}>
                {accommodationName}
              </Text>
            ))
          )}
        </View>
      <View style={styles.allbuttons}>
      <View style={styles.buttonPrestaContainer}>
      <LinearGradient
     colors={['#CD43FD', '#FF7A00', '#FAB26F', '#FFE279']}
     start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
     style={styles.header}>
      <TouchableOpacity style={styles.button}  onPress={() => {setSelectedPrestation('Ménage'); setModalContactsVisible(true);}}>
          <Text style={styles.buttonText}>Ménage</Text>
        </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
     colors={['#CD43FD', '#FF7A00', '#FAB26F', '#FFE279']}
     start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
     style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={() => {setSelectedPrestation('Dépannage'); setModalContactsVisible(true);}}>
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

        <Modal
      visible={modalContactsVisible}
      onRequestClose={() => setModalContactsVisible(false)}
      animationType="slide"
    >
      <View style={styles.centeredView}>
      <View style={styles.modalView}>
      <View style={styles.selectionModalContent}>
      <TouchableOpacity onPress={handleSelectAllContacts} style={{ marginRight: 10 }}>
        <FontAwesome
          name={selectAllContacts ? "check-square-o" : "square-o"}
          color={selectAllContacts? "green" : "black"}
          size={25}
        />
        </TouchableOpacity>
        <Text style={styles.selection}>Sélectionner tout</Text>
      </View>
        <Text style={styles.modalHeader}>Liste des contacts</Text>
        <FlatList
          data={contacts}
          renderItem={renderItemContact}
          keyExtractor={(item) => item.id}
        />
        <TouchableOpacity onPress={() => setModalContactsVisible(false)}>
          <Text>Fermer</Text>
        </TouchableOpacity>
      </View>
      </View>
    </Modal>


        <Text style={styles.contactList}>Contacts Sélectionnés :
      </Text>
      
    <View style={styles.selectedItemsContainer}>
          {selectedContacts.length > 3 ? (
            <View>
              {selectedContacts.slice(0, 3).map(contactName => (
                <Text key={contactName} style={styles.selectedItemText}>
                  {contactName}
                </Text>
              ))}
              <Text style={styles.selectedItemText}>
                +{selectedContacts.length - 3} contacts
              </Text>
            </View>
          ) : (
            selectedContacts.map(contactName => (
              <Text key={contactName} style={styles.selectedItemText}>
                {contactName}
              </Text>
            ))
          )}
        </View>

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
    marginTop: 0, 
    marginBottom: -30,
  },
  allbuttons: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: -40,
  },
  angles: {
    marginLeft: 5,
    marginBottom: -4,
  },
  bannerbackground: {
    position: 'absolute',
    top: -30,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'black',
  },
  bannerImage:{
    position: 'absolute',
    top: 5,
    left: 5,
    width: 180,
    height: 50,
    marginBottom: -10,
  },
  blackBanner:{
    marginTop: -20,
    width: '100%',
    height: 50,
  },
  button: {
    width: 158,
    height: 64,
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
    width: '100%',
    height: 41,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonPrestaContainer: {
    display: 'flex',
    width: '100%',
    height: 41,
    flexDirection: 'row',
    alignItems: 'center',
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
    marginTop: -20,
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
    marginTop: 70,
    flex: 0.98,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactList: {
    color: '#000',
    fontSize: 18,
    fontStyle: 'italic',
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: -30,
  },
  container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white',
      paddingTop: 40,
    },
  header: {
    width: 162,
    height: 68,
    marginBottom: -10,
    borderRadius: 10,
    borderRadius: 10,
    marginTop: 60,
    marginRight: 9,
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
    width: 340,
    height: 64,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderRadius: 10,
    margin: 2,
    justifyContent: 'center',
  },
  locaHeader: {
    width: 344,
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
  selectedItemsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 30,
  },
  selectedItemText: {
    backgroundColor: '#EBEAE7',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 5,
    textAlign: 'center',
  },
  selection: {
    fontSize: 16,
    marginLeft: 10,
  },
  selectionModalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Pour aligner à droite
    marginRight: 110, // Espacement du bord droit
    marginBottom: 10,
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
    marginBottom: 5,
    marginTop: -50,
  },
});