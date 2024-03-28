import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Button,
} from "react-native";
import Colors from "../HelperComponents/Colors";

const AboutApp = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);

  const handleAccept = () => {
    setShowModal(false);
    // Redirect to privacy policy page
    navigation.navigate('Privacy_Policy');
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>About App</Text>
      <ScrollView>
        <View style={{marginVertical:20}}>
          <Text style={{ color:Colors.BLACK,fontFamily:'appfont-light',fontSize:14 }}>
          Welcome to Single and Curious, where curiosity meets! {'\n\n'}

At single and curious, we understand that being single doesn't mean you're alone—it means you're open to new possibilities and ready to explore the world of dating with curiosity and enthusiasm.{'\n\n'}

Our platform is designed for curious singles who are eager to embark on meaningful connections and discover what the dating scene has to offer. Whether you're new to dating or a seasoned explorer, Single and Curious provides a safe and inclusive space where you can meet like-minded individuals who share your spirit of adventure.{'\n\n'}

With our user-friendly interface and advanced matching algorithms, finding your next adventure—or perhaps even your soulmate—is easier than ever. Whether you're into deep conversations about life's mysteries, exploring local hotspots, or trying out new activities together, you'll find plenty of opportunities to connect with others who are just as curious as you are.{'\n\n'}

So why wait? Join Single and Curious today and start your journey towards love, connection, and endless exploration. Who knows what exciting discoveries await you just around the corner?{'\n\n'}

Let your curiosity guide you, and let's create unforgettable experiences together. Welcome to the Single and Curious community—where curiosity leads to connection!{'\n\n'}
          </Text>
        </View>
      </ScrollView>
   
    </View>
  );
};

export default AboutApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor:Colors.BACKGROUND,
  },
  header: {
    fontSize: 20,
   fontFamily:'appfont-medium',
    marginBottom: 20,
    color:Colors.BLACK,
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.YELLOW,
    padding: 15,
    borderRadius: 10,
    bottom: 0,
    margin:20,
    width: "100%",
    position:'absolute'
  },
  buttonText: {
    fontSize: 18,
    fontFamily:'appfont-medium',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  
  modalContent: {
    backgroundColor:Colors.BLACK,
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 0,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
