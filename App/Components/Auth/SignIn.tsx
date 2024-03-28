import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../HelperComponents/Colors";
import { LoginApi } from "../../Api/Api";
const Tab = createMaterialTopTabNavigator();

const EmailLoginScreen = () => {

  
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginStatus,setLoginStatus]= useState("");



 
  

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const ForgotPage = () => { 
    navigation.navigate("ForgotPassword");
  };

  const handleSignIn = async   () => {
    
    // Reset previous error messages
    setEmailError("");
    setPasswordError("");

    let isValid = true;
    // Email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Email is a required.");
      isValid = false;
    } else if (!emailRegex.test(email.trim())) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is a required.");
      isValid = false;
    }

    // Validate confirm password
   
    if (isValid) {
      const data = await  LoginApi(email, password);
      if (data) {
        try {
          if (data.success) {
            // Store user token in AsyncStorage
            await AsyncStorage.removeItem('userId');
            await AsyncStorage.setItem('userId', data?.token);
            console.log("Login Successfully.");
            setLoginStatus(data?.message || "Login Success!")
            navigation.navigate("HomeScreen");
          } else {
            console.log("Login failed:", data.message);
            setLoginStatus(data?.message || "Login Credentails Invalid!")
          }
        } catch (error) {
          console.error("Error occurred while storing token:", error);
          setLoginStatus(error || "Something went wrong please try again!")
        }
      }
    }
};


  return (
    <View style={styles.tabContent}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
       {emailError ? ( // Conditional rendering of error message
        <Text style={styles.emailError}>{emailError}</Text>
      ) : null}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#999"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={toggleShowPassword}
          style={styles.eyeIconContainer}
        >
          <Feather
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#999"
          />
        </TouchableOpacity>
      </View>

      {passwordError ? ( // Conditional rendering of error message
        <Text style={styles.emailError}>{passwordError}</Text>
      ) : null}
      {loginStatus ? ( // Conditional rendering of error message
        <Text style={styles.loginStatus}>{loginStatus}</Text>
      ) : null}
      
      <TouchableOpacity
        onPress={handleSignIn}
        style={{
          alignItems: "center",
          borderColor: Colors.BLACK,
          borderWidth: 1,
          marginVertical: 20,
          width: "100%",
          padding: 12,
          borderRadius: 25,
        }}
      >
        <Text style={{ color: Colors.BLACK, fontSize: 20 }}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={ForgotPage}>
        <View
          style={{
            alignItems: "center",
            borderColor: Colors.BLACK,
            padding: 5,
          }}
        >
          <Text style={{ color: Colors.BLACK, fontSize: 15 }}>
            Forgot password?
          </Text>
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={handleFacebookLogin}
        style={{
          alignItems: "center",
          borderColor: Colors.BLACK,
          borderWidth: 1,
          marginVertical: 20,
          width: "100%",
          padding: 8,
          borderRadius: 25,
          justifyContent: "center",
          flexDirection: "row",
          gap: 10,
        }}
      >
        <Entypo name="facebook-with-circle" size={28} color="#1A72EE" />
        <Text style={{ color: Colors.BLACK, fontSize: 20 }}>Facebook</Text>
      </TouchableOpacity>
      <View
        style={{
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
        }}
      >
        <Image
          source={require("../../../assets/Google.jpg")}
          style={{ width: 30, height: 30 }}
        />
        <Text style={{ color: Colors.BLACK, fontSize: 20 }}>Google</Text>
      </View> */}
      <View
      style={{ alignItems: "center", borderColor: Colors.BLACK, padding: 5, position: 'absolute',
      bottom: 10,left:20}}
      >
        <Text style={{ color: Colors.BLACK, fontSize: 12 }}>
          Single & Curious will NEVER post anything to your social channels
        </Text>
      </View>
    </View>
  );
};

