import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Modal,
  ScrollView,
  TextInput
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Circle, Rect, Svg } from 'react-native-svg';
import { Picker } from '@react-native-picker/picker';
import Footer from "../components/Footer";
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedDate } from '../reducers/currentReservation';

// Adresse du backend
const BACKEND_ADDRESS = 'https://stay-backend.vercel.app';

const ServiceProvidersScreen = ({ navigation }) => {
  // Redux
  const dispatch = useDispatch();
  const currentReservation = useSelector(state => state.currentReservation.reservationData);
  const selectedDate = useSelector(state => state.currentReservation.selectedDate);

  // State
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedTaskStatus, setSelectedTaskStatus] = useState('Tous');
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTaskType, setSelectedTaskType] = useState('Réservation');
  const [isOptionModalVisible, setOptionModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  // Calcul des dates marquées dans le calendrier
  const calculateMarkedDates = () => {
    const markedDates = {};

    for (let i = 0; i < currentReservation.length; i++) {
      const reservation = currentReservation[i];
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

    Object.keys(selectedDate).forEach((date) => {
      const color = selectedDate[date];
      if (markedDates[date]) {
        markedDates[date].periods.push({ color });
      } else {
        markedDates[date] = {
          periods: [{ color }],
        };
      }
    });

    return markedDates;
  };

  const periods = calculateMarkedDates();

  // Récupération des prestations depuis le backend
  const fetchPrestations = async () => {
    try {
      const response = await fetch(`${BACKEND_ADDRESS}/prestations`);
      const data = await response.json();
      if (data.result) {
        setTasks(data.prestationList);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPrestations();
  }, []);

  // Affichage de la légende du calendrier
  const renderLegend = () => {
    const legends = [
      { color: 'gray', label: 'Réservation' },
      { color: 'red', label: 'Indisponibilité' },
      { color: 'blue', label: 'Ménage' },
      { color: 'green', label: 'Travaux' },
    ];

    return (
      <View style={styles.legendContainer}>
        {legends.map((legend, index) => (
          <View key={index} style={styles.legendItem}>
            <Svg height="12" width="12">
              {legend.color === 'gray' ? (
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

  // Mise à jour d'une tâche
  const handleUpdateTask = (task) => {
    setSelectedTask(task);
    setEditModalVisible(true);
  };

  // Mise à jour d'une tâche via l'API
  const updateTask = async () => {
    try {
      const response = await fetch(`${BACKEND_ADDRESS}/prestations/${selectedTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          start: selectedTask.start,
          end: selectedTask.end,
          status: selectedTask.status,
          tache: selectedTask.tache,
        }),
      });

      const data = await response.json();
      if (data.result) {
        const updatedTasks = tasks.map(task =>
          task._id === selectedTask._id ? data.updatedPrestation : task
        );
        setTasks(updatedTasks);
        setEditModalVisible(false);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Suppression d'une tâche
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`${BACKEND_ADDRESS}/prestations/${taskId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.result) {
        const updatedTasks = tasks.filter(task => task._id !== taskId);
        setTasks(updatedTasks);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Affichage du calendrier
  const renderCalendar = () => {
    return (
      <View style={styles.calendarContainer}>
        <Calendar
          style={styles.calendar}
          markingType="multi-period"
          markedDates={periods}
          onDayPress={handleDayPress}
        />
      </View>
    );
  };

  // Gestion de la sélection d'une date
  const handleDayPress = (day) => {
    const dateString = day.dateString;
    dispatch(updateSelectedDate(selectedDate));

    if (selectedDate[dateString]) {
      const updatedSelectedOptions = { ...selectedDate };
      delete updatedSelectedOptions[dateString];
      setSelectedOptions(updatedSelectedOptions);
    } else {
      setSelectedDates(dateString);
      setOptionModalVisible(true);
    }
  };

  // Création d'une nouvelle tâche
  const handleCreateTask = async () => {
    const selectedDateKeys = Object.keys(selectedDates);
    if (selectedDateKeys.length > 0) {
      const startDate = selectedDateKeys[0];
      const endDate = selectedDateKeys[selectedDateKeys.length - 1];

      const taskData = {
        start: startDate,
        end: endDate,
        status: selectedTaskStatus,
        tache: selectedTaskType,
      };

      try {
        const response = await fetch(`${BACKEND_ADDRESS}/prestations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
        });

        const data = await response.json();
        if (data.result) {
          setTasks([...tasks, taskData]);
          setModalVisible(false);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Affichage des tâches
  const renderTasks = () => {
    let filteredTasks = tasks;
    if (selectedTaskStatus !== 'Tous') {
      filteredTasks = tasks.filter(task => task.status === selectedTaskStatus);
    }

    return (
      <ScrollView style={styles.tasksContainer}>
        {filteredTasks.map((task, index) => (
          <View key={index} style={styles.taskItem}>
            <Text>{task.start} - {task.end}</Text>
            <Text>{task.tache}</Text>
            <Text>{task.status}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleUpdateTask(task)}
            >
              <Text style={styles.editButtonText}>Modifier</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteTask(task._id)}
            >
              <Text style={styles.deleteButtonText}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
  };

  // Affichage du modal d'édition
  const renderEditModal = () => {
    if (!selectedTask) {
      return null;
    }
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Modifier la tâche</Text>
            <TextInput
              style={styles.input}
              placeholder="Début"
              value={selectedTask.start}
              onChangeText={(text) =>
                setSelectedTask({ ...selectedTask, start: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Fin"
              value={selectedTask.end}
              onChangeText={(text) =>
                setSelectedTask({ ...selectedTask, end: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Statut"
              value={selectedTask.status}
              onChangeText={(text) =>
                setSelectedTask({ ...selectedTask, status: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Tâche"
              value={selectedTask.tache}
              onChangeText={(text) =>
                setSelectedTask({ ...selectedTask, tache: text })
              }
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={updateTask}
            >
              <Text>Enregistrer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setEditModalVisible(false)}
            >
              <Text>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  // Affichage du contenu du modal
  const renderModalContent = () => {
    return (
      <View style={styles.modalContent}>
        <Text>Sélectionner un filtre :</Text>
        <Picker
          selectedValue={selectedTaskStatus}
          onValueChange={(itemValue) => setSelectedTaskStatus(itemValue)}
        >
          {/* Options du filtre */}
        </Picker>

        <Text>Sélectionner un type de tâche :</Text>
        <Picker
          selectedValue={selectedTaskType}
          onValueChange={(itemValue) => setSelectedTaskType(itemValue)}
        >
          {/* Options du type de tâche */}
        </Picker>

        <TouchableOpacity
          style={styles.modalButton}
          onPress={handleCreateTask}
        >
          <Text>Ajouter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modalButton}
          onPress={() => setModalVisible(false)}
        >
          <Text>Annuler</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderLegend()}
      <ScrollView>
        {renderCalendar()}

        <View style={styles.filterButtonsContainer}>
          {/* Boutons de filtre */}
        </View>

        {renderTasks()}

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Ajouter une tâche</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {renderModalContent()}
      </Modal>

      {renderEditModal()}

      <Footer navigation={navigation} messageButton={true} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  calendarContainer: {
    borderRadius: 10,
    elevation: 4,
    width: "85%",
    alignSelf: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#fbe29c',
    padding: 7,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: -10,
    width: '60%',
    alignSelf: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  tasksContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  taskItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: 100,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalButton: {
    backgroundColor: '#fbe29c',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 5,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: 'orange',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 30,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ServiceProvidersScreen;
