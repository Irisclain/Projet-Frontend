import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Circle, Rect, Svg } from 'react-native-svg';

const BACKEND_ADDRESS = 'https://stay-backend.vercel.app';

const ServiceProvidersScreen = ({ navigation }) => {
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
    const calendarHeight = height * 0.6; // Ajuster ici la hauteur du calendrier en pourcentage

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentMonthKey = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`;

    return (
      <View style={{ height: calendarHeight }}>
        <Calendar
          markedDates={getMarkedDates()}
          theme={{
            calendarBackground: 'white',
            selectedDayBackgroundColor: 'green',
            selectedDayTextColor: 'white',
          }}
          onDayPress={handleDayPress}
        />
      </View>
    );
  };

  const legends = [
    { color: 'gray', label: 'Réservation' },
    { color: 'red', label: 'Indisponibilité' },
    { color: 'blue', label: 'Ménage' },
    { color: 'green', label: 'Travaux' },
  ];

  const statusList = [
    { title: 'Tous', color: 'black' },
    { title: 'En cours', color: 'gray' },
    { title: 'A venir', color: 'blue' },
    { title: 'A planifier', color: 'green' },
  ];

  const [selectedStatus, setSelectedStatus] = useState(statusList[0]);
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLegends, setSelectedLegends] = useState([]);

  // Nouvel état pour stocker les tâches avec leurs statuts
  const [tasksWithStatus, setTasksWithStatus] = useState([]);

  const handleAddTask = () => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const newTasks = selectedLegends.map(legend => ({
      title: legend.label,
      status: selectedStatus,
      date: formattedDate,
    }));

    // Ajouter les nouvelles tâches avec leurs statuts au nouvel état tasksWithStatus
    setTasksWithStatus([...tasksWithStatus, ...newTasks]);

    setTasks([...tasks, ...newTasks]);
    setModalVisible(false);
  };

  const handleDayPress = (day) => {
    setSelectedDate(new Date(day.dateString));
  };

  const getFilteredTasks = () => {
    return tasks.filter(
      task =>
        task.date === selectedDate.toISOString().split('T')[0] &&
        (selectedStatus.title === 'Tous' || task.status.title === selectedStatus.title)
    );
  };

  const filteredTasks = getFilteredTasks();

  const getMarkedDates = () => {
    const markedDates = filteredTasks.reduce((acc, task) => {
      acc[task.date] = { marked: true, dotColor: task.status.color };
      return acc;
    }, {});

    return markedDates;
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderLegend()}
      <View style={{ flex: 1, width: '100%' }}>
        {renderCalendar()}
        <View style={styles.navigationRow}>
          {statusList.map((status, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.navigationButton, { backgroundColor: selectedStatus === status ? 'gray' : '#fff' }]}
              onPress={() => setSelectedStatus(status)}
            >
              <Text style={[styles.navigationButtonText, { color: selectedStatus === status ? '#fff' : 'black' }]}>
                {status.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.statusContainer}>
        <Text>Statut: {selectedStatus.title}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text>Ajouter une tâche</Text>
        </TouchableOpacity>

        {/* Afficher les tâches avec leurs statuts */}
        {tasksWithStatus.map((task, index) => (
          <View key={index} style={{ flexDirection: 'row' }}>
            <View style={{ backgroundColor: task.status.color, width: 10, height: 10, borderRadius: 5, marginRight: 5 }} />
            <Text>{task.title}</Text>
          </View>
        ))}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {legends.map((legend, index) => (
              <TouchableOpacity
                key={index}
                style={styles.checkboxContainer}
                onPress={() => {
                  if (selectedLegends.includes(legend)) {
                    setSelectedLegends(selectedLegends.filter(item => item !== legend));
                  } else {
                    setSelectedLegends([...selectedLegends, legend]);
                  }
                }}
              >
                {selectedLegends.includes(legend) ? (
                  <Circle cx="6" cy="6" r="5" fill={legend.color} />
                ) : (
                  <Rect x="1" y="1" width="10" height="10" fill={legend.color} />
                )}
                <Text style={styles.checkboxLabel}>{legend.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
              <Text style={styles.addButtonText}>Ajouter une tâche</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => navigation.navigate('Message')} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>(//bas de page//)Messagerie</Text>
      </TouchableOpacity>
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
    alignItems: 'center',
    paddingTop: 8,
    width: '100%',
    marginTop: 30,
    backgroundColor: '#fbe29c',
    borderRadius: 1,
  },
  textButton: {
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '-45%',
    backgroundColor: '#f0f0f0',
  },
  navigationButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  navigationButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusContainer: {
    height: "20%",
    width: "80%",
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    position: 'absolute',
    top: Dimensions.get('window').height * 0.6 + 10,
    marginTop: "-30%",
    padding: 10,
  },
  addTaskContainer: {
    width: '80%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  taskInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default ServiceProvidersScreen;














// import React, {useState} from 'react';
// import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import { Circle, Rect, Svg } from 'react-native-svg';

// const ServiceProvidersScreen = ({ navigation }) => {
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
//     const calendarHeight = height * 0.6; // Ajuster ici la hauteur du calendrier en pourcentage

//     const currentYear = new Date().getFullYear();
//     const currentMonth = new Date().getMonth() + 1;
//     const currentMonthKey = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`;

//     return (
//       <View style={{ height: calendarHeight }}>
//         <Calendar
//           markedDates={{ [currentMonthKey]: { selected: true } }}
//           theme={{
//             calendarBackground: 'white',
//             selectedDayBackgroundColor: 'green',
//             selectedDayTextColor: 'white',
//           }}
//         />
//       </View>
//     );
//   };

// const statusList = [
//   { title: 'Tous'},
//   { title: 'En cours'},
//   { title: 'A venir'},
//   { title: 'A planifier'},
// ];

// const [selectedStatus, setSelectedStatus] = useState(statusList[0]); // Initialise le statut par défaut à "Tous"

// return (
//   <SafeAreaView style={styles.container}>
//     {renderLegend()}
//     <View style={{ flex: 1, width: '100%' }}>
//       {renderCalendar()}
//       <View style={styles.navigationRow}>
//         {statusList.map((status, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[styles.navigationButton, { backgroundColor: selectedStatus === status ? 'gray' : '#fff' }]}
//             onPress={() => setSelectedStatus(status)}
//           >
//             <Text style={[styles.navigationButtonText, { color: selectedStatus === status ? '#fff' : 'black' }]}>
//               {status.title}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//     <View style={styles.statusContainer}>
//       <Text>Statut: {selectedStatus.title}</Text>
//     </View>
//     <TouchableOpacity onPress={() => navigation.navigate('Message')} style={styles.button} activeOpacity={0.8}>
//       <Text style={styles.textButton}>(//bas de page//)Messagerie</Text>
//     </TouchableOpacity>
//   </SafeAreaView>
// );
// };

// const styles = StyleSheet.create({
// container: {
//   flex: 1,
//   alignItems: 'center',
//   justifyContent: 'flex-start',
//   marginTop: Platform.OS === 'android' ? 37 : 0,
//   backgroundColor: '#DDD',
// },
// button: {
//   alignItems: 'center',
//   paddingTop: 8,
//   width: '100%',
//   marginTop: 30,
//   backgroundColor: '#fbe29c',
//   borderRadius: 1,
// },
// textButton: {
//   //fontFamily: 'Futura',
//   height: 30,
//   fontWeight: '600',
//   fontSize: 16,
// },
// navigationRow: {
//   flexDirection: 'row',
//   justifyContent: 'space-around',
//   alignItems: 'center',
//   marginTop: '-50%',
//   backgroundColor: '#f0f0f0',
// },
// navigationButton: {
//   paddingHorizontal: 20,
//   paddingVertical: 8,
//   borderRadius: 8,
//   backgroundColor: '#fff',
//   borderWidth: 1,
//   borderColor: '#ccc',
// },
// navigationButtonText: {
//   fontSize: 16,
//   fontWeight: 'bold',
// },
// statusContainer: {
 
//   height: "20%",
//   width: "80%",
//   backgroundColor: 'white',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   borderRadius: 10,
//   borderColor: 'black',
//   borderWidth: 1,
//   position: 'absolute',
//   top: Dimensions.get('window').height * 0.6 + 10, // Ajuster la valeur du 'top' en fonction du calendrier et du margin souhaité
//   // Ajuster la valeur du 'right' pour définir la position horizontale
//   marginTop: "-30%", 
// },
// });


// export default ServiceProvidersScreen;






