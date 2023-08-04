import { Image, StyleSheet, Text, TouchableOpacity, View, SectionList, Modal } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome from'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentRoute } from '../reducers/currentRoute';
import { updateCurrentAccommodation } from '../reducers/currentAccommodation';

const BACKEND_ADDRESS = 'https://stay-backend.vercel.app';

//fausseDBhébergements
const accommodationsData = [
  {
    title: 'Mes hébergements',
    data: [
      { name: 'Appartement Bordeaux centre', selected: false },
      { name: 'Villa Marmande', selected: false },
      { name: 'Maison Toulon', selected: false },
      { name: 'Loft Paris', selected: false },
    ],
    selectedAll: false,
  },
];

//fausseDBcontacts
const contactsData = [
  {
    title: 'Mes contacts',
    data: [
      { name: 'Jean-José MENAGE', selected: false },
      { name: 'Irène MECANO', selected: false },
      { name: 'Ursule LESBONSTUYAUX', selected: false },
      { name: 'Jean-Jacques ASPIRATEUR', selected: false },
    ],
    selectedAll: false,
  },
];

// Fonction pour obtenir uniquement les noms des hébergements sélectionnés
/* const getSelectedItemsAccommodations = (data) => {
  const selectedItemsAccommodations = [];
  data.forEach((section) => {
    section.data.forEach((item) => {
      if (item.selected) {
        selectedItemsAccommodations.push(item.name);
      }
    });
  });
  return selectedItemsAccommodations;
}; */
// Fonction pour obtenir uniquement les noms des contacts sélectionnés
/* const getSelectedItemsContacts = (data) => {
  const selectedItemsContacts = [];
  data.forEach((section) => {
    section.data.forEach((item) => {
      if (item.selected) {
        selectedItemsContacts.push(item.name);
      }
    });
  });
  return selectedItemsContacts;
}; */

export default function MessageScreen({ navigation }) {
  const dispatch = useDispatch();
  
  useEffect(() => {
      // Récupérer les données des hébergements depuis l'API backend
      /* fetch(`${BACKEND_ADDRESS}/accommodation`)
        .then((response) => response.json())
        .then((data) => setDataAccom(data))
        .catch((error) => console.error('Error fetching accommodations data:', error));
  
      // Récupérer les données des contacts depuis l'API backend
      fetch(`${BACKEND_ADDRESS}/users`)
        .then((response) => response.json())
        .then((data) => setDataCont(data))
        .catch((error) => console.error('Error fetching contacts data:', error)); */

        fetch('https://stay-backend.vercel.app/accommodation')
        .then(response => {
          if (!response.ok) {
            throw new Error('Réponse réseau non valide');
          }
          return response.json();
        })
        .then(data => {
          console.log(data.name);
          
          setDataAccom(data.data);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données d\'hébergement :', error);
        });

        fetch('https://stay-backend.vercel.app/users')
        .then(response => {
          if (!response.ok) {
            throw new Error('Réponse réseau non valide');
          }
          return response.json();
        })
        .then(data => {
          console.log(data.username);
          setDataAccom(data.username);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données d\'hébergement :', error);
        });

    dispatch(updateCurrentRoute('Message'));
    dispatch(updateCurrentAccommodation({}));
  }, []);

  const getSelectedItemsAccommodations = (data) => {
    const selectedItemsAccommodations = [];
    data.forEach((section) => {
      section.data.forEach((item) => {
        if (item.selected) {
          selectedItemsAccommodations.push(item.name);
        }
      });
    });
    return selectedItemsAccommodations;
  };

  const getSelectedItemsContacts = (data) => {
    const selectedItemsContacts = [];
    data.forEach((section) => {
      section.data.forEach((item) => {
        if (item.selected) {
          selectedItemsContacts.push(item.name);
        }
      });
    });
    return selectedItemsContacts;
  };
  
  const [modalAccommodationVisible, setModalAccommodationVisible] = useState(false);
  const [modalContactsVisible, setModalContactsVisible] = useState(false);
  const [dataAccom, setDataAccom] = useState(accommodationsData);
  const [dataCont, setDataCont] = useState(contactsData);
  const [selectAllAccom, setSelectAllAccom] = useState(false);
  const [selectAllCont, setSelectAllCont] = useState(false);

  const selectedItemsAccommodations = getSelectedItemsAccommodations(dataAccom);
  const selectedItemsContacts = getSelectedItemsContacts(dataCont);

  console.log(dataAccom);

  //au clic sur send message envoie sur le chat
  const handleNavigation = () => {
    const username = 'Iris';
    navigation.navigate('Chat', { username });
  };

