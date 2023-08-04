
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Circle, Rect, Svg } from 'react-native-svg';
import { Picker } from '@react-native-picker/picker';

const BACKEND_ADDRESS = 'https://stay-backend.vercel.app';

const ServiceProvidersScreen = ({ navigation }) => {
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedTaskStatus, setSelectedTaskStatus] = useState('Tous');
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Ajout de modalVisible
  const [selectedTaskType, setSelectedTaskType] = useState('Réservation');

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
    const { height } = Dimensions.get('window');
    const calendarHeight = height * 0.6;

    return (
      <View style={{ height: calendarHeight }}>
        <Calendar
          theme={{
            calendarBackground: 'white',
            selectedDayBackgroundColor: 'green',
            selectedDayTextColor: 'white',
          }}
          markedDates={selectedDates}
          onDayPress={(day) => handleDayPress(day.dateString)}
        />
      </View>
    );
  };

  const handleDayPress = (date) => {
    const newSelectedDates = { ...selectedDates };
    if (newSelectedDates[date]) {
      delete newSelectedDates[date];
    } else {
      newSelectedDates[date] = { selected: true, selectedColor: 'green' };
    }
    setSelectedDates(newSelectedDates);
  };

  const addTask = () => {
    const selectedDateKeys = Object.keys(selectedDates);
    if (selectedDateKeys.length > 0) {
      const startDate = selectedDateKeys[0];
      const endDate = selectedDateKeys[selectedDateKeys.length - 1];
      const newTask = { startDate, endDate, label: selectedTaskType, status: selectedTaskStatus, type: selectedTaskType }; // Utilisation de selectedTaskType pour le label
      setTasks([...tasks, newTask]);
      setModalVisible(false);
    }
  }

  const renderTasks = () => {
    let filteredTasks = tasks;
    if (selectedTaskStatus !== 'Tous') {
      filteredTasks = tasks.filter(task => task.status === selectedTaskStatus);
    }

    return (
      <View style={styles.tasksContainer}>
        {filteredTasks.map((task, index) => (
          <TouchableOpacity key={index} style={styles.taskItem}>
            <Text>{task.startDate} - {task.endDate}</Text>
            <Text>{task.label}</Text>
            <Text>{task.status}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
          onPress={addTask}
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
      <View style={{ flex: 1, width: '100%' }}>
        {renderCalendar()}

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

        <TouchableOpacity
  onPress={() => setModalVisible(true)} // Ajoutez ceci pour ouvrir la modal
  style={styles.button}
>
  <Text style={styles.text}>Ajouter un tâche</Text>
</TouchableOpacity>

        {renderTasks()}
      </View>
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

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    //marginTop: Platform.OS === 'android' ? 37 : 0,
    backgroundColor: '#DDD',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
   
    width: '50%',
    left: '25%',
    marginTop: 30,
    backgroundColor: 'green',
    borderRadius: 10,
    
    
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
    marginTop: "-40%",
   

  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    fontSize: 20,
   
  },
  tasksContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent pour assombrir l'arrière-plan
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%', // Largeur de la modal
  },
  modalButton: {
    backgroundColor: '#fbe29c',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default ServiceProvidersScreen;







// import React, { useState } from 'react';
// import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Modal } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import { Circle, Rect, Svg } from 'react-native-svg';
// import { Picker } from '@react-native-picker/picker';

// const BACKEND_ADDRESS = 'https://stay-backend.vercel.app';

// const ServiceProvidersScreen = ({ navigation }) => {
//   const [selectedDates, setSelectedDates] = useState({});
//   const [selectedTaskStatus, setSelectedTaskStatus] = useState('Tous');
//   const [tasks, setTasks] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false); // Ajout de modalVisible
//   const [selectedTaskType, setSelectedTaskType] = useState('Réservation');

//   const renderLegend = () => {
//     const legends = [
//       { color: 'gray', label: 'Réservation' },
//       { color: 'red', label: 'Indisponibilité' },
//       { color: 'blue', label: 'Ménage' },
//       { color: 'green', label: 'Travaux' },
//     ];

//     return (
//       <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
//         {legends.map((legend, index) => (
//           <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
//             <Svg height="12" width="12">
//               {legend.color === 'gray' ? (
//                 <Circle cx="6" cy="6" r="5" fill={legend.color} />
//               ) : (
//                 <Rect x="1" y="1" width="10" height="10" fill={legend.color} />
//               )}
//             </Svg>
//             <Text>{legend.label}</Text>
//           </View>
//         ))}
//       </View>
//     );
//   };

//   const renderCalendar = () => {
//     const { height } = Dimensions.get('window');
//     const calendarHeight = height * 0.6;

//     return (
//       <View style={{ height: calendarHeight }}>
//         <Calendar
//           theme={{
//             calendarBackground: 'white',
//             selectedDayBackgroundColor: 'green',
//             selectedDayTextColor: 'white',
//           }}
//           markedDates={selectedDates}
//           onDayPress={(day) => handleDayPress(day.dateString)}
//         />
//       </View>
//     );
//   };

//   const handleDayPress = (date) => {
//     const newSelectedDates = { ...selectedDates };
//     if (newSelectedDates[date]) {
//       delete newSelectedDates[date];
//     } else {
//       newSelectedDates[date] = { selected: true, selectedColor: 'green' };
//     }
//     setSelectedDates(newSelectedDates);
//   };

//   const addTask = () => {
//     const selectedDateKeys = Object.keys(selectedDates);
//     if (selectedDateKeys.length > 0) {
//       const startDate = selectedDateKeys[0];
//       const endDate = selectedDateKeys[selectedDateKeys.length - 1];
//       const newTask = { startDate, endDate, label: selectedTaskType, status: selectedTaskStatus, type: selectedTaskType }; // Utilisation de selectedTaskType pour le label
//       setTasks([...tasks, newTask]);
//       setModalVisible(false);
//     }
//   }

//   const renderTasks = () => {
//     let filteredTasks = tasks;
//     if (selectedTaskStatus !== 'Tous') {
//       filteredTasks = tasks.filter(task => task.status === selectedTaskStatus);
//     }

//     return (
//       <View style={styles.tasksContainer}>
//         {filteredTasks.map((task, index) => (
//           <TouchableOpacity key={index} style={styles.taskItem}>
//             <Text>{task.startDate} - {task.endDate}</Text>
//             <Text>{task.label}</Text>
//             <Text>{task.status}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     );
//   };

//   const renderModalContent = () => {
//     return (
//       <View style={styles.modalContent}>
//         <Text>Sélectionner un filtre :</Text>
//         <Picker
//           selectedValue={selectedTaskStatus}
//           onValueChange={(itemValue) => setSelectedTaskStatus(itemValue)}
//         >
//           <Picker.Item label="En cours" value="En cours" />
//           <Picker.Item label="A venir" value="A venir" />
//           <Picker.Item label="A planifier" value="A planifier" />
//         </Picker>
  
//         <Text>Sélectionner un type de tâche :</Text>
//         <Picker
//           selectedValue={selectedTaskType}
//           onValueChange={(itemValue) => setSelectedTaskType(itemValue)}
//         >
//           <Picker.Item label="Réservation" value="Réservation" />
//           <Picker.Item label="Indisponibilité" value="Indisponibilité" />
//           <Picker.Item label="Travaux" value="Travaux" />
//           <Picker.Item label="Ménage" value="Ménage" />
//         </Picker>
  
//         <TouchableOpacity
//           style={styles.modalButton}
//           onPress={addTask}
//         >
//           <Text>Ajouter</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.modalButton}
//           onPress={() => setModalVisible(false)}
//         >
//           <Text>Annuler</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };
  

//   return (
//     <SafeAreaView style={styles.container}>
//       {renderLegend()}
//       <View style={{ flex: 1, width: '100%' }}>
//         {renderCalendar()}

//         <View style={styles.buttonsContainer}>
//           <TouchableOpacity
//             style={styles.filterButton}
//             onPress={() => setSelectedTaskStatus('Tous')}
//           >
//             <Text>Tous</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.filterButton}
//             onPress={() => setSelectedTaskStatus('En cours')}
//           >
//             <Text>En cours</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.filterButton}
//             onPress={() => setSelectedTaskStatus('A venir')}
//           >
//             <Text>A venir</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.filterButton}
//             onPress={() => setSelectedTaskStatus('A planifier')}
//           >
//             <Text>A planifier</Text>
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity
//   onPress={() => setModalVisible(true)} // Ajoutez ceci pour ouvrir la modal
//   style={styles.button}
// >
//   <Text style={styles.text}>Ajouter un tâche</Text>
// </TouchableOpacity>

//         {renderTasks()}
//       </View>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           {renderModalContent()}
//         </View>
//       </Modal>

//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     //marginTop: Platform.OS === 'android' ? 37 : 0,
//     backgroundColor: '#DDD',
//   },
//   button: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
   
//     width: '50%',
//     left: '25%',
//     marginTop: 30,
//     backgroundColor: 'green',
//     borderRadius: 10,
    
    
//   },
//   text: {
//      color: 'white',
//      fontSize: 20,
//      textAlign: 'center',

//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     marginTop: "-50%",
   

//   },
//   filterButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 24,
//     backgroundColor: 'lightgray',
//     borderRadius: 5,
//     fontSize: 20,
   
//   },
//   tasksContainer: {
//     marginTop: 20,
//     paddingHorizontal: 20,
//   },
//   taskItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//     borderColor: 'gray',
//     borderWidth: 1,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent pour assombrir l'arrière-plan
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     width: '80%', // Largeur de la modal
//   },
//   modalButton: {
//     backgroundColor: '#fbe29c',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 10,
//   },
// });

// export default ServiceProvidersScreen;