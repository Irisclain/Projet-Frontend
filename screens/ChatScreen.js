import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentRoute } from "../reducers/currentRoute";
import { updateCurrentAccommodation } from "../reducers/currentAccommodation";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import Pusher from "pusher-js/react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { Camera } from "expo-camera";
import * as ImagePicker from 'expo-image-picker';
const pusher = new Pusher("4c35491e793ed55ea5db", { cluster: "eu" });
const BACKEND_ADDRESS = "https://stay-backend.vercel.app";

export default function ChatScreen({ navigation, route }) {
  const { contactName } = route.params;
  const selectedContacts = contactName.map((contact) => contact).join(", ");

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);

  //console.log(contactName);

  useEffect(() => {
    dispatch(updateCurrentRoute("Chat"));
    dispatch(updateCurrentAccommodation({}));
  }, []);

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  console.log(messages);

  useEffect(() => {
    (() => {
      fetch(`${BACKEND_ADDRESS}/users/${user.username}`, { method: "PUT" });

      const subscription = pusher.subscribe("chat");
      subscription.bind("pusher:subscription_succeeded", () => {
        subscription.bind("message", handleReceiveMessage);
      });
    })();

    return () =>
      fetch(`${BACKEND_ADDRESS}/users/${user.username}`, { method: "DELETE" });
  }, []);

  const handleReceiveMessage = (data) => {
    console.log(data);
    setMessages((messages) => [...messages, data]);
  };

  //console.log(messageText)

  const handleSendMessage = () => {
    if (!messageText) {
      return;
    }
    const payload = {
      text: messageText,
      username: user.username,
      createdAt: new Date(),
      id: Math.floor(Math.random() * 100000),
    };

    fetch(`${BACKEND_ADDRESS}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La réponse du réseau n'était pas valide");
        }
        return response.json(); // Si votre backend renvoie une réponse JSON
      })
      .then((data) => {
        // Traiter la réponse en cas de succès, si nécessaire
        console.log("Message envoyé avec succès :", data);
        setMessageText("");
      })
      .catch((error) => {
        // Gérer les erreurs ici
        console.error("Erreur lors de l'envoi du message :", error);
      });

    setMessageText("");
  };
  const autoMessage = [
    {
      title: "Message ménage",
      messagetext:
        " Bonjour! je cherche une personne disponible pour faire le ménage dans mon appartement, qui est disponible ?",
    },
    {
      title: "Message électricité",
      messagetext:
        " Bonjour! je cherche une personne disponible pour une maintenance électrique dans mon appartement, quelqu'un à un créneau libre ?",
    },
    {
      title: "Message plomberie",
      messagetext:
        " Bonjour! je cherche quelqu'un de disponible pour une réparation en plomberie dans mon appartement, qui est disponible ?",
    },
  ];

  const [hasPermission, setHasPermission] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isCameraReady, setCameraReady] = useState(false);
  const camRef = useRef(null);

  const takePicture = async () => {
    if (camRef.current && isCameraReady) {
      let photo = await camRef.current.takePictureAsync();
      console.log("photo", photo);
    }
  };
  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync();
  
    if (!result.cancelled) {
      console.log(result.uri);
      // Faites quelque chose avec l'URI de l'image, par exemple, définissez l'état pour afficher l'image
    }
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient
        colors={["#CD43FD", "#FF7A00", "#FAB26F", "#FFE279"]}
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={styles.header}
      >
        <View style={styles.banner}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>To:</Text>
            <Text style={styles.contactsText}>{selectedContacts}</Text>
          </View>
        </View>
      </LinearGradient>

      <LinearGradient
        colors={["#CD43FD", "#FF7A00", "#FAB26F", "#FFE279"]}
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={styles.content}
      >
        <View style={styles.inset}>
          <ScrollView style={styles.scroller}>
            {messages.map((message, i) => (
              <View
                key={i}
                style={[
                  styles.messageWrapper,
                  {
                    ...(message.username === user.username
                      ? styles.messageSent
                      : styles.messageRecieved),
                  },
                ]}
              >
                <View
                  style={[
                    styles.message,
                    {
                      ...(message.username === user.username
                        ? styles.messageSentBg
                        : styles.messageRecievedBg),
                    },
                  ]}
                >
                  <Text style={styles.messageText}>{message.text}</Text>
                </View>
                <Text style={styles.timeText}>
                  {new Date(message.createdAt).getHours()}:
                  {String(new Date(message.createdAt).getMinutes()).padStart(
                    2,
                    "0"
                  )}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputContainer}>       
              <TouchableOpacity
                   onPress={openCamera}
                  style={styles.picturesButton}
                >
                  <FontAwesome name="image" color="grey" size={25} />
                </TouchableOpacity>
            <TouchableOpacity
              style={styles.picturesButton}
              onPress={() => setIsModalVisible(true)}
            >
              <FontAwesome name="plus" color="grey" size={24} />
            </TouchableOpacity>
            <Modal
              animationType="fade"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={() => {
                setIsModalVisible(false);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  {autoMessage.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setMessageText(item.messagetext);
                        setIsModalVisible(false);
                      }}
                    >
                      <Text style={styles.modalTitle}>{item.title}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </Modal>
            <TextInput
              placeholder="Message..."
              onChangeText={(value) => setMessageText(value)}
              value={messageText}
              style={styles.input}
              autoFocus
              multiline
            />
            <TouchableOpacity
              onPress={() => handleSendMessage()}
              style={styles.sendButton}
            >
              <FontAwesome name="send" color="#fae4b3" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  modalTitle: {
    paddingBottom: 10,
    paddingLeft: 30,
    fontSize: 18,
  },
  centeredView: {
    position: "absolute",
    bottom: 300,
    left: 20,
    right: 20,
  },
  modalView: {
    paddingVertical: 50,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },

    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 100,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 40,
    //marginTop: 25,
  },
  bannerbackground: {
    position: "absolute",
    top: -30,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "#000",
  },
  blackBanner: {
    marginTop: -20,
    width: "100%",
    height: 50,
    marginBottom: -20,
  },
  bannerImage: {
    position: "absolute",
    bottom: -5,
    right: 5,
    width: 180,
    height: 50,
  },
  header: {
    width: "90%",
    height: "15%",
    marginBottom: -10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
  },
  content: {
    width: "90%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  inset: {
    flex: 1,
    paddingTop: 10,
    position: "relative",
    marginBottom: 2,
    width: "99%",
    backgroundColor: "white",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  /*  banner: {
    width: '99%',
    height: '75%',
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    margin: 2,
  }, */
  banner: {
    width: "99%",
    height: "85%",
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 20,
    flexDirection: "row",
    justifyContent: "space-between", // Distribute elements horizontally
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    margin: 2,
  },
  /* greetingText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    justifiyContent: 'center',
    marginBottom: 5,
  }, */
  contactsText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    flexWrap: "wrap", // Allow text to wrap within the container
    flex: 1, // Allow the text to expand and take up available space
  },
  greetingContainer: {
    flexDirection: "row", // Arrange elements horizontally
    alignItems: "center", // Align elements vertically within the container
  },
  greetingText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 5, // Add spacing between "To:" and contact names
  },
  message: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 24,
    alignItems: "flex-end",
    justifyContent: "center",
    maxWidth: "65%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 1.2,
  },
  messageWrapper: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  messageRecieved: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
  messageSent: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  messageSentBg: {
    backgroundColor: "#fae4b3",
  },
  messageRecievedBg: {
    backgroundColor: "#d6fff9",
  },
  messageText: {
    color: "#506568",
    fontWeight: "400",
  },
  timeText: {
    color: "#506568",
    opacity: 0.5,
    fontSize: 10,
    marginTop: 2,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    justifySelf: "flex-end",
    alignContent: "flex-start",
    marginBottom: 30,
    marginTop: "auto",
    backgroundColor: "transparent",
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    maxHeight: 300,
    backgroundColor: "#fae4b3",
    width: "60%",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: "#ffe09",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 1.2,
    //fontFamily: 'actor',
    fontSize: 18,
    opacity: 0.7,
  },
  messageButton: {
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  picturesButton: {
    padding: 16,
    marginRight: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButton: {
    padding: 16,
    marginLeft: -5,
    alignItems: "center",
    justifyContent: "center",
  },
  scroller: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});
