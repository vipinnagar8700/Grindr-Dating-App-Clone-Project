import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
  Modal,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { UpdateUserDataComplete, UserDetailsApi } from "../../Api/Api";
import Colors from "../HelperComponents/Colors";
import * as ImagePicker from "expo-image-picker";

const CompleteProfile = ({ navigation }) => {
  const [displayName, setDisplayName] = useState("");
  const [showAge, setShowAge] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [userId, setUserId] = useState(null);
  const [userIdMain, setUserIdMain] = useState(null);
  const [userDetails, setUserDetails] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [count,setCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch token and user details
        const userId = await AsyncStorage.getItem("userId");
        setUserId(userId);
        const userIdMain = await AsyncStorage.getItem("userIdMain");
        setUserIdMain(userIdMain)
        if (userId) {
          // Fetch user details using the token
          const userDetailsResponse = await UserDetailsApi(userId);
          if (userDetailsResponse.success) {
            setUserDetails(userDetailsResponse.data);
            setDisplayName(userDetailsResponse.data.display_name); // Update displayName state
            setSelectedGender(userDetailsResponse.data.gender); // Update selectedGender state
            setProfileImage(userDetailsResponse.data.profile_image); // Update profileImage state
          }
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [count]);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setModalVisible(false);
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
  });
    console.log("Image Picker Result:", result);
  
    
  
    if (result.cancelled) {
      console.log("Image selection cancelled.");
      return;
    }
    if (!result.cancelled) {
      setProfileImage(result.assets[0].uri);
    }
    
  };
  
  
  const UpdateUserData = async()=>{
    try {
     const data = await UpdateUserDataComplete(userId,userIdMain,profileImage,displayName,selectedGender);
     if(data.success){
      console.log(data,"Data Successfully Updated!")
      setCount(count + 1)
      navigation.navigate("HomeScreen");
      setDisplayName("")
      setShowAge(false)
      setSelectedGender("")
      setProfileImage(null)
     }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Complete Profile</Text>
        </View>
        <ScrollView>

        <View style={styles.headera}>
          <Text style={styles.headerTexta}>First Things First </Text>
          <Text style={styles.headerTextaa}>
            Users with a photo and profile info get more messages{" "}
          </Text>
        </View>

        <TouchableOpacity onPress={pickImage} style={{justifyContent:"center",alignItems:'center',marginTop:10}}>

          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text>Add Profile Image</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.tabContent}>
          <Text style={styles.label}>Display Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your display name"
            value={displayName}
            placeholderTextColor="gray"
            onChangeText={setDisplayName}
          />
          <View style={styles.switchContainer}>
            <Text style={styles.label}>Show Age</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={showAge ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setShowAge(!showAge)}
              value={showAge}
            />
          </View>
          <TouchableOpacity
            style={styles.switchContainer}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.label}>Gender</Text>
            <Text style={{ color: "#999" }}>
              {selectedGender || userDetails?.gender || "No Response"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={UpdateUserData}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

      {/* Gender Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <AntDesign name="close" size={24} color={Colors.BLACK} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleGenderSelect("Male")}
            >
              <Text style={styles.modalButtonText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleGenderSelect("Female")}
            >
              <Text style={styles.modalButtonText}>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleGenderSelect("Other")}
            >
              <Text style={styles.modalButtonText}>Other</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CompleteProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.BACKGROUND,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "appfont-medium",
  },
  headera: {
    alignItems: "start",
    fontFamily: "appfont-medium",
  },
  headerText: {
    fontSize: 18,
    marginLeft: 10,
    color: Colors.BLACK,
    fontFamily: "appfont-medium",
  },
  headerTexta: {
    fontSize: 15,
    marginLeft: 10,
    color: Colors.BLACK,
    margin: 5,
    fontFamily: "appfont-medium",
  },
  headerTextaa: {
    fontSize: 15,
    marginLeft: 10,
    color: Colors.BLACK,
    fontFamily: "appfont-light",
  },
  tabContent: {
    flex: 1,
    alignItems: "start",
    backgroundColor: Colors.BACKGROUND,
    paddingTop: 30,
  },
  label: {
    color: Colors.BLACK,
    marginBottom: 5,
    fontFamily: "appfont-medium",
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
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  saveButton: {
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
    backgroundColor: Colors.PRIMARY,
  },
  saveButtonText: {
    color: Colors.BLACK,
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  closeModalButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalButton: {
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 18,
    color: "#000",
  },
  selectedImage: {
    width: 130,
    height: 130,
    borderRadius: 10,
  },
  imagePlaceholder: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: Colors.BLACK,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage:{
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: Colors.BLACK,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

