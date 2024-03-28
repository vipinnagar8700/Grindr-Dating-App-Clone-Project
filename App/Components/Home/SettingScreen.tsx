import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Import AntDesign icon from Expo vector icons
import Colors from "../HelperComponents/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogoutUser, UpdateUserData, UserDetailsApi } from "../../Api/Api";

const SettingScreen = ({ navigation }) => {
  const [userData,setUserData]= useState(null)
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      // Check if user ID and token exist in AsyncStorage
      const userId = await AsyncStorage.getItem("userId");
      console.log(userId);
      if (userId) {
        // Check if userId exists
        try {
          const data = await UserDetailsApi(userId); // Wait for the promise to resolve
          setUserData(data?.data)
          // Proceed with data processing
        } catch (error) {
          console.log("Error fetching user data:", error);
        }
      } else {
        console.log("User not logged in!");
      }
    };

    // Call the function to check user login status
    checkUserLoggedIn();
  }, []);


  // Function to handle logout
 // Function to handle logout
const handleLogout = async () => {
  try {
    // await AsyncStorage.removeItem("userId");
    const userId = await AsyncStorage.getItem("userId"); // Get userId from AsyncStorage
    if (userId) {
      // If userId exists, call the LogoutUser function
      const logoutResult = await LogoutUser(userId);
      
      if (logoutResult.success) {
        // If logout is successful, clear userId from AsyncStorage and navigate to login screen
        await AsyncStorage.removeItem("userId");
        navigation.reset({
          index: 0,
          routes: [{ name: "SignIn" }],
        });
      } else {
        // If logout is not successful, display the error message
        console.log("Error logging out:", logoutResult.message);
        Alert.alert("Error", logoutResult.message);
      }
    } else {
      console.log("User not logged in!");
    }
  } catch (error) {
    console.log("Error logging out:", error);
    // Handle error accordingly
    Alert.alert("Error", "An unexpected error occurred.");
  }
};

const AboutAppNav = ()=>{
  navigation.navigate('About_app')
}


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Account</Text>

          <Text style={styles.item}>Upgrade</Text>
          <Text style={styles.item}>User ID: {userData?.id} </Text>
          <Text style={styles.item}>Deactivate</Text>
          <Text style={styles.item}>Restore Purchase</Text>

          
          <Text style={styles.item}>Unblock Users</Text>
<TouchableOpacity onPress={AboutAppNav}>
<Text style={styles.item}>About App</Text>
</TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.BACKGROUND,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: "#fff", // Title text color
  },
  contentContainer: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    color: Colors.BLACK,
    fontFamily: "appfont-medium",
    fontSize: 15,
    marginBottom: 10,marginTop:10
  },
  item: {
    color: Colors.WHITE,
    fontFamily: "appfont-medium",
    fontSize: 16,
    paddingVertical: 15,borderColor:Colors.BLACK,borderBottomWidth:1
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: Colors.YELLOW,
    backgroundColor: Colors.YELLOW,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    borderRadius: 20,
    position:'absolute',
    bottom:30,width:'89%'
  },
  logoutButtonText: {
    fontFamily: "appfont-medium",
    fontSize: 20,
  },
};

export default SettingScreen;