const MobileLoginScreen = () => {
  const navigation = useNavigation();
  
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
 
  const [email, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+1"); // Default country code
  const [modalVisible, setModalVisible] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginStatus,setLoginStatus]= useState("");

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSignIN = async   () => {
    // Reset previous error messages
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    // Email validation using regular expression
    const phoneRegex = /^\d{10}$/; // This regex assumes a 10-digit phone number format
if (!email.trim()) {
  setEmailError("Phone number is required.");
  isValid = false;
} else if (!phoneRegex.test(email.trim())) {
  setEmailError("Please enter a valid 10-digit phone number.");
  isValid = false;
}


    // Validate password
    if (!password) {
      setPasswordError("Password is a required.");
      isValid = false;
    }

    // Validate confirm password
   
    if (isValid) {
      const phoneNumberWithCode = countryCode + email.trim();
      const data = await  LoginApi(phoneNumberWithCode, password);
      if (data) {
        try {
          if (data.success) {
            // Store user token in AsyncStorage
            await AsyncStorage.setItem('userToken', data.token);
            console.log("Login Successfully.");
            console.log(data)
            setLoginStatus(data?.message || "Login Success!")
            navigation.navigate("HomeScreen");
          } else {
            console.log("Login failed:", data.message);
            setLoginStatus(data?.message || "Login Credentails Invalid!")
          }
        } catch (error) {
          console.error("Error occurred while storing token:", error);
          setLoginStatus(error || "Something went wrong please try again!")
        }
      }
    }
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

  const ForgotPage = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <View style={styles.tabContent}>
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
          value={email}
          keyboardType="phone-pad"
        />
         
      </View>
      {emailError ? ( // Conditional rendering of error message
        <Text style={styles.emailError}>{emailError}</Text>
      ) : null}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#999"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={toggleShowPassword}
          style={styles.eyeIconContainer}
        >
          <Feather
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#999"
          />
        </TouchableOpacity>
      </View>
      {passwordError ? ( // Conditional rendering of error message
        <Text style={styles.emailError}>{passwordError}</Text>
      ) : null}
        {loginStatus ? ( // Conditional rendering of error message
        <Text style={styles.loginStatus}>{loginStatus}</Text>
      ) : null}
      <TouchableOpacity
        onPress={handleSignIN}
        style={{
          alignItems: "center",
          borderColor: Colors.BLACK,
          borderWidth: 1,
          marginVertical: 20,
          width: "100%",
          padding: 12,
          borderRadius: 25,
        }}
      >
        <Text style={{ color: Colors.BLACK, fontSize: 20 }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ForgotPage}>
        <View
          style={{
            alignItems: "center",
            borderColor: Colors.BLACK,
            padding: 5,
          }}
        >
          <Text style={{ color: Colors.BLACK, fontSize: 15 }}>
            Forgot password?
          </Text>
        </View>
      </TouchableOpacity>
      {/* <View
        style={{
          alignItems: "center",
          borderColor: Colors.BLACK,
          borderWidth: 1,
          marginVertical: 20,
          width: "100%",
          padding: 8,
          borderRadius: 25,
          justifyContent: "center",
          flexDirection: "row",
          gap: 10,
        }}
      >
        <Entypo name="facebook-with-circle" size={28} color="#1A72EE" />
        <Text style={{ color: Colors.BLACK, fontSize: 20 }}>Facebook</Text>
      </View>
      <View
        style={{
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
        }}
      >
        <Image
          source={require("../../../assets/Google.jpg")}
          style={{ width: 30, height: 30 }}
        />
        <Text style={{ color: Colors.BLACK, fontSize: 20 }}>Google</Text>
      </View> */}
      <View
        style={{ alignItems: "center", borderColor: Colors.BLACK, padding: 5, position: 'absolute',
        bottom: 10,left:20}}
      >
        <Text style={{ color: Colors.BLACK, fontSize: 12 }}>
          Single & Curious will NEVER post anything to your social channels
        </Text>
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

const SignIn = () => {
  const navigation = useNavigation();

  const SignUpPage = () => {
    navigation.navigate("Term_Condition");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <TouchableOpacity onPress={SignUpPage}>
          <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/Grinder.jpg")}
          style={styles.logo}
        />
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { color: Colors.BLACK },
          tabBarIndicatorStyle: { backgroundColor: Colors.BLACK },
          tabBarStyle: { backgroundColor: Colors.BACKGROUND, marginTop: 14 },
        }}
      >
        <Tab.Screen name="Email" component={EmailLoginScreen} />
        <Tab.Screen name="Phone" component={MobileLoginScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default SignIn;

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
    color: Colors.WHITE,
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
  tabContent: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: Colors.BACKGROUND,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  tabText: {
    color: Colors.BLACK,
  },
  selectedCountryCode:{
    color: Colors.BLACK,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#333",
    color: Colors.BLACK,
    paddingHorizontal: 20,
    marginBottom: 2,
    borderRadius: 10,
  },
  inputa: {
    width: "77%",
    height: 50,
    backgroundColor: "#333",
    color: Colors.BLACK,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#333",
    marginTop:20,
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
