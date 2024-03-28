import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Feather } from "@expo/vector-icons";
import Colors from "../HelperComponents/Colors";

const Tab = createMaterialTopTabNavigator();

const EmailLoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <View style={styles.tabContent}>
      <Text
        style={{
          color: Colors.BLACK,
          fontSize: 14,
          padding: 0,
          margin: 0,
          width: "100%",
        }}
      >
        Enter your Grindr email linked to your account.
      </Text>
      <View style={{ paddingTop: 20, width: "100%" }}>
        <TextInput
          style={[styles.input]}
          placeholder="Email"
          placeholderTextColor="#999"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />
      </View>

      <View
        style={{
          alignItems: "center",
          borderColor: Colors.BLACK,
          borderWidth: 1,
          marginVertical: 20,
          width: "100%",
          padding: 12,
        }}
      >
        <Text
          style={{
            color: Colors.BLACK,
            fontSize: 20,
            fontFamily: "appfont-medium",
          }}
        >
          NEXT
        </Text>
      </View>
    </View>
  );
};

const MobileLoginScreen = () => {
  // Sample data of countries with their country codes
  const countriesData = [
    { name: "United States", code: "+1" },
    { name: "India", code: "+91" },
    // Add more countries as needed
  ];

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+1"); // Default country code
  const [modalVisible, setModalVisible] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setCountryCode(item.code);
        setModalVisible(false);
      }}
    >
      <View style={styles.countryItem}>
        <Text style={styles.countryName}>{item.name}</Text>
        <Text style={styles.countryCode}>{item.code}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.tabContent}>
      <Text
        style={{
          color: Colors.BLACK,
          fontSize: 14,
          padding: 0,
          margin: 0,
          width: "100%",
        }}
      >
        Enter your Grindr email linked to your account.
      </Text>
      <View style={{ paddingTop: 20, width: "100%" }}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.countryCodeContainer}>
              <Text style={styles.selectedCountryCode}>{countryCode}</Text>
              <Feather name="chevron-down" size={24} color="#999" />
            </View>
          </TouchableOpacity>
          <TextInput
            style={styles.inputa}
            placeholder="Phone Number"
            placeholderTextColor="#999"
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            keyboardType="phone-pad"
          />
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          borderColor: Colors.BLACK,
          borderWidth: 1,
          marginVertical: 20,
          width: "100%",
          padding: 12,
        }}
      >
        <Text style={{ color: Colors.BLACK, fontSize: 20 }}>NEXT</Text>
      </View>

      {/* Modal for country code selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={countriesData}
              renderItem={renderItem}
              keyExtractor={(item) => item.code}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ForgotPassword = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.signupText}>Forgot Password</Text>
      </View>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Find Your Account</Text>
      </View>

      <Tab.Navigator
        tabBarOptions={{
          style: { backgroundColor: Colors.BACKGROUND, marginTop: 14 },
          labelStyle: { color: Colors.BLACK },
          indicatorStyle: { backgroundColor: Colors.BLACK },
        }}
      >
        <Tab.Screen name="Email" component={EmailLoginScreen} />
        <Tab.Screen name="Phone" component={MobileLoginScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  countryCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
    padding: 13,
  },
  modalContent: {
    backgroundColor: Colors.BLACK,
    borderRadius: 10,
    padding: 20,
    maxHeight: "80%",
    width: "80%",
  },
  countryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  countryName: {
    fontSize: 16,
  },
  countryCode: {
    color: "#999",
  },
  containerText: {
    flexDirection: "row",
    padding: 20,
    fontFamily: "appfont-medium",
  },
  signupText: {
    color: Colors.BLACK,
    fontSize: 20,
    fontFamily: "appfont-medium",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    fontFamily: "appfont-medium",
  },
  logo: {
    color: Colors.BLACK,
    fontSize: 20,
  },
  tabContent: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.BACKGROUND,
    paddingTop: 30,
    paddingHorizontal: 20,
    fontFamily: "appfont-medium",
  },
  tabText: {
    color: Colors.BLACK,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#333",
    color: Colors.BLACK,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  inputa: {
    width: "77%",
    height: 50,
    backgroundColor: "#333",
    color: Colors.BLACK,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#333",
    borderRadius: 10,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    color: Colors.BLACK,
    paddingHorizontal: 20,
  },
  eyeIconContainer: {
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  countryCodePicker: {
    width: 100,
    height: 50,
    backgroundColor: "#333",
    color: Colors.BLACK,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
});
