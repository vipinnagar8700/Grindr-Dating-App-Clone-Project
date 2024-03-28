import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Modal,
  Pressable,ActivityIndicator, Image
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Import AntDesign icon from Expo vector icons
import Colors from "../HelperComponents/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UpdateUserData, UserDetailsApi } from "../../Api/Api";
import CircleCheckboxBody from "../HelperComponents/CircleCheckboxBody";
import { apiUrlImage } from "../../Api/ApiUrl";
import * as ImagePicker from 'expo-image-picker'; 



const EditProfileScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(UsersMe?.image || null);
  const [count, setCount] = useState(0);
  const [selectedBodyType, setSelectedBodyType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // Define state variables for modal visibility and selected values
  const [isModalVisible, setIsModalVisible] = useState(false);
  // Tribles
  const [selectedTribles, setSelectedTribles] = useState("");
  // Define state variables for modal visibility and selected values
  const [isModalVisibleTribles, setIsModalVisibleTribles] = useState(false);
console.log(imageUri,"imageUri")
  // Looking For 
  // Tribles
  const [selectedLooking, setSelectedLooking] = useState("");
  // Define state variables for modal visibility and selected values
  const [isModalVisibleLooking, setIsModalVisibleLooking] = useState(false);
  // Gender
  const [selectedGender, setSelectedGender] = useState("");
  // Define state variables for modal visibility and selected values
  const [isModalVisibleGender, setIsModalVisibleGender] = useState(false);
  const [UsersMe, setUsersMe] = useState({
    id: "",
    display_name: "",
    about_me: "",
    age: "",
    height: "",
    weight: "",
    ethnicity: "",
    body_type: "",
    tribes: "",
    looking_for: "",
    meet_at: "",
    gender: "",
    instagram: "",
    spotify: "",
    twitter: "",
    facebook: "",
    image:null
  });

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const [displayName, setDisplayName] = useState("");
  const handleBlur = () => setIsFocused(false);
  const handleDisplayNameChange = (text) => {
    // Limiting to 15 characters
    if (text.length <= 34) {
      setDisplayName(text);
    }
  };
  // Function to handle toggle checkbox selection
  const toggleCheckbox = (value) => {
    setSelectedBodyType(value); // Update the selected body type
  };
   // Function to handle toggle checkbox selection
   const toggleCheckboxTribles = (value) => {
    setSelectedTribles(value); // Update the selected body type
  };
   // Function to handle toggle checkbox selection
   const toggleCheckboxLooking = (value) => {
    setSelectedLooking(value); // Update the selected body type
  };

  // Gender

    const toggleCheckboxGender = (value) => {
      setSelectedGender(value); // Update the selected body type
    };
  const [About, setAbout] = useState("");
  const handleAboutChange = (text) => {
    // Limiting to 15 characters
    if (text.length <= 255) {
      setAbout(text);
    }
  };

  const handleInputChange = (name, value) => {
    setUsersMe((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      // Check if user ID and token exist in AsyncStorage
      const userId = await AsyncStorage.getItem("userId");
      console.log(userId);
      if (userId) {
        // Check if userId exists
        try {
          const data = await UserDetailsApi(userId); // Wait for the promise to resolve
          // Proceed with data processing
          setUsersMe(data?.data);
          setDisplayName(data?.data?.display_name || "");
          setAbout(data?.data?.about_me || "");
        } catch (error) {
          console.log("Error fetching user data:", error);
        } finally {
          setIsLoading(false); // Update loading state once fetching is done
        }
      } else {
        console.log("User not logged in!");
      }
    };

    // Call the function to check user login status
    checkUserLoggedIn();
  }, [count]);

  const handleUpdateProfile = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        const updatedData = await UpdateUserData(
          userId,
          UsersMe?.id,
          UsersMe,
          displayName,
          About,selectedBodyType,selectedGender,selectedLooking,selectedTribles,imageUri
        );
        if (updatedData.success) {
          console.log("User data updated:", updatedData);
          Alert.alert(
            "Success",
            updatedData?.message || "Profile updated successfully"
          );
          setCount(count + 1);
        } else {
          Alert.alert(
            "Error",
            updatedData?.message ||
              "Failed to update profile. Please try again later."
          );
          // Handle the case where user is not logged in
        }
        // Optionally navigate user to another screen after successful update
      } else {
        Alert.alert("Error", "User is not login ");
        // Handle the case where user is not logged in
      }
    } catch (error) {
      console.log("Error updating user data:", error);
      Alert.alert("Error", "Failed to update profile. Please try again later.");
      // Handle error accordingly
    }
  };

  // Function to handle modal visibility
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Gender
  // Function to handle modal visibility
  const toggleModalGender = () => {
    setIsModalVisibleGender(!isModalVisibleGender);
  };

  // Function to handle modal visibility
  const toggleModalTribles = () => {
    setIsModalVisibleTribles(!isModalVisibleTribles);
  };
   // Function to handle modal visibility
   const toggleModalLooking = () => {
    setIsModalVisibleLooking(!isModalVisibleLooking);
  };

  const options = [
    { id: 1, name: "No Response" },
    { id: 2, name: "Average" },
    { id: 3, name: "Large" },
    { id: 4, name: "Muscular" },
    { id: 5, name: "Slim" },
    { id: 6, name: "Stocky" },
    { id: 7, name: "Toned" },
  ];

  const optionsTribles = [
    { id: 1, name: "Bear" },
    { id: 2, name: "Clean-Cut" },
    { id: 3, name: "Daddy" },
    { id: 4, name: "Discreet" },
    { id: 5, name: "Geek" },
    { id: 6, name: "Jock" },
    { id: 7, name: "Leather" },
    { id: 8, name: "Otter" },
    { id: 9, name: "Poz" },
    { id: 10, name: "Rugged" },
    { id: 11, name: "Trans" },
    { id: 12, name: "Twinks" },
    { id: 13, name: "Sober" },
  ];

  const optionsLooking = [
    { id: 1, name: "Chat" },
    { id: 2, name: "Dates" },
    { id: 3, name: "Friends" },
    { id: 4, name: "Networking" },
    { id: 5, name: "Hookups" },
    { id: 6, name: "Relationship" },
    
  ];

  const optionsGender = [
    { id: 1, name: "Man" },
    { id: 2, name: "Cis Man" },
    { id: 3, name: "Trans Man" },
    { id: 4, name: "Woman" },
    { id: 5, name: "Cis Woman" },
    { id: 6, name: "Trans Woman"},
    { id: 7, name: "Agender"},
    { id: 8, name: "Agi" },
    { id: 9, name: "Androgynous"},
    { id: 10, name: "Aravani" },
    { id: 11, name: "Ask Me" },
    { id: 12, name: "Bading/Beki" },
    { id: 13, name: "Kinner" },
    { id: 14, name: "Third Gender" },
    { id: 15, name: "Transmasculine" },
    { id: 16, name: "X Gender"},
    { id: 17, name: "Hijra" },
    { id: 18, name: "Pangender" },
  ];

  const handleImageSelect = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setImageUri(result.assets[0].uri);
        // Here you can upload the selected image to your server or perform any other actions
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
      </View>
      {isLoading ? ( // Render loader if data is still loading
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.WHITE} />
        </View>
      ) : (
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ padding: 20 }}>
      <TouchableOpacity onPress={handleImageSelect}>
      {imageUri ? (
  <Image
    source={{ uri: imageUri }}
    style={{ width: '100%', height: 200 }}
  />
) : (
  UsersMe?.image ? (
    <Image
      source={{ uri: `${apiUrlImage}/${UsersMe?.image}` }}
      style={{ width: '100%', height: 200 }}
    />
  ) : (
    <Image
      source={require('../../../assets/Avatar.jpg')}
      style={{ width: '100%', height: 200 }}
    />
  )
)}

      </TouchableOpacity>
          <Text
            style={{
              color: Colors.BLACK,
              fontFamily: "appfont-medium",
              fontSize: 15,marginTop:20
            }}
          >
            Display Name
          </Text>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleDisplayNameChange}
            value={displayName}
            placeholder="No response"
            placeholderTextColor={Colors.BLACK}
            selectionColor={Colors.YELLOW}
            maxLength={34}
          />
          <Text style={styles.characterCount}>{displayName.length}/34</Text>
          <Text
            style={{
              color: Colors.BLACK,
              fontFamily: "appfont-medium",
              fontSize: 15,
              marginTop: 10,
            }}
          >
            About Me
          </Text>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleAboutChange}
            value={About}
            placeholder="No response"
            placeholderTextColor={Colors.BLACK}
            selectionColor={Colors.YELLOW}
            maxLength={255}
          />
          <Text style={styles.characterCount}>{About.length}/255</Text>
        </View>
        <View style={{ padding: 20, backgroundColor: Colors.BLACK }}>
          <Text
            style={{
              color: Colors.WHITE,
              fontFamily: "appfont-medium",
              fontSize: 15,
            }}
          >
            STATS
          </Text>
        </View>
        <View style={{ padding: 20 }}>
          <Text
            style={{
              color: Colors.BLACK,
              fontFamily: "appfont-medium",
              fontSize: 15,
            }}
          >
            Age (in Yrs)
          </Text>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={(text) => handleInputChange("age", text)}
            value={UsersMe?.age ? UsersMe.age.toString() : ""}
            placeholder="No response"
            placeholderTextColor={Colors.BLACK}
            selectionColor={Colors.YELLOW}
            keyboardType="phone-pad"
          />

          <Text
            style={{
              color: Colors.BLACK,
              fontFamily: "appfont-medium",
              fontSize: 15,
              marginTop: 10,
            }}
          >
            Height (in cm)
          </Text>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={(text) => handleInputChange("height", text)}
            value={UsersMe.height}
            placeholder="No response"
            placeholderTextColor={Colors.BLACK}
            selectionColor={Colors.YELLOW}
          />
        </View>
        <View style={{ padding: 20 }}>
          <Text
            style={{
              color: Colors.BLACK,
              fontFamily: "appfont-medium",
              fontSize: 15,
            }}
          >
            Weight (in Kg)
          </Text>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={(text) => handleInputChange("weight", text)}
            value={UsersMe.weight}
            placeholder="No response"
            placeholderTextColor={Colors.BLACK}
            selectionColor={Colors.YELLOW}
          />
        </View>
        <View style={{ padding: 20 }}>
          <Text
            style={{
              color: Colors.BLACK,
              fontFamily: "appfont-medium",
              fontSize: 15,
            }}
          >
            Body Type
          </Text>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            onFocus={() => {
              handleFocus();
              toggleModal(); // Open modal on focus
            }}
            onBlur={handleBlur}
            onChangeText={(text) => handleInputChange("body_type", text)}
            value={selectedBodyType || UsersMe?.body_type}
            placeholder="No response"
            placeholderTextColor={Colors.BLACK}
            selectionColor={Colors.YELLOW}
          />
        </View>
        <View style={{ padding: 20 }}>
          <Text
            style={{
              color: Colors.BLACK,
              fontFamily: "appfont-medium",
              fontSize: 15,
            }}
          >
            Tribles
          </Text>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            onFocus={() => {
              handleFocus();
              toggleModalTribles(); // Open modal on focus
            }}
            onChangeText={(text) => handleInputChange("tribes", text)}
            placeholder="No response"
            placeholderTextColor={Colors.BLACK}
            selectionColor={Colors.YELLOW}
            value={selectedTribles || UsersMe?.tribes}
          />
        </View>
        <View style={{ padding: 20, backgroundColor: Colors.BLACK }}>
          <Text
            style={{
              color: Colors.WHITE,
              fontFamily: "appfont-medium",
              fontSize: 15,
            }}
          >
            EXPECTATIONS
          </Text>
        </View>
        <View style={{ padding: 20 }}>
          <Text
            style={{
              color: Colors.BLACK,
              fontFamily: "appfont-medium",
              fontSize: 15,
            }}
          >
            Looking For
          </Text>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            onFocus={() => {
              handleFocus();
              toggleModalLooking(); // Open modal on focus
            }}
            onChangeText={(text) => handleInputChange("looking_for", text)}
            placeholder="No response"
            placeholderTextColor={Colors.BLACK}
            selectionColor={Colors.YELLOW}
            value={selectedLooking || UsersMe?.looking_for}
          />
        </View>
        <View style={{ padding: 20 }}>
          <Text
            style={{
              color: Colors.BLACK,
              fontFamily: "appfont-medium",
              fontSize: 15,
            }}
          >
            Gender
          </Text>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            onFocus={() => {
              handleFocus();
              toggleModalGender(); // Open modal on focus
            }}
            onChangeText={(text) => handleInputChange("gender", text)}
            placeholder="No response"
            placeholderTextColor={Colors.BLACK}
            selectionColor={Colors.YELLOW}
            value={selectedGender || UsersMe?.gender}
          />
        </View>
        <View style={{ padding: 20, backgroundColor: Colors.BLACK }}>
          <Text
            style={{
              color: Colors.WHITE,
              fontFamily: "appfont-medium",
              fontSize: 15,
            }}
          >
            SOCIAL
          </Text>
        </View>
        <View style={{ padding: 20 }}>
          <Text
            style={{
              color: Colors.BLACK,
              fontFamily: "appfont-medium",
              fontSize: 15,
            }}
          >
            Instagram
          </Text>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            onFocus={handleFocus}
            onChangeText={(text) => handleInputChange("instagram", text)}
            placeholder="No response"
            placeholderTextColor={Colors.BLACK}
            selectionColor={Colors.YELLOW}
            value={UsersMe?.instagram}
          />
          <Text
            style={{
              color: Colors.BLACK,
              fontFamily: "appfont-medium",
              fontSize: 15,
              marginTop: 10,
            }}
          >
            Spotify
          </Text>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            onFocus={handleFocus}
            onChangeText={(text) => handleInputChange("spotify", text)}
            placeholder="No response"
            placeholderTextColor={Colors.BLACK}
            selectionColor={Colors.YELLOW}
            value={UsersMe?.spotify}
          />

          <Text
            style={{
              color: Colors.BLACK,
              fontFamily: "appfont-medium",
              fontSize: 15,
              marginTop: 10,
            }}
          >
            Twitter
          </Text>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            onFocus={handleFocus}
            onChangeText={(text) => handleInputChange("twitter", text)}
            placeholder="No response"
            placeholderTextColor={Colors.BLACK}
            selectionColor={Colors.YELLOW}
            value={UsersMe?.twitter}
          />
          <Text
            style={{
              color: Colors.BLACK,
              fontFamily: "appfont-medium",
              fontSize: 15,
              marginTop: 10,
            }}
          >
            Facebook
          </Text>
          <TextInput
            style={[
              styles.input,
              isFocused && styles.inputFocused,
              {
                marginBottom: 100,
              },
            ]}
            onFocus={handleFocus}
            onChangeText={(text) => handleInputChange("facebook", text)}
            placeholder="No response"
            placeholderTextColor={Colors.BLACK}
            selectionColor={Colors.YELLOW}
            value={UsersMe?.facebook}
          />
        </View>
      </ScrollView>
      )}
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: Colors.YELLOW,
          backgroundColor: Colors.YELLOW,
          position: "absolute",
          padding: 8,
          justifyContent: "center",
          alignItems: "center",
          bottom: 20,
          left: 0,
          right: 0,
          margin: 20,
          borderRadius: 20,
        }}
        onPress={handleUpdateProfile}
      >
        <Text style={{ fontFamily: "appfont-medium", fontSize: 20 }}>Save</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView
              style={{ maxHeight: 300 }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {options.map((option) => (
                <View key={option.id} style={styles.checkboxContainer}>
                  <CircleCheckboxBody
                    isChecked={selectedBodyType === option.name}
                    onChange={() => toggleCheckbox(option.name)}
                  />
                  <Text style={styles.label}>{option.name}</Text>
                </View>
              ))}
            </ScrollView>
            <Pressable style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisibleTribles}
        onRequestClose={toggleModalTribles}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView
              style={{ maxHeight: 300 }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {optionsTribles.map((option) => (
                <View key={option.id} style={styles.checkboxContainer}>
                  <CircleCheckboxBody
                    isChecked={selectedTribles === option.name}
                    onChange={() => toggleCheckboxTribles(option.name)}
                  />
                  <Text style={styles.label}>{option.name}</Text>
                </View>
              ))}
            </ScrollView>
            <Pressable style={styles.closeButton} onPress={toggleModalTribles}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisibleLooking}
        onRequestClose={toggleModalLooking}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView
              style={{ maxHeight: 300 }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {optionsLooking.map((option) => (
                <View key={option.id} style={styles.checkboxContainer}>
                  <CircleCheckboxBody
                    isChecked={selectedLooking === option.name}
                    onChange={() => toggleCheckboxLooking(option.name)}
                  />
                  <Text style={styles.label}>{option.name}</Text>
                </View>
              ))}
            </ScrollView>
            <Pressable style={styles.closeButton} onPress={toggleModalLooking}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisibleGender}
        onRequestClose={toggleModalGender}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView
              style={{ maxHeight: 300 }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {optionsGender.map((option) => (
                <View key={option.id} style={styles.checkboxContainer}>
                  <CircleCheckboxBody
                    isChecked={selectedGender === option.name}
                    onChange={() => toggleCheckboxGender(option.name)}
                  />
                  <Text style={styles.label}>{option.name}</Text>
                </View>
              ))}
            </ScrollView>
            <Pressable style={styles.closeButton} onPress={toggleModalGender}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  label: {
    color: Colors.BLACK,
    fontFamily: "appfont-light",
    fontSize: 13,
  },
  input: {
    borderColor: Colors.BLACK,
    borderBottomWidth: 1,
    padding: 5,
    color: Colors.BLACK,
    marginBottom: 10,
  },
  inputFocused: {
    borderColor: Colors.YELLOW,
  },
  characterCount: {
    color: Colors.BLACK,
    fontSize: 12,
    alignSelf: "flex-end",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: 200,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
    fontSize: 18,
  },
  closeButton: {
    backgroundColor: Colors.YELLOW,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
    width: 100,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
};

export default EditProfileScreen;
