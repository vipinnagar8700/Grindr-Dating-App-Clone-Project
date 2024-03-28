import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Import the Go Back icon from Expo icons
import Colors from "../HelperComponents/Colors";

const BirthdayScreen = ({navigation}) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleDayChange = (text) => {
    // Validate day input (1-31)
    if (
      (text === "" || /^\d{0,2}$/.test(text)) &&
      (text === "" || parseInt(text) <= 31)
    ) {
      setDay(text);
    }
  };

  const handleMonthChange = (text) => {
    // Validate month input (1-12)
    if (
      (text === "" || /^\d{0,2}$/.test(text)) &&
      (text === "" || parseInt(text) <= 12)
    ) {
      setMonth(text);
    }
  };

  const handleYearChange = (text) => {
    // Calculate the minimum allowed year (18 years before today)
    const currentYear = new Date().getFullYear();
    const minAllowedYear = currentYear - 18;

    // Validate year input (4 digits) and less than or equal to the minimum allowed year
    if (
      /^\d{0,4}$/.test(text) &&
      (text === "" || parseInt(text) <= minAllowedYear)
    ) {
      setYear(text);
    } else {
      // Display an error message if the year is not valid
      console.log(text);
      // Alert.alert('Invalid Year', 'You must be at least 18 years old.');
    }
  };

  const handleSubmit = () => {
    if (day && month && year) {
      // All inputs are filled, proceed with further action
      Alert.alert("Success", "Date submitted successfully!");
      const selectedDate = `${day}/${month}/${year}`;
      // Pass the selected date back to the SignUp screen
      navigation.navigate("SignUp", { selectedDate: selectedDate });
    } else {
      // Not all inputs are filled, show error message
      Alert.alert("Error", "Please fill in all fields!");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Centered Go Back Icon */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Your Birthday Heading */}
      <Text style={styles.heading}>Your Birthday</Text>
      <Text style={styles.headingPag}>Only your age is visible to others</Text>

      {/* Date, Month, Year Inputs */}
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { width: "auto" }]}
          placeholder="DD"
          placeholderTextColor="gray"
          keyboardType="numeric"
          onChangeText={handleDayChange}
          value={day}
        />
        <TextInput
          style={[styles.input, { width: "auto" }]}
          placeholder="MM"
          placeholderTextColor="gray"
          keyboardType="numeric"
          onChangeText={handleMonthChange}
          value={month}
        />
        <TextInput
          style={[styles.input, { width: "auto" }]}
          placeholder="YYYY"
          placeholderTextColor="gray"
          keyboardType="numeric"
          onChangeText={handleYearChange}
          value={year}
        />
      </View>
      <Text style={styles.headingPag}>Only your age is visible to others</Text>
      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BirthdayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "start",
  },
  heading: {
    marginTop: 100,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  headingPag: {
    fontSize: 15,
    fontWeight: "300",
    marginBottom: 20,
    color: "#fff",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: "gray",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 30,
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.YELLOW,
    padding: 15,
    position: "absolute",
    borderRadius: 10,
    bottom: 0,
    width: "100%",
    margin: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
