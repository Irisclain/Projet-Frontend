import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Circle, Rect, Svg } from "react-native-svg";
import Footer from "../components/Footer";
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentReservation, updateSelectedDate } from '../reducers/currentReservation';

const BACKEND_ADDRESS = "https://stay-backend.vercel.app";

export default function ReservationsScreen({ navigation }) {
  const dispatch = useDispatch();

  const [selectedDates, setSelectedDates] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [markedDates, setMarkedDates] = useState({});
  const [legends, setLegends] = useState([
    { color: "grey", label: "Réservation" },
    { color: "red", label: "Indisponibilité" },
    { color: "blue", label: "Ménage" },
    { color: "green", label: "Dépannage" },
  ]);
  const [editingReservation, setEditingReservation] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [reservationData, setReservationData] = useState({
    nom: "",
    arrival: "", // Initialisez avec la date actuelle ou une date par défaut
    departure: "",
    price: "",
    status: "",
    distribution: "",
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isModalModifVisible, setModalModifVisible] = useState(false);
//console.log(reservations)

const selectedDate = useSelector(state => state.currentReservation.selectedDate);
const currentTask = useSelector(state => state.currentReservation.currentTask);

const calculateMarkedDates = () => {
  const markedDates = {};

  for (let i = 0; i < reservations.length; i++) {
    const reservation = reservations[i];
    const arrivalDateString = reservation.arrival;
    const departureDateString = reservation.departure;
    
    if (arrivalDateString && departureDateString) {
      const arrival = new Date(arrivalDateString);
      const departure = new Date(departureDateString);
      

    const currentDate = new Date(arrival);
    while (currentDate <= departure) {
      const formattedDate = currentDate.toISOString().split("T")[0];
      if (!markedDates[formattedDate]) {
        markedDates[formattedDate] = {
          periods: [],
        };
      }
      markedDates[formattedDate].periods.push({
        color: "grey",
        textColor: "white",
        text: `Réservation ${i + 1}`,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
}

const statusColors = {
  "Indisponibilité": "red",
  "Ménage": "blue",
  "Dépannage": "green",
};

// Ajouter les tâches au calendrier
for (let index = 0; index < currentTask.length; index++) {
  const task = currentTask[index];
  
  const startDate = new Date(task.start);
  const endDate = new Date(task.end);

  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const formattedDate = currentDate.toISOString().split("T")[0];
    if (!markedDates[formattedDate]) {
      markedDates[formattedDate] = {
        periods: [],
      };
    }

    const color = statusColors[task.tache] || 'black'; // Utiliser bleu par défaut si le statut n'est pas reconnu
    markedDates[formattedDate].periods.push({
      color,
      textColor: 'white',
      text: `Tâche ${index + 1}`,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }
}

if (selectedDate) {
  Object.keys(selectedDate).forEach((date) => {
    const color = selectedDate[date];
    
    if (!markedDates[date]) {
      markedDates[date] = {
        periods: [],
      };
    }

    markedDates[date].periods.push({ color });
  });
}

  return markedDates;
}; 

const periods = calculateMarkedDates();


  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch(`${BACKEND_ADDRESS}/reservation`);
      if (response.ok) {
        const data = await response.json();
        setReservations(data.reservationList);
        dispatch(updateCurrentReservation(data.reservationList));
      } else {
        console.error("Error fetching reservations:", response.status);
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const handleCreateReservation = async () => {
    try {
      const response = await fetch(`${BACKEND_ADDRESS}/reservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...reservationData,
          arrival: reservationData.arrival.toISOString(), // Convertir en chaîne au format ISO
          departure: reservationData.departure.toISOString(), // Convertir en chaîne au format ISO
        }),
      });

      if (response.ok) {
        setReservationData({
          name: "",
          arrival: "",
          departure: "",
          price: "",
          status: "",
          distribution: "",
        });
        fetchReservations();
        setModalVisible(false);
      } else {
        console.error("Error creating reservation:", response.status);
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };
  //Supprimer une réservation
  const handleDeleteReservation = async (reservationId) => {
    try {
      const response = await fetch(
        `${BACKEND_ADDRESS}/reservation/${reservationId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Mettez à jour la liste des réservations en supprimant celle qui a été supprimée
        setReservations((prevReservations) =>
          prevReservations.filter(
            (reservation) => reservation._id !== reservationId
          )
        );
      } else {
        console.error("Error deleting reservation:", response.status);
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  // Modifier Réservation
  const [editMode, setEditMode] = useState(false);
  const handleEditReservation = (reservation) => {
    // Ouvrir le formulaire de mise à jour avec les détails de la réservation pré-remplis
    setReservationData({
      name: reservation.name,
      arrival: reservation.arrival.split("T")[0], // Convertir en chaîne au format ISO
      departure: reservation.departure.split("T")[0], // Convertir en chaîne au format ISO
      price: reservation.price,
      status: reservation.status,
      distribution: reservation.distribution,
    });
    setEditingReservation(reservation);
    setEditMode(true); // Définir le mode de modification sur vrai
    setModalModifVisible(true); // Ouvrir la modal
  };

  const handleUpdateReservation = async () => {
    try {

      const response = await fetch(
        `${BACKEND_ADDRESS}/reservation/${editingReservation._id}`, // Utilisez `reservationData._id` au lieu de `reservation._id`
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservationData),
        }
      );
      if (response.ok) {
        // Mise à jour de l'état local "reservations" avec les nouvelles données
        setReservations((prevReservations) =>
          prevReservations.map((prevReservation) =>
            prevReservation._id === editingReservation._id
              ? { ...prevReservation, ...reservations }
              : prevReservation
          )
        );
  
        setReservationData({
          name: "",
          arrival: "",
          departure: "",
          price: "",
          status: "",
          distribution: "",
        });
        setEditMode(false);
        setModalModifVisible(false);
        dispatch(updateCurrentReservation(reservationData));
      } else {
        console.error("Error updating reservation:", response.status);
      }
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };
  

  const renderLegend = () => {
    return (
      <View style={styles.legendContainer}>
        {legends.map((legend, index) => (
          <View key={index} style={styles.legendItem}>
            <Svg height="12" width="12">
              {legend.color === "gray" ? (
                <Circle cx="6" cy="6" r="5" fill={legend.color} />
              ) : (
                <Rect x="1" y="1" width="10" height="10" fill={legend.color} />
              )}
            </Svg>
            <Text>{legend.label}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {renderLegend()}
        <View>
        <Calendar
          style={styles.calendar}
          markingType="multi-period"
          markedDates = {periods}
        />
      </View>

        {reservations.map((reservation) => (
          <View key={reservation._id} style={styles.reservationItem}>
            <Text>Nom : {reservation.name}</Text>
            <Text>Arrivée: {reservation.arrival.split("T")[0]}</Text>
            <Text>Départ : {reservation.departure.split("T")[0]}</Text>
            <Text>Prix : {reservation.price}€</Text>
            <Text>Status : {reservation.status}</Text>
            <Text>Distribution :{reservation.distribution}</Text>
            {/* Ajouter d'autres propriétés ici */}

            {/* Bouton de suppression */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteReservation(reservation._id)}
            >
              <Text style={styles.deleteButtonText}>Supprimer</Text>
            </TouchableOpacity>

            {/* Bouton de modification */}
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditReservation(reservation)}
            >
              <Text style={styles.editButtonText}>Modifier</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          style={styles.openModalButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.openModalButtonText}>Réserver</Text>
        </TouchableOpacity>
      </ScrollView>

      {/*Pour la modal de modification*/}
      <Modal visible={isModalModifVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Réservation</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom"
              placeholderTextColor="#999"
              value={reservationData.name}
              onChangeText={(text) =>
                setReservationData((prevData) => ({
                  ...prevData,
                  name: text,
                }))
              }
            />
            <TextInput
                style={styles.input}
                placeholder="Arrivée (format : YYYY-MM-DD)"
                placeholderTextColor="#999"
                value={reservationData.arrival}
                onChangeText={(date) =>
                  setReservationData((prevData) => ({
                    ...prevData,
                    arrival: new Date(date), // Convertir la chaîne en instance de date ou null
                  }))
                }
              />

              <TextInput
                style={styles.input}
                placeholder="Départ (format : YYYY-MM-DD)"
                placeholderTextColor="#999"
                value={reservationData.departure}
                onChangeText={(date) =>
                  setReservationData((prevData) => ({
                    ...prevData,
                    departure: new Date(date), // Convertir la chaîne en instance de date ou null
                  }))
                }
              />
            <TextInput
              style={styles.input}
              placeholder="Prix"
              placeholderTextColor="#999"
              value={reservationData.price}
              onChangeText={(text) => {
                setReservationData((prevData) => ({
                  ...prevData,
                  price: text,
                }));
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Statut"
              placeholderTextColor="#999"
              value={reservationData.status}
              onChangeText={(text) =>
                setReservationData((prevData) => ({
                  ...prevData,
                  status: text,
                }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Distribution"
              placeholderTextColor="#999"
              value={reservationData.distribution}
              onChangeText={(text) =>
                setReservationData((prevData) => ({
                  ...prevData,
                  distribution: text,
                }))
              }
            />
            {/* Autres champs d'entrée */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleUpdateReservation}
            >
              <Text style={styles.textButton}>Confirmer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalModifVisible(false)}
            >
              <Text style={styles.textButton}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

{/*Modal pour la nouvelle reservation */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Réservation</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom"
              placeholderTextColor="#999"
              value={reservationData.name}
              onChangeText={(text) =>
                setReservationData((prevData) => ({
                  ...prevData,
                  name: text,
                }))
              }
            />
            <TextInput
                style={styles.input}
                placeholder="Arrivée (format : YYYY-MM-DD)"
                placeholderTextColor="#999"
                value={reservationData.arrival}
                onChangeText={(date) =>
                  setReservationData((prevData) => ({
                    ...prevData,
                    arrival: new Date(date), // Convertir la chaîne en instance de date ou null
                  }))
                }
              />

              <TextInput
                style={styles.input}
                placeholder="Départ (format : YYYY-MM-DD)"
                placeholderTextColor="#999"
                value={reservationData.departure}
                onChangeText={(date) =>
                  setReservationData((prevData) => ({
                    ...prevData,
                    departure: new Date(date), // Convertir la chaîne en instance de date ou null
                  }))
                }
              />
            <TextInput
              style={styles.input}
              placeholder="Prix"
              placeholderTextColor="#999"
              value={reservationData.price}
              onChangeText={(text) => {
                setReservationData((prevData) => ({
                  ...prevData,
                  price: text,
                }));
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Statut"
              placeholderTextColor="#999"
              value={reservationData.status}
              onChangeText={(text) =>
                setReservationData((prevData) => ({
                  ...prevData,
                  status: text,
                }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Distribution"
              placeholderTextColor="#999"
              value={reservationData.distribution}
              onChangeText={(text) =>
                setReservationData((prevData) => ({
                  ...prevData,
                  distribution: text,
                }))
              }
            />
            {/* Autres champs d'entrée */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleCreateReservation}
            >
              <Text style={styles.textButton}>Confirmer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textButton}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Footer navigation={navigation} messageButton={true} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  calendar: {
    borderRadius: 10,
    elevation: 4,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  openModalButton: {
    alignItems: "center",
    paddingTop: 8,
    width: "100%",
    marginTop: 30,
    backgroundColor: "#fbe29c",
    borderRadius: 1,
  },
  openModalButtonText: {
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },
  reservationItem: {
    // flexDirection: "column",
    // justifyContent: "",
    // alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
     borderRadiusColor: "black",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  button: {
    alignItems: "center",
    paddingTop: 8,
    width: "100%",
    marginTop: 15,
    backgroundColor: "#fbe29c",
    borderRadius: 1,
  },
  textButton: {
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },
  datePicker: {
    width: "50%",
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 5,
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "orange", 
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 30,
    position: 'absolute',
    top: 0,
    right: 0

  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  optionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  optionButtonTextI:{
    fontSize: 18,
    textAlign: "center",
    margin: 5,
    color: "red"
  },
  optionButtonTextM:{
    fontSize: 18,
    textAlign: "center",
    margin: 5,
    color: "blue",
  },
  optionButtonTextD:{
    fontSize: 18,
    textAlign: "center",
    margin: 5,
    color: "green",
  }
});
