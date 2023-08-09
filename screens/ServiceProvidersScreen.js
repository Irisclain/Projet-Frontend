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
import { updateCurrentTask, updateSelectedDate } from '../reducers/currentReservation';

const BACKEND_ADDRESS = "https://stay-backend.vercel.app";

export default function ServiceProvidersScreen({ navigation }) {
  const dispatch = useDispatch();

  const [selectedDates, setSelectedDates] = useState("");
  const [selectedFilter, setSelectedFilter] = useState('Tout');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isOptionModalVisible, setOptionModalVisible] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedTaskStatus, setSelectedTaskStatus] = useState('Tout');
  const [legends, setLegends] = useState([
    { color: "grey", label: "Réservation" },
    { color: "red", label: "Indisponibilité" },
    { color: "blue", label: "Ménage" },
    { color: "green", label: "Dépannage" },
  ]);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({
      start: "",
      end: "",
      status: "",
      tache: "",
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [isTaskModalVisible, setTaskModalVisible] = useState(false);
  const [isModalModifVisible, setModalModifVisible] = useState(false);
//console.log(reservations)

const currentReservation = useSelector(state => state.currentReservation.reservationData);

console.log(tasks)


const calculateMarkedDates = () => {
  const updatedMarkedDates = { ...markedDates };
  const markedDates = {};
// partie visibilité des réservations via reducers
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


const statusColors = {
  "Indisponibilité": "red",
  "Ménage": "blue",
  "Dépannage": "green",
};

// Ajouter les tâches au calendrier
for (let index = 0; index < tasks.length; index++) {
  const task = tasks[index];
  //console.log(task.tache);
  
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
  dispatch(updateSelectedDate(selectedOptions));
   

  return markedDates;
}; 


const periods = calculateMarkedDates();

const updateMarkedDates = () => {
  const newMarkedDates = calculateMarkedDates();
  setMarkedDates(newMarkedDates);
};

  useEffect(() => {
    fetchPrestations();
  }, []);

  useEffect(() => {
      if (selectedDates && selectedOptions[selectedDates]) {
        const dateString = selectedDates;
        const value = selectedOptions[dateString];
    
        let tache = "";
        if (value === 'red') {
          tache = 'Indisponibilité';
        } else if (value === 'blue') {
          tache = 'Ménage';
        } else if (value === 'green') {
          tache = 'Dépannage';
        }
    
        const newTask = {
          start: dateString,
          end: dateString,
          status: selectedTaskStatus,
          tache: tache,
        };
    
        // Vérifier si la date de début et la date de fin sont les mêmes
        const existingTask = tasks.find(task => task.start === dateString && task.end === dateString);
    
        if (!existingTask) {
          setTasks((prevTasks) => [...prevTasks, newTask]);
        }
      }
    }, [selectedDates, selectedOptions]);

  const fetchPrestations = async () => {
      try {
        const response = await fetch(`${BACKEND_ADDRESS}/prestations`);
        const data = await response.json();
        if (data.result) {
          setTasks(data.prestationList);
          dispatch(updateCurrentTask(data.prestationList));
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error(error);
      }
    };


  const handleCreateTask = async () => {
try {
  const response = await fetch(`${BACKEND_ADDRESS}/prestations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...taskData,
      start: taskData.start.toISOString(),
      end: taskData.end.toISOString(),
    }),
  });
  
  if (response.ok) {
    // Update the local tasks array with the new task
    const newTask = {
      ...taskData,
      start: taskData.start.toISOString(),
      end: taskData.end.toISOString(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    
    setTaskData({
      start: "",
      end: "",
      status: "",
      tache: "",
    });
    
    fetchPrestations();
  } else {
    console.error("Error creating task:", response.status);
  }
} catch (error) {
  console.error("Error creating reservation:", error);
}

updateMarkedDates();
setTaskModalVisible(false);
};


//Modifier les taches
const handleUpdateTask = (task) => {
  setSelectedTask(task);
  setEditModalVisible(true);
};

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

// Delete tache
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

  const renderTasks = () => {
      const sortedTasks = tasks.sort((a, b) => new Date(a.start) - new Date(b.start));
      
      const currentDate = new Date();
    
      const ongoingTasks = sortedTasks.filter(task => new Date(task.start) <= currentDate && currentDate <= new Date(task.end));
      const upcomingTasks = sortedTasks.filter(task => new Date(task.start) > currentDate);
      const plannedTasks = sortedTasks.filter(task => !task.start);
      
      let filteredTasks = [];
      
      if (selectedTaskStatus === 'En cours') {
        filteredTasks = ongoingTasks;
      } else if (selectedTaskStatus === 'A venir') {
        filteredTasks = upcomingTasks;
      } else if (selectedTaskStatus === 'A planifier') {
        filteredTasks = plannedTasks;
      } else if (selectedTaskStatus === 'Tout') {
        filteredTasks = sortedTasks;
      }
      
      return filteredTasks;
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

  const handleOptionSelect = (option) => {
    setOptionModalVisible(false);
    setSelectedOptions((prevSelectedOptions) => {
      const updatedSelectedOptions = { ...prevSelectedOptions };
      if (updatedSelectedOptions[selectedDates] === option) {
        delete updatedSelectedOptions[selectedDates];
      } else {
        updatedSelectedOptions[selectedDates] = option;
      }
      return updatedSelectedOptions;
    });
    
    const updatedMarkedDates = calculateMarkedDates();
    setMarkedDates(updatedMarkedDates);
  };

  const handleDayPress = (day) => {
      const dateString = day.dateString;
    
      if (selectedOptions[dateString]) {
        const updatedSelectedOptions = { ...selectedOptions };
        delete updatedSelectedOptions[dateString];
        setSelectedOptions(updatedSelectedOptions);
      } else {
        setOptionModalVisible(true);
        setSelectedDates(dateString);
      }
    


        /* const dayObject = day;
        
        // Extraire les valeurs de l'objet dayObject
        const year = dayObject.year;
        const month = dayObject.month - 1; // Soustraire 1 car les mois commencent à partir de 0
        const dayOfMonth = dayObject.day;
        
        // Créer un nouvel objet Date à partir des valeurs extraites
        const selectedDate = new Date(year, month, dayOfMonth);
        
        // Obtenir la chaîne au format ISO
        const selectedDateISO = selectedDate.toISOString();

        let value = Object.values(selectedOptions).toString();
      
        if (value === 'red') {
            value = 'Indisponibilité';
        } else if (value === 'blue') {
            value = 'Ménage';
        } else if (value === 'green') {
            value = 'Dépannage';
        }
      
        const newTask = {
          start: selectedDateISO + 1,
          end: selectedDateISO,
          status: 'A venir',
          tache: value,
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);*/
      }; 

  const handleFilterTask = (task) => {
      setSelectedTaskStatus(task)
      setSelectedFilter(task)
      };

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

  const renderOptionModal = () => {
      return(
      <Modal visible={isOptionModalVisible} transparent={true} animationType="slide">
              <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                          <Text style={styles.optionTitle}>Choisir une option:</Text>
                      <TouchableOpacity
                      onPress={() => handleOptionSelect('red')}>
                              <Text style={styles.optionButtonTextI} >Indisponibilité</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      onPress={() => handleOptionSelect('blue')}>
                              <Text style={styles.optionButtonTextM}>Ménage</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      onPress={() => handleOptionSelect('green')}>
                          <Text style={styles.optionButtonTextD}>Dépannage</Text>
                      </TouchableOpacity>
                  </View>
              </View>
        </Modal>
  )};

  const renderNewTaskModal = () => {
      return (
          <Modal visible={isTaskModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Nouvelle Tâche</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Début (format : YYYY-MM-DD)"
                  placeholderTextColor="#999"
                  value={taskData.start}
                  onChangeText={(date) =>
                    setTaskData((prevData) => ({
                      ...prevData,
                      start: new Date(date), // Convertir la chaîne en instance de date ou null
                    }))
                  }
                />
  
                <TextInput
                  style={styles.input}
                  placeholder="Fin (format : YYYY-MM-DD)"
                  placeholderTextColor="#999"
                  value={taskData.end}
                  onChangeText={(date) =>
                    setTaskData((prevData) => ({
                      ...prevData,
                      end: new Date(date), // Convertir la chaîne en instance de date ou null
                    }))
                  }
                />
              <TextInput
                style={styles.input}
                placeholder="Statut"
                placeholderTextColor="#999"
                value={taskData.status}
                onChangeText={(text) => {
                  setTaskData((prevData) => ({
                    ...prevData,
                    price: text,
                  }));
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Tache"
                placeholderTextColor="#999"
                value={taskData.tache}
                onChangeText={(text) =>
                  setTaskData((prevData) => ({
                    ...prevData,
                    status: text,
                  }))
                }
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleCreateTask}
              >
                <Text style={styles.textButton}>Confirmer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setTaskModalVisible(false)}
              >
                <Text style={styles.textButton}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {renderLegend()}
        <View>
        <Calendar
          style={styles.calendar}
          markingType="multi-period"
          markedDates = {periods}
          onDayPress={handleDayPress}
        />
        <View style={styles.buttonsContainer}>
          {renderOptionModal()}
      <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === 'Tout' ? styles.selectedFilter : null,
          ]}
          onPress={() => handleFilterTask('Tout')}
        >
          <Text>Tout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === 'En cours' ? styles.selectedFilter : null,
          ]}
          onPress={() => handleFilterTask('En cours')}
        >
          <Text>En cours</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
             selectedFilter === 'A venir' ? styles.selectedFilter : null,
          ]}
          onPress={() => handleFilterTask('A venir')}
        >
          <Text>A venir</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
             selectedFilter === 'A planifier' ? styles.selectedFilter : null, 
          ]}
          onPress={() => handleFilterTask('A planifier')}
        >
          <Text>A planifier</Text>
        </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.taskContainer}>
      {renderTasks().map((task, index) => (
        <View key={index} style={styles.taskItem}>
          <Text>{task.start} - {task.end}</Text>
          <Text>Status : {task.status}</Text>
          <Text>Tache : {task.tache}</Text>
          <View>
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
        </View>
      ))}
    </ScrollView>

        <TouchableOpacity
          style={styles.openModalButton}
          onPress={() => setTaskModalVisible(true)}
        >
          <Text style={styles.openModalButtonText}>Ajouter une tache</Text>
        </TouchableOpacity>

      </ScrollView>

{/*Modal pour la nouvelle tache */}
     {renderNewTaskModal()}
      {renderEditModal()}

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
  filterButton: {
      paddingVertical: 10,
      paddingHorizontal: 30,
      backgroundColor: 'white',
      borderRadius: 5,
      fontSize: 20,
      borderBottomWidth: 2,
      borderBottomColor: 'lightgrey',
    },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
  },
  selectedFilter: {
      borderBottomColor: 'black',
    },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  modalButton: {
      backgroundColor: '#fbe29c',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
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
      marginTop: 20,
      position: 'absolute',
      bottom: 10,
      right: 0,
  
    },
    editButtonText: {
      color: "white",
      fontWeight: "bold",
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
    marginTop: -80,
    position: 'absolute',
    top: 0,
    right: 0

  },
  buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: 10,
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
});