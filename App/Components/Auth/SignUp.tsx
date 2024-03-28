import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,Modal,FlatList
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Checkbox from "../HelperComponents/Chechbox";
import Colors from "../HelperComponents/Colors";
import { RegisterApi } from "../../Api/Api";

const SignUp = ({ navigation, route }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [registerStatus,setregisterStatus]= useState("")
  const [countryCode, setCountryCode] = useState("+1"); // Default country code
// Sample data of countries with their country codes
const countriesData = [
  { name: "Afghanistan", code: "+93" },
{ name: "Albania", code: "+355" },
{ name: "Algeria", code: "+213" },
{ name: "Andorra", code: "+376" },
{ name: "Angola", code: "+244" },
{ name: "Antigua and Barbuda", code: "+1-268" },
{ name: "Argentina", code: "+54" },
{ name: "Armenia", code: "+374" },
{ name: "Australia", code: "+61" },
{ name: "Austria", code: "+43" },
{ name: "Azerbaijan", code: "+994" },
{ name: "Bahamas", code: "+1-242" },
{ name: "Bahrain", code: "+973" },
{ name: "Bangladesh", code: "+880" },
{ name: "Barbados", code: "+1-246" },
{ name: "Belarus", code: "+375" },
{ name: "Belgium", code: "+32" },
{ name: "Belize", code: "+501" },
{ name: "Benin", code: "+229" },
{ name: "Bhutan", code: "+975" },
{ name: "Bolivia", code: "+591" },
{ name: "Bosnia and Herzegovina", code: "+387" },
{ name: "Botswana", code: "+267" },
{ name: "Brazil", code: "+55" },
{ name: "Brunei", code: "+673" },
{ name: "Bulgaria", code: "+359" },
{ name: "Burkina Faso", code: "+226" },
{ name: "Burundi", code: "+257" },
{ name: "Cabo Verde", code: "+238" },
{ name: "Cambodia", code: "+855" },
{ name: "Cameroon", code: "+237" },
{ name: "Canada", code: "+1" },
{ name: "Central African Republic", code: "+236" },
{ name: "Chad", code: "+235" },
{ name: "Chile", code: "+56" },
{ name: "China", code: "+86" },
{ name: "Colombia", code: "+57" },
{ name: "Comoros", code: "+269" },
{ name: "Congo (Congo-Brazzaville)", code: "+242" },
{ name: "Costa Rica", code: "+506" },
{ name: "Croatia", code: "+385" },
{ name: "Cuba", code: "+53" },
{ name: "Cyprus", code: "+357" },
{ name: "Czech Republic", code: "+420" },
{ name: "Democratic Republic of the Congo", code: "+243" },
{ name: "Denmark", code: "+45" },
{ name: "Djibouti", code: "+253" },
{ name: "Dominica", code: "+1-767" },
{ name: "Dominican Republic", code: "+1-809, +1-829, +1-849" },
{ name: "East Timor (Timor-Leste)", code: "+670" },
{ name: "Ecuador", code: "+593" },
{ name: "Egypt", code: "+20" },
{ name: "El Salvador", code: "+503" },
{ name: "Equatorial Guinea", code: "+240" },
{ name: "Eritrea", code: "+291" },
{ name: "Estonia", code: "+372" },
{ name: "Eswatini (fmr. Swaziland)", code: "+268" },
{ name: "Ethiopia", code: "+251" },
{ name: "Fiji", code: "+679" },
{ name: "Finland", code: "+358" },
{ name: "France", code: "+33" },
{ name: "Gabon", code: "+241" },
{ name: "Gambia", code: "+220" },
{ name: "Georgia", code: "+995" },
{ name: "Germany", code: "+49" },
{ name: "Ghana", code: "+233" },
{ name: "Greece", code: "+30" },
{ name: "Grenada", code: "+1-473" },
{ name: "Guatemala", code: "+502" },
{ name: "Guinea", code: "+224" },
{ name: "Guinea-Bissau", code: "+245" },
{ name: "Guyana", code: "+592" },
{ name: "Haiti", code: "+509" },
{ name: "Honduras", code: "+504" },
{ name: "Hungary", code: "+36" },
{ name: "Iceland", code: "+354" },
{ name: "India", code: "+91" },
{ name: "Indonesia", code: "+62" },
{ name: "Iran", code: "+98" },
{ name: "Iraq", code: "+964" },
{ name: "Ireland", code: "+353" },
{ name: "Israel", code: "+972" },
{ name: "Italy", code: "+39" },
{ name: "Jamaica", code: "+1-876" },
{ name: "Japan", code: "+81" },
{ name: "Jordan", code: "+962" },
{ name: "Kazakhstan", code: "+7" },
{ name: "Kenya", code: "+254" },
{ name: "Kiribati", code: "+686" },
{ name: "Kosovo", code: "+383" },
{ name: "Kuwait", code: "+965" },
{ name: "Kyrgyzstan", code: "+996" },
{ name: "Laos", code: "+856" },
{ name: "Latvia", code: "+371" },
{ name: "Lebanon", code: "+961" },
{ name: "Lesotho", code: "+266" },
{ name: "Liberia", code: "+231" },
{ name: "Libya", code: "+218" },
{ name: "Liechtenstein", code: "+423" },
{ name: "Lithuania", code: "+370" },
{ name: "Luxembourg", code: "+352" },
{ name: "Madagascar", code: "+261" },
{ name: "Malawi", code: "+265" },
{ name: "Malaysia", code: "+60" },
{ name: "Maldives", code: "+960" },
{ name: "Mali", code: "+223" },
{ name: "Malta", code: "+356" },
{ name: "Marshall Islands", code: "+692" },
{ name: "Mauritania", code: "+222" },
{ name: "Mauritius", code: "+230" },
{ name: "Mexico", code: "+52" },
{ name: "Micronesia", code: "+691" },
{ name: "Moldova", code: "+373" },
{ name: "Monaco", code: "+377" },
{ name: "Mongolia", code: "+976" },
{ name: "Montenegro", code: "+382" },
{ name: "Morocco", code: "+212" },
{ name: "Mozambique", code: "+258" },
{ name: "Myanmar (Burma)", code: "+95" },
{ name: "Namibia", code: "+264" },
{ name: "Nauru", code: "+674" },
{ name: "Nepal", code: "+977" },
{ name: "Netherlands", code: "+31" },
{ name: "New Zealand", code: "+64" },
{ name: "Nicaragua", code: "+505" },
{ name: "Niger", code: "+227" },
{ name: "Nigeria", code: "+234" },
{ name: "North Korea", code: "+850" },
{ name: "North Macedonia (Macedonia)", code: "+389" },
{ name: "Norway", code: "+47" },
{ name: "Oman", code: "+968" },
{ name: "Pakistan", code: "+92" },
{ name: "Palau", code: "+680" },
{ name: "Palestine", code: "+970" },
{ name: "Panama", code: "+507" },
{ name: "Papua New Guinea", code: "+675" },
{ name: "Paraguay", code: "+595" },
{ name: "Peru", code: "+51" },
{ name: "Philippines", code: "+63" },
{ name: "Poland", code: "+48" },
{ name: "Portugal", code: "+351" },
{ name: "Qatar", code: "+974" },
{ name: "Romania", code: "+40" },
{ name: "Russia", code: "+7" },
{ name: "Rwanda", code: "+250" },
{ name: "Saint Kitts and Nevis", code: "+1-869" },
{ name: "Saint Lucia", code: "+1-758" },
{ name: "Saint Vincent and the Grenadines", code: "+1-784" },
{ name: "Samoa", code: "+685" },
{ name: "San Marino", code: "+378" },
{ name: "Sao Tome and Principe", code: "+239" },
{ name: "Saudi Arabia", code: "+966" },
{ name: "Senegal", code: "+221" },
{ name: "Serbia", code: "+381" },
{ name: "Seychelles", code: "+248" },
{ name: "Sierra Leone", code: "+232" },
{ name: "Singapore", code: "+65" },
{ name: "Slovakia", code: "+421" },
{ name: "Slovenia", code: "+386" },
{ name: "Solomon Islands", code: "+677" },
{ name: "Somalia", code: "+252" },
{ name: "South Africa", code: "+27" },
{ name: "South Korea", code: "+82" },
{ name: "South Sudan", code: "+211" },
{ name: "Spain", code: "+34" },
{ name: "Sri Lanka", code: "+94" },
{ name: "Sudan", code: "+249" },
{ name: "Suriname", code: "+597" },
{ name: "Sweden", code: "+46" },
{ name: "Switzerland", code: "+41" },
{ name: "Syria", code: "+963" },
{ name: "Taiwan", code: "+886" },
{ name: "Tajikistan", code: "+992" },
{ name: "Tanzania", code: "+255" },
{ name: "Thailand", code: "+66" },
{ name: "Togo", code: "+228" },
{ name: "Tonga", code: "+676" },
{ name: "Trinidad and Tobago", code: "+1-868" },
{ name: "Tunisia", code: "+216" },
{ name: "Turkey", code: "+90" },
{ name: "Turkmenistan", code: "+993" },
{ name: "Tuvalu", code: "+688" },
{ name: "Uganda", code: "+256" },
{ name: "Ukraine", code: "+380" },
{ name: "United Arab Emirates", code: "+971" },
{ name: "United Kingdom", code: "+44" },
{ name: "United States", code: "+1" },
{ name: "Uruguay", code: "+598" },
{ name: "Uzbekistan", code: "+998" },
{ name: "Vanuatu", code: "+678" },
{ name: "Vatican City", code: "+379" },
{ name: "Venezuela", code: "+58" },
{ name: "Vietnam", code: "+84" },
{ name: "Yemen", code: "+967" },
{ name: "Zambia", code: "+260" },
{ name: "Zimbabwe", code: "+263" }
];

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

  useEffect(() => {
    if (route.params && route.params.selectedDate) {
      // Update the selected date state when it's passed from the BirthdayScreen
      setSelectedDate(route.params.selectedDate);
    }
  }, [route.params]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignUp = () => {
    let isValid = true;
    let emailError = "";
    let passwordError = "";
    let phoneError = "";
    let confirmPasswordError = "";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      emailError = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(email.trim())) {
      emailError = "Please enter a valid email address.";
      isValid = false;
    }

    // Password validation
    if (!password.trim()) {
      passwordError = "Password is required.";
      isValid = false;
    } else if (password.trim().length < 6) {
      passwordError = "Password must be at least 6 characters long.";
      isValid = false;
    }

    // Confirm Password validation
    if (password !== confirmPassword) {
      confirmPasswordError = "Passwords do not match.";
      isValid = false;
    }
    // Phone validation
  const phoneRegex = /^[0-9]{10}$/; // Assuming 10 digit phone number
  if (!phone.trim()) {
    phoneError = "Phone number is required.";
    isValid = false;
  } else if (!phoneRegex.test(phone.trim())) {
    phoneError = "Please enter a valid phone number.";
    isValid = false;
  }

 
    // Update state with error messages
    setEmailError(emailError);
    setPasswordError(passwordError);
    setConfirmPasswordError(confirmPasswordError);
    setPhoneError(phoneError);

    if (isValid) {
      const formattedPhoneNumber = countryCode + phone;
      // Perform sign-up API call if all fields are valid
      RegisterApi(email, password, selectedDate,formattedPhoneNumber)
        .then((response) => {
          console.log(response, "response")
          if (response.success) {
            // If the API call is successful, navigate to the CompleteProfile screen
            setregisterStatus(response.message)
            navigation.navigate("CompleteProfile");
    
            // Save the user's ID to local storage
            AsyncStorage.setItem('userId', response.token.toString());
            AsyncStorage.setItem('userIdMain', response.data.id.toString());
          } else {
            // If the API call is not successful, log the error message
            console.error("Sign-up failed:", response.message);
            setregisterStatus(response.message)
            // You can show an error message to the user if needed
          }
        })
        .catch((error) => {
          // Handle API call error
          console.error("Sign-up failed:", error);
          // You can show an error message to the user if needed
        });
    }
    
    
  };

  // Inside the SignUp component
  const handleBirthDaySelect = () => {
    navigation.navigate("BirthdayScreen", { onDateSelect: handleDateSelect });
  };

  const handleDateSelect = (date) => {
    // Handle selected date here
    console.log("Selected date:", date);
    // Update state or perform any other actions with the selected date
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color={Colors.BLACK} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Create Account</Text>
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tabContent}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            placeholderTextColor="gray"
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
           <View style={styles.row}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.countryCodeContainer}>
            <Text style={styles.selectedCountryCode}>{countryCode}</Text>
            <Feather name="chevron-down" size={24} color="#999" />
          </View>
        </TouchableOpacity>
          <TextInput
            style={styles.inputphone}
            placeholder="Phone"
            value={phone}
            placeholderTextColor="gray"
            onChangeText={setPhone}
            keyboardType="number-pad"
          />
          {phoneError ? (
            <Text style={styles.errorText}>{phoneError}</Text>
          ) : null}
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              value={password}
              placeholderTextColor="gray"
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.eyeIconContainer}
            >
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color={Colors.BLACK}
              />
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm Password"
              value={confirmPassword}
              placeholderTextColor="gray"
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              onPress={toggleConfirmPasswordVisibility}
              style={styles.eyeIconContainer}
            >
              <Feather
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={24}
                color={Colors.BLACK}
              />
            </TouchableOpacity>
          </View>
          {confirmPasswordError ? (
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
          ) : null}
          <TouchableOpacity
            style={{
              justifyContent: "start",
              alignItems: "start",
              marginTop: 20,
            }}
            onPress={handleBirthDaySelect}
          >
            <Text style={styles.inputaa}>Date of Birth</Text>
            <Text style={styles.inputa}>{selectedDate}</Text>
          </TouchableOpacity>
          <View style={styles.checkboxContainer}>
            <Checkbox isChecked={isChecked} onChange={setIsChecked} />
            <Text style={styles.checkboxLabel}>
              Send me occasional emails regarding my account, subscription, and
              special offers.
            </Text>
          </View>
          {registerStatus ? (
            <Text style={styles.errorText}>{registerStatus}</Text>
          ) : null}
          
          <TouchableOpacity style={styles.socialButton} onPress={handleSignUp}>
            <Text style={styles.socialButtonText}>Create Account</Text>
          </TouchableOpacity>
          {/* Continue with */}
          <Text style={styles.continueText}>Continue with</Text>
          {/* Facebook */}
          <View style={styles.socialButton}>
            <Entypo name="facebook-with-circle" size={28} color="#1A72EE" />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </View>
          {/* Google */}
          <View style={styles.socialButton}>
            <Image
              source={require("../../../assets/Google.jpg")}
              style={{ width: 30, height: 30 }}
            />
            <Text style={styles.socialButtonText}>Google</Text>
          </View>
          {/* Single & Curious disclaimer */}
          <Text style={styles.disclaimerText}>
            Single & Curious will NEVER post anything to your social channels
          </Text>
        </View>
      </ScrollView>
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

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.BACKGROUND,
  },
  header: {
    flexDirection: "row",
  },
  headerText: {
    fontSize: 20,
    marginLeft: 10,
    color: Colors.BLACK,
    fontFamily: "appfont-medium",
  },
  tabContent: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    paddingTop: 30,
  },
  eyeIconContainer: {
    paddingHorizontal: 10,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#333",
    color: Colors.BLACK,
    paddingHorizontal: 20,
    marginTop: 20,
    fontFamily: "appfont-medium",
    borderRadius: 10,
  },
  inputa: {
    width: "100%",
    color: Colors.BLACK,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 15,
    fontFamily: "appfont-medium",
  },
  inputaa: {
    width: "100%",
    color: Colors.BLACK,
    paddingHorizontal: 20,
    marginBottom: 10,
    fontFamily: "appfont-medium",
  },
  inputphone: {
    marginTop:15,
    width: "73%",
    height: 50,
    backgroundColor: "#333",
    color: Colors.BLACK,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    color: Colors.BLACK,
    paddingHorizontal: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    color: Colors.BLACK,
    fontSize: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "appfont-medium",
  },
  continueText: {
    color: Colors.BLACK,
    fontSize: 15,
    marginTop: 20,
  },
  socialButton: {
    marginTop: 20,
    alignItems: "center",
    borderColor: Colors.BLACK,
    borderWidth: 1,
    marginVertical: 10,
    width: "100%",
    padding: 8,
    borderRadius: 25,
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  socialButtonText: {
    color: Colors.BLACK,
    fontSize: 18,
    fontFamily: "appfont-medium",
  },
  disclaimerText: {
    alignItems: "center",
    borderColor: Colors.BLACK,
    padding: 5,
    color: Colors.BLACK,
    fontSize: 12,
    marginTop: 20,
    fontFamily: "appfont-light",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    textAlign: "left",
    fontFamily: "appfont-light",
    alignItems: "flex-start",
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
    color: Colors.WHITE,
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
    borderRadius: 10,
    padding: 13,
    marginTop:15
  },
 
  
  emailError: {
    color: 'red',
    fontSize: 10,
    alignItems:'flex-start',
    textAlign: 'left',fontFamily:'appfont-light'
  },
loginStatus:{
  color: 'red',
  fontSize: 12,
  alignItems:'flex-start',
  textAlign: 'center',marginTop:10,fontFamily:'appfont-light'
},
  containerText: {
    justifyContent: "flex-end", // Align content to the end vertically
    flexDirection: "row",
    padding: 20,
  },
  signupText: {
    color: Colors.BLACK,
    fontFamily:'appfont-medium',
    fontSize: 18,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  logo: {
    width: 220,
    height: 40,
  },
  
  tabText: {
    color: Colors.BLACK,
  },
  selectedCountryCode:{
    color: Colors.BLACK,
  },
  
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#333",
    marginTop:20,
    borderRadius: 10,
  },
  
  
});
