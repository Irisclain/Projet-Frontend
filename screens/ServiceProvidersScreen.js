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
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Circle, Rect, Svg } from 'react-native-svg';
import { Picker } from '@react-native-picker/picker';
import Footer from "../components/Footer";
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedDate } from '../reducers/currentReservation';

const BACKEND_ADDRESS = 'https://stay-backend.vercel.app';

const ServiceProvidersScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedTaskStatus, setSelectedTaskStatus] = useState('Tous');
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTaskType, setSelectedTaskType] = useState('Réservation');
  const [isOptionModalVisible, setOptionModalVisible] = useState(false);

  const currentReservation = useSelector(state => state.currentReservation.reservationData);
  const selectedDate = useSelector(state => state.currentReservation.selectedDate);

  console.log(currentReservation);
  console.log(selectedDate);
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

  const renderLegend = () => {
    const legends = [
      { color: 'gray', label: 'Réservation' },
      { color: 'red', label: 'Indisponibilité' },
      { color: 'blue', label: 'Ménage' },
      { color: 'green', label: 'Travaux' },
    ];

    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
        {legends.map((legend, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
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

  const renderCalendar = () => {
    /* const { height } = Dimensions.get('window');
    const calendarHeight = height * 0.6; */

    return (
      <View /* style={{ height: calendarHeight }} */>
        <Calendar
          /* theme={{
            calendarBackground: 'white',
            selectedDayBackgroundColor: 'green',
            selectedDayTextColor: 'white',
          }} */
          /* markedDates={selectedDates} */
          /* onDayPress={(day) => handleDayPress(day.dateString)} */
          style={styles.calendar}
          markingType="multi-period"
          markedDates = {periods}
          onDayPress={handleDayPress}
        />
      </View>
    );
  };

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

  const renderTasks = () => {
    let filteredTasks = tasks;
    if (selectedTaskStatus !== 'Tous') {
      filteredTasks = tasks.filter(task => task.status === selectedTaskStatus);
    }

    return (
      <ScrollView style={styles.tasksContainer}>
        {filteredTasks.map((task, index) => (
          <TouchableOpacity key={index} style={styles.taskItem}>
            <Text>{task.start} - {task.end}</Text>
            <Text>{task.tache}</Text>
            <Text>{task.status}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderModalContent = () => {
    return (
      <View style={styles.modalContent}>
        <Text>Sélectionner un filtre :</Text>
        <Picker
          selectedValue={selectedTaskStatus}
          onValueChange={(itemValue) => setSelectedTaskStatus(itemValue)}
        >
          <Picker.Item label="En cours" value="En cours" />
          <Picker.Item label="A venir" value="A venir" />
          <Picker.Item label="A planifier" value="A planifier" />
        </Picker>
  
        <Text>Sélectionner un type de tâche :</Text>
        <Picker
          selectedValue={selectedTaskType}
          onValueChange={(itemValue) => setSelectedTaskType(itemValue)}
        >
          <Picker.Item label="Réservation" value="Réservation" />
          <Picker.Item label="Indisponibilité" value="Indisponibilité" />
          <Picker.Item label="Travaux" value="Travaux" />
          <Picker.Item label="Ménage" value="Ménage" />
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
       {/*  < Calendar style={styles.calendar} /> */}
         {renderCalendar(selectedDates, handleDayPress)}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setSelectedTaskStatus('Tous')}
          >
            <Text>Tous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setSelectedTaskStatus('En cours')}
          >
            <Text>En cours</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setSelectedTaskStatus('A venir')}
          >
            <Text>A venir</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setSelectedTaskStatus('A planifier')}
          >
            <Text>A planifier</Text>
          </TouchableOpacity>
        </View>

        {renderTasks()}

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.button}
        >
          <Text style={styles.text}>Ajouter une tâche</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {renderModalContent()}
        </View>
      </Modal>
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
  calendar: {
    borderRadius: 10,
    elevation: 4,
  },
  button: {
    backgroundColor: '#fbe29c',
    padding: 7,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: -10,
    width: '60%',
    alignSelf: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    fontSize: 20,
  },
  tasksContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  taskItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  calendar: {
    borderRadius: 10,
    elevation: 4,
    width: "85%",
    alignSelf: 'center',
  },
});

export default ServiceProvidersScreen;