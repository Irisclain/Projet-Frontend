import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Pusher from 'pusher-js/react-native';
import FontAwesome from'react-native-vector-icons/FontAwesome';
import {LinearGradient} from 'expo-linear-gradient';

const pusher = new Pusher('4c35491e793ed55ea5db', { cluster: 'eu' });
const BACKEND_ADDRESS = 'https://stay-backend.vercel.app';

export default function ChatScreen({ navigation, route: { params } }) {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    (() => {
      fetch(`${BACKEND_ADDRESS}/users/${params.username}`, { method: 'PUT' });

      const subscription = pusher.subscribe('chat');
      subscription.bind('pusher:subscription_succeeded', () => {
        subscription.bind('message', handleReceiveMessage);
      });
    })();

    return () => fetch(`${BACKEND_ADDRESS}/users/${params.username}`, { method: 'DELETE' });
  }, [params.username]);

  const handleReceiveMessage = (data) => {
    console.log(data);
    setMessages(messages => [...messages, data]);
  };

  console.log(messages)

  const handleSendMessage = () => {
    if (!messageText) {
      return;
    }
    console.log(messages);
    const payload = {
      text: messageText,
      username: params.username,
      createdAt: new Date(),
      id: Math.floor(Math.random() * 100000),
    };

    fetch(`${BACKEND_ADDRESS}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setMessageText('');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          
      <LinearGradient
     colors={['#CD43FD', '#FF7A00', '#FAB26F', '#FFE279']}
     start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
     style={styles.header}
   >
      <View style={styles.banner}>
        <Text style={styles.greetingText}>To : {params.username}</Text>
      </View>
      </LinearGradient>

      <LinearGradient
     colors={['#CD43FD', '#FF7A00', '#FAB26F', '#FFE279']}
     start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
     style={styles.content}
   >
      <View style={styles.inset}>
        <ScrollView style={styles.scroller}>
          {
            messages.map((message, i) => (
              <View key={i} style={[styles.messageWrapper, { ...(message.username === params.username ? styles.messageSent : styles.messageRecieved) }]}>
                <View style={[styles.message, { ...(message.username === params.username ? styles.messageSentBg : styles.messageRecievedBg) }]}>
                  <Text style={styles.messageText}>{message.text}</Text>
                </View>
                <Text style={styles.timeText}>{new Date(message.createdAt).getHours()}:{String(new Date(message.createdAt).getMinutes()).padStart(2, '0')}</Text>
              </View>
            ))
          }
        </ScrollView>

        <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.picturesButton}>
            <FontAwesome name="image" color="grey" size={25} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.picturesButton}>
            <FontAwesome name="plus" color="grey" size={25} />
          </TouchableOpacity>
          <TextInput placeholder="Message..." onChangeText={(value) => setMessageText(value)} value={messageText} style={styles.input} autoFocus />
          <TouchableOpacity onPress={() => handleSendMessage()} style={styles.sendButton}>
            <FontAwesome name="send" color="#fae4b3" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 40,
    //marginTop: 25,
  },
  bannerbackground: {
    position: 'absolute',
    top: -30,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#000',
  },
  blackBanner:{
    marginTop: -20,
    width: '100%',
    height: 50,
    marginBottom: -20,
  },
  bannerImage:{
    position: 'absolute',
    bottom: -5,
    right: 5,
    width: 180,
    height: 50,
  },
  header: {
    width: '90%',
    height: '9%',
    marginBottom: -10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
  },
  content: {
    width: '90%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  inset: {
    flex: 1,
    paddingTop: 10,
    position: 'relative',
    marginBottom: 2,
    width: '99%',
    backgroundColor: 'white',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  banner: {
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
  },
  greetingText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    justifiyContent: 'center',
    marginBottom: 5,
  },
  message: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 24,
    alignItems: 'flex-end',
    justifyContent: 'center',
    maxWidth: '65%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 6.41,
    elevation: 1.2,
  },
  messageWrapper: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  messageRecieved: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start'
  },
  messageSent: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end'
  },
  messageSentBg: {
    backgroundColor: '#fae4b3',
  },
  messageRecievedBg: {
    backgroundColor: '#d6fff9'
  },
  messageText: {
    color: '#506568',
    fontWeight: '400',
  },
  timeText: {
    color: '#506568',
    opacity: 0.5,
    fontSize: 10,
    marginTop: 2,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    justifySelf: 'flex-end',
    alignContent: 'flex-start',
    marginBottom: 30,
    marginTop: 'auto',
    backgroundColor: 'transparent',
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    backgroundColor: '#fae4b3',
    width: '60%',
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
  },
  messageButton: {
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  picturesButton: {
    padding: 16,
    marginRight: -5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButton: {
    padding: 16,
    marginLeft: -5,
    alignItems: 'center',
    justifyContent: 'center',
  },
    scroller: {
      paddingLeft: 20,
      paddingRight: 20,
    },
});