//pour les modales
  const handlePressAccommodations = (e) => {
    setModalAccommodationVisible(true);
  };

  const handleCloseAccommodations = () => {
    setModalAccommodationVisible(false);
  };

  const handlePressContacts = (e) => {
    setModalContactsVisible(true);
  };

  const handleCloseContacts = () => {
    setModalContactsVisible(false);
  };

  //console.log(modalVisible)

  // Fonctions pour gérer la sélection des éléments d'hébergements (individuels)
  const handleItemSelectionAcccommodations = (itemIndex) => {
    const updatedData = [...dataAccom];   // Copie du tableau 'dataAccom'.
    const sectionIndex = 0; // Index de la section correspondant aux hébergements.
    updatedData[sectionIndex].data[itemIndex].selected = !updatedData[sectionIndex].data[itemIndex].selected;   // Inversion de l'état de sélection de l'élément (coché ou non coché) à l'index 'itemIndex'.
    const allSelected = updatedData[sectionIndex].data.every((item) => item.selected);   // Vérification si tous les éléments de la section sont sélectionnés.
    updatedData[sectionIndex].selectedAll = allSelected;   // Mise à jour de l'état 'selectedAll' de la section en fonction du résultat de l'étape précedente.
    setSelectAllAccom(allSelected);  // Mise à jour de l'état 'selectAllAccom'
    setDataAccom(updatedData);  // Mise à jour du tableau 'dataAccom'.
  };

  // (tous)
  const handleSelectAllAccommodations = () => {
    setDataAccom((prevDataAccom) => {   // Mise à jour de l'état des hébergements en créant une copie du tableau 'dataAccom'.
      const updatedData = [...prevDataAccom];
      updatedData[0].data.forEach((item) => {  // Parcours de tous les éléments du tableau de données d'hébergements.
        item.selected = !selectAllAccom; // Inversion de l'état de sélection pour chaque élément (coché ou non coché)
      });
      setSelectAllAccom(!selectAllAccom); // Mise à jour de l'état 'selectAllAccom' pour refléter l'état global de sélection.
      return updatedData; // Retour de la version mise à jour du tableau de données d'hébergements.
    });
  };

// Fonctions pour gérer la sélection des éléments de contacts (individuels)
// (pour les commentaire explicatifs voir les fonctions accommodations ci-dessus.)
  const handleItemSelectionContacts = (itemIndex) => {
    const updatedData = [...dataCont];
    const sectionIndex = 0;
    updatedData[sectionIndex].data[itemIndex].selected = !updatedData[sectionIndex].data[itemIndex].selected;
    const allSelected = updatedData[sectionIndex].data.every((item) => item.selected);
    updatedData[sectionIndex].selectedAll = allSelected;
    setSelectAllCont(allSelected);
    setDataCont(updatedData);
  };

  //(tous)
  const handleSelectAllContacts = () => {
    setDataCont((prevDataCont) => {
      const updatedData = [...prevDataCont];
      updatedData[0].data.forEach((item) => {
        item.selected = !selectAllCont;
      });
      setSelectAllCont(!selectAllCont);
      return updatedData;
    });
  };

  return (
    <View style={styles.container}>

      <View style={styles.inset}>
      <Text style={styles.title}>Messagerie</Text>

      <Text style={styles.accomodationList}>Choix du logement
      <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handlePressAccommodations} style={styles.angles}>
            <FontAwesome name="angle-down" color="black" size={25} />
          </TouchableOpacity>
      </View>
      </Text>
      <Modal visible={modalAccommodationVisible} animationType="fade" transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <View style={styles.selectionModalContent}>
          <TouchableOpacity onPress={handleSelectAllAccommodations}>
              <FontAwesome
                name={selectAllAccom ? 'check-square-o' : 'square-o'}
                color={selectAllAccom ? 'green' : 'black'}
                size={25}/>
          </TouchableOpacity>
          <Text style={styles.selection}>Tout séléctionner</Text>
          </View>
          <SectionList
            sections={dataAccom}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, index }) => (
              <View style={styles.item}>
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity onPress={() => handleItemSelectionAcccommodations(index)} style={styles.checkbox}>
                    <FontAwesome
                      name={item.selected ? 'check-square-o' : 'square-o'}
                      color={item.selected ? 'green' : 'black'}
                      size={25}/>
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>{item.name}</Text>
                </View>
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.modalHeader}>{title}</Text>
            )}
          />
           <TouchableOpacity onPress={() => handleCloseAccommodations()} style={styles.modalButton} activeOpacity={0.8}>
              <Text style={styles.textModalButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.selectedItemsContainer}>
        {selectedItemsAccommodations.map((name, index) => (
          <Text key={index} style={styles.selectedItemText}>
            {name}
          </Text>
        ))}
      </View>

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
          <TouchableOpacity onPress={handlePressContacts} style={styles.angles}>
            <FontAwesome name="angle-down" color="black" size={25} />
          </TouchableOpacity>
        </View>
        </Text>
        <Modal visible={modalContactsVisible} animationType="fade" transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <View style={styles.selectionModalContent}>
          <TouchableOpacity onPress={handleSelectAllContacts}>
              <FontAwesome
                name={selectAllCont ? 'check-square-o' : 'square-o'}
                color={selectAllCont ? 'green' : 'black'}
                size={25}
                paddingLeft={50}/>
          </TouchableOpacity>
          <Text style={styles.selection}>Tout sélectionner</Text>
          </View>
          <SectionList
            sections={contactsData}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, index }) => (
              <View style={styles.item}>
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity onPress={() => handleItemSelectionContacts(index)} style={styles.checkbox}>
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
           <TouchableOpacity onPress={() => handleCloseContacts()} style={styles.modalButton} activeOpacity={0.8}>
              <Text style={styles.textModalButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.selectedItemsContainer}>
        {selectedItemsContacts.map((name, index) => (
          <Text key={index} style={styles.selectedItemText}>
            {name}
          </Text>
        ))}
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
    marginTop: -60,
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
    fontSize: 20,
    justifyContent: 'center',
    marginTop: 110,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 50,
    marginTop: 30,
  },
  selectedItemText: {
    backgroundColor: '#EBEAE7',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 5,
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
  },
});