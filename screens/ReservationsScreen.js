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
import DatePicker from "react-native-datepicker";
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentRoute } from '../reducers/currentRoute';
import { updateCurrentAccommodation } from '../reducers/currentAccommodation';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const BACKEND_ADDRESS = "https://stay-backend.vercel.app";

export default function ReservationsScreen({ navigation }) {
  const [selectedDates, setSelectedDates] = useState({});
  const [legends, setLegends] = useState([
    { color: "grey", label: "Réservation" },
    { color: "red", label: "Indisponibilité" },
    { color: "blue", label: "Ménage" },
    { color: "green", label: "Travaux" },
  ]);

  const [reservations, setReservations] = useState([]);
  const [reservationData, setReservationData] = useState({
    nom: "",
    arrival: "",
    departure: "",
    price: "",
    status: "",
    distribution: "",
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
console.log(reservations)
  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch(`${BACKEND_ADDRESS}/reservation`);
      if (response.ok) {
        const data = await response.json();
        setReservations(data.reservationList);
      } else {
        console.error("Error fetching reservations:", response.status);
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };


const calculatePeriods = () => {
  const periods = {};

  for (let i = 0; i < reservations.length; i++) {
    const reservation = reservations[i];
    const arrival = new Date(reservation.arrival.split("T")[0]);
    const departure = new Date(reservation.departure.split("T")[0]);

    const currentDate = new Date(arrival);
    while (currentDate <= departure) {
      const formattedDate = currentDate.toISOString().split("T")[0];
      if (!periods[formattedDate]) {
        periods[formattedDate] = {
          periods: [],
        };
      }
      periods[formattedDate].periods.push({
        color: "grey",
        textColor: "white",
        text: `Réservation ${i + 1}`,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  Object.keys(selectedDates).forEach((date) => {
    if (!periods[date]) {
      periods[date] = {
        periods: [],
      };
    }
    periods[date].periods.push({
      color: "red",
      textColor: "white",
      customStyles: {
        container: {
          backgroundColor: "red",
          borderRadius: 20,
        },
      },
      text: "Barre rouge",
    });
  });

  return periods;
  };

const markedDates = calculatePeriods();


  const handleCreateReservation = async () => {
    try {
      const response = await fetch(`${BACKEND_ADDRESS}/reservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        setReservationData({
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
      arrival: reservation.arrival,
      departure: reservation.departure,
      price: reservation.price,
      status: reservation.status,
      distribution: reservation.distribution,
    });
    setEditMode(true); // Définir le mode de modification sur vrai
    setModalVisible(true); // Ouvrir la modal
  };

  const handleUpdateReservation = async () => {
    try {
      const response = await fetch(
        `${BACKEND_ADDRESS}/reservation/${reservation._id}`,
        {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservationData), // Nouvelles données de réservation
        }
      );

      if (response.ok) {
        // Mettez à jour la liste des réservations avec les nouvelles données
        setReservations((prevReservations) =>
          prevReservations.map((prevReservation) =>
            prevReservation._id === reservation._id
              ? { ...prevReservation, ...reservationData }
              : prevReservation
          )
        );

        // Réinitialisez les données de réservation et le mode de modification
        setReservationData({
          arrival: "",
          departure: "",
          price: "",
          status: "",
          distribution: "",
        });
        setEditMode(false);
        setModalVisible(false);
      } else {
        console.error("Error updating reservation:", response.status);
      }
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  // Partie Modal
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    setReservationData((prevData) => ({
      ...prevData,
      arrival: date.toISOString(),
    }));
    hideDatePicker();
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
          markedDates = {markedDates}
          onDayPress={(day) => {
            const selectedDate = day.dateString;
            setSelectedDates((prevSelectedDates) => {
              const newSelectedDates = { ...prevSelectedDates };
              if (newSelectedDates[selectedDate]) {
                delete newSelectedDates[selectedDate];
              } else {
                newSelectedDates[selectedDate] = true;
              }
              return newSelectedDates;
            });
          }}
        />
         <StatusBar style="auto" />
      </View>

        {reservations.map((reservation) => (
          <View key={reservation._id} style={styles.reservationItem}>
            <Text>Nom : {reservation.name}</Text>
            <Text>Arrivée: {reservation.arrival}</Text>
            <Text>Départ : {reservation.departure}</Text>
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

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Réservation</Text>
            <DatePicker
              style={styles.datePicker}
              date={reservationData.arrival}
              mode="date"
              format="YYYY-MM-DD"
              placeholder="Arrivée"
              confirmBtnText="Confirmer"
              cancelBtnText="Annuler"
              customStyles={{
                dateInput: styles.input,
              }}
              onDateChange={(date) =>
                setReservationData((prevData) => ({
                  ...prevData,
                  arrival: date,
                }))
              }
            />

            <DatePicker
              style={styles.datePicker}
              date={reservationData.departure}
              mode="date"
              format="YYYY-MM-DD"
              placeholder="Départ"
              confirmBtnText="Confirmer"
              cancelBtnText="Annuler"
              customStyles={{
                dateInput: styles.input,
              }}
              onDateChange={(date) =>
                setReservationData((prevData) => ({
                  ...prevData,
                  departure: date,
                }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Prix"
              placeholderTextColor="#999"
              value={reservationData.price}
              onChangeText={(text) =>
                setReservationData((prevData) => ({
                  ...prevData,
                  price: text,
                }))
              }
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
  }
});
