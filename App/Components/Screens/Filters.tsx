import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  ScrollView,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../HelperComponents/Colors";
import { RadioButton } from "react-native-paper";
import CircleCheckbox from "../HelperComponents/CircleCheckbox";
import Slider from "@react-native-community/slider";
import { filterUser } from "../../Api/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Filter = ({ navigation, isSwitchOn, onSwitchToggle }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [ageValue, setAgeValue] = useState(0); // Initial age value
  const [showTribesModal, setShowTribesModal] = useState(false);
  const [showBodyModal, setShowBodyModal] = useState(false);
  const [showLookModal, setshowLookModal] = useState(false);
  const [selectedTribes, setSelectedTribes] = useState([]);
  const [selectedBodyType, setSelectedBodyType] = useState([]);
  const [selectedLook, setSelectedLook] = useState([]);
  const [token, setToken] = useState(null);



  console.log(selectedOption, ageValue,  selectedTribes,selectedBodyType,selectedLook);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      // Check if user ID and token exist in AsyncStorage
      const userId = await AsyncStorage.getItem("userId");
      setToken(userId);
      
    };
    checkUserLoggedIn();
  }, []);
  const FilterUsersData = async () => {
    try {
      const data = await filterUser(token, selectedOption, ageValue,  selectedTribes,selectedBodyType,selectedLook);
      console.log("Search data:", data);
      // Process the filtered user data here
    } catch (error) {
      console.log("Error:", error);
    }
  }
  
  
  // Looking for
  const handleLookPress = () => {
    
    setshowLookModal(true);
  };

  const handleCloseLookModal = () => {
    setshowLookModal(false);
  };
 
  // Tribes
  const handleTribesPress = () => {
    
    setShowTribesModal(true);
  };

  const handleCloseTribesModal = () => {
    setShowTribesModal(false);
  };

  // Body Type

  const handleBodyTypePress = () => {
    
    setShowBodyModal(true);
  };

  const handleCloseBodyTypeModal = () => {
    setShowBodyModal(false);
  };

  

  // Function to handle tribe selection
  const handleTribeSelect = (tribe) => {
    // Check if the tribe is already selected
    if (selectedTribes.includes(tribe)) {
      // If selected, remove it from the selected tribes
      setSelectedTribes(selectedTribes.filter((item) => item !== tribe));
    } else {
      // If not selected, add it to the selected tribes
      setSelectedTribes([...selectedTribes, tribe]);
    }
  };


  // Function to save the selected tribes
 
  // Function to handle tribe selection
  const handleBodyTypeSelect = (tribe) => {
    // Check if the tribe is already selected
    if (selectedBodyType.includes(tribe)) {
      // If selected, remove it from the selected tribes
      setSelectedBodyType(selectedBodyType.filter((item) => item !== tribe));
    } else {
      // If not selected, add it to the selected tribes
      setSelectedBodyType([...selectedBodyType, tribe]);
    }
  };
  

   // Function to handle tribe selection
   const handleRelationLook = (tribe) => {
    // Check if the tribe is already selected
    if (selectedLook.includes(tribe)) {
      // If selected, remove it from the selected tribes
      setSelectedLook(selectedLook.filter((item) => item !== tribe));
    } else {
      // If not selected, add it to the selected tribes
      setSelectedLook([...selectedLook, tribe]);
    }
  };
  const onBackPress = () => {
    navigation.goBack(); // Navigate back
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.iconContainer}>
          <AntDesign name="arrowleft" size={24} color={Colors.WHITE} />
        </TouchableOpacity>
        <Text style={styles.title}>Filters</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isSwitchOn ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={onSwitchToggle}
          value={isSwitchOn}
        />
      </View>
      <ScrollView>
        <View style={styles.scrollContent}>
          <RadioButton.Group
            onValueChange={(newValue) => setSelectedOption(newValue)}
            value={selectedOption}
          >
            <View style={styles.radioItem}>
              <CircleCheckbox
                isChecked={selectedOption === "online"}
                onChange={() => setSelectedOption("online")}
              />
              <Text
                style={{
                  color: Colors.WHITE,
                  marginLeft: 20,
                  fontFamily: "appfont-light",
                  fontSize: 15,
                }}
              >
                Online Now
              </Text>
            </View>
            <View style={styles.radioItema}>
              <View style={{ flexDirection: "row" }}>
                <CircleCheckbox
                  isChecked={selectedOption === "option2"}
                  onChange={() => setSelectedOption("option2")}
                />

                <Text
                  style={{
                    color: Colors.WHITE,
                    marginLeft: 20,
                    fontFamily: "appfont-medium",
                    fontSize: 15,
                  }}
                >
                  Age
                </Text>
              </View>
              <Text
                style={{ color: Colors.WHITE, fontFamily: "appfont-medium" }}
              >
                {ageValue} yrs and over
              </Text>
            </View>
            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={18}
              maximumValue={100}
              step={1}
              value={ageValue}
              onValueChange={(value) => setAgeValue(value)}
            />
            <Text
              style={{
                color: Colors.WHITE,
                fontFamily: "appfont-light",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Drag to adjust range
            </Text>

            <TouchableOpacity
              onPress={handleTribesPress}
              style={[styles.radioItem, { marginTop: 20 }]}
            >
              <CircleCheckbox
                isChecked={selectedOption === "option4"}
                onChange={() => setSelectedOption("option4")}
              />
              <Text
                style={{
                  color: Colors.WHITE,
                  marginLeft: 20,
                  fontFamily: "appfont-light",
                  fontSize: 15,
                }}
              >
                Tribes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleBodyTypePress}
              style={[styles.radioItem, { marginTop: 20 }]}
            >
              <CircleCheckbox
                isChecked={selectedOption === "option5"}
                onChange={() => setSelectedOption("option5")}
              />
              <Text
                style={{
                  color: Colors.WHITE,
                  marginLeft: 20,
                  fontFamily: "appfont-light",
                  fontSize: 15,
                }}
              >
                Body Type
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleLookPress}
              style={[styles.radioItem, { marginTop: 20 }]}
            >
              <CircleCheckbox
                isChecked={selectedOption === "option10"}
                onChange={() => setSelectedOption("option10")}
              />
              <Text
                style={{
                  color: Colors.WHITE,
                  marginLeft: 20,
                  fontFamily: "appfont-light",
                  fontSize: 15,
                }}
              >
                Looking For
              </Text>
            </TouchableOpacity>
         
          </RadioButton.Group>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={FilterUsersData}
        style={styles.typesa}
      >
        <Text
          style={{
            color: Colors.WHITE,
            fontSize: 20,
            fontFamily: "appfont-medium",
          }}
        >
          Apply
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showTribesModal}
        onRequestClose={handleCloseTribesModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Tribes options here */}
            <Text style={styles.modalTitle}>Tribles</Text>
            {/* Add your Tribes options here */}
            <View
              style={styles.types}
            >
              <TouchableOpacity
                onPress={() => handleTribeSelect("Bear")}
                style={[
                  styles.optionText,
                  selectedTribes.includes("Bear") && styles.selectedTribeOption,
                ]}
              >
                <Text>Bear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleTribeSelect("Clean-Cut")}
                style={[
                  styles.optionText,
                  selectedTribes.includes("Clean-Cut") &&
                    styles.selectedTribeOption,
                ]}
              >
                <Text>Clean-Cut</Text>
              </TouchableOpacity>
            </View>
            <View
              style={styles.types}
            >
              <TouchableOpacity
                onPress={() => handleTribeSelect("Daddy")}
                style={[
                  styles.optionText,
                  selectedTribes.includes("Daddy") &&
                    styles.selectedTribeOption,
                ]}
              >
                <Text>Daddy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleTribeSelect("Geek")}
                style={[
                  styles.optionText,
                  selectedTribes.includes("Geek") && styles.selectedTribeOption,
                ]}
              >
                <Text>Geek</Text>
              </TouchableOpacity>
            </View>
            <View
              style={styles.types}
            >
              <TouchableOpacity
                onPress={() => handleTribeSelect("Trans")}
                style={[
                  styles.optionText,
                  selectedTribes.includes("Trans") &&
                    styles.selectedTribeOption,
                ]}
              >
                <Text>Trans</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleTribeSelect("Twink")}
                style={[
                  styles.optionText,
                  selectedTribes.includes("Twink") &&
                    styles.selectedTribeOption,
                ]}
              >
                <Text>Twink</Text>
              </TouchableOpacity>
            </View>
            <View
              style={styles.types}
            >
              <TouchableOpacity
                onPress={() => handleTribeSelect("Sober")}
                style={[
                  styles.optionText,
                  selectedTribes.includes("Sober") &&
                    styles.selectedTribeOption,
                ]}
              >
                <Text>Sober</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleTribeSelect("Not Specified")}
                style={[
                  styles.optionText,
                  selectedTribes.includes("Not Specified") &&
                    styles.selectedTribeOption,
                ]}
              >
                <Text>Not Specified</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.save}
              onPress={handleCloseTribesModal}
            >
              <Text style={styles.modalClose}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showBodyModal}
        onRequestClose={handleCloseBodyTypeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Tribes options here */}
            <Text style={styles.modalTitle}>Body Type</Text>
            {/* Add your Tribes options here */}
            <View
              style={styles.types}
            >
              <TouchableOpacity
                onPress={() => handleBodyTypeSelect("Toned")}
                style={[
                  styles.optionText,
                  selectedBodyType.includes("Toned") && styles.selectedTribeOption,
                ]}
              >
              <Text>Toned</Text>

              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleBodyTypeSelect("Average")}
                style={[
                  styles.optionText,
                  selectedBodyType.includes("Average") && styles.selectedTribeOption,
                ]}
              >
              <Text >Average</Text>

              </TouchableOpacity>
            </View>
            <View
              style={styles.types}
            >
               <TouchableOpacity
                onPress={() => handleBodyTypeSelect("Large")}
                style={[
                  styles.optionText,
                  selectedBodyType.includes("Large") && styles.selectedTribeOption,
                ]}
              >
              <Text >Large</Text>

              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleBodyTypeSelect("Muscular")}
                style={[
                  styles.optionText,
                  selectedBodyType.includes("Muscular") && styles.selectedTribeOption,
                ]}
              >
              <Text >Muscular</Text>

              </TouchableOpacity>
            </View>
            <View
              style={styles.types}
            >
                <TouchableOpacity
                onPress={() => handleBodyTypeSelect("Slim")}
                style={[
                  styles.optionText,
                  selectedBodyType.includes("Slim") && styles.selectedTribeOption,
                ]}
              >
              <Text >Slim</Text>

              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleBodyTypeSelect("Stocky")}
                style={[
                  styles.optionText,
                  selectedBodyType.includes("Stocky") && styles.selectedTribeOption,
                ]}
              >
              <Text >Stocky</Text>

              </TouchableOpacity>
            </View>
            <View
              style={styles.types}
            >
               <TouchableOpacity
                onPress={() => handleBodyTypeSelect("Not Specified")}
                style={[
                  styles.optionText,
                  selectedBodyType.includes("Not Specified") && styles.selectedTribeOption,
                ]}
              >
              <Text >Not Specified</Text>

              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.save}
              onPress={handleCloseBodyTypeModal}
            >
              <Text style={styles.modalClose}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showLookModal}
        onRequestClose={handleCloseLookModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Tribes options here */}
            <Text style={styles.modalTitle}>Looking for</Text>
            {/* Add your Tribes options here */}
            <View
              style={styles.types}
            >
              <TouchableOpacity
                onPress={() => handleRelationLook("Chat")}
                style={[
                  styles.optionText,
                  selectedLook.includes("Chat") && styles.selectedTribeOption,
                ]}
              >
              <Text >Chat</Text>

              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleRelationLook("Dates")}
                style={[
                  styles.optionText,
                  selectedLook.includes("Dates") && styles.selectedTribeOption,
                ]}
              >
              <Text >Dates</Text>

              </TouchableOpacity>
            </View>
            <View
              style={styles.types}
            >
              <TouchableOpacity
                onPress={() => handleRelationLook("Friends")}
                style={[
                  styles.optionText,
                  selectedLook.includes("Friends") && styles.selectedTribeOption,
                ]}
              >
              <Text >Friends</Text>

              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleRelationLook("Networking")}
                style={[
                  styles.optionText,
                  selectedLook.includes("Networking") && styles.selectedTribeOption,
                ]}
              >
              <Text>Networking</Text>

              </TouchableOpacity>
            </View>
            <View
              style={styles.types}
            >
              <TouchableOpacity
                onPress={() => handleRelationLook("Hookups")}
                style={[
                  styles.optionText,
                  selectedLook.includes("Hookups") && styles.selectedTribeOption,
                ]}
              >
              <Text >Hookups</Text>

              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleRelationLook("Relationship")}
                style={[
                  styles.optionText,
                  selectedLook.includes("Relationship") && styles.selectedTribeOption,
                ]}
              >
              <Text >Relationship</Text>

              </TouchableOpacity>
            </View>
            <View
              style={styles.types}
            >
                <TouchableOpacity
                onPress={() => handleRelationLook("Relationship")}
                style={[
                  styles.optionText,
                  selectedLook.includes("Relationship") && styles.selectedTribeOption,
                ]}
              >
              <Text >Not Specified</Text>

              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.save}
              onPress={handleCloseLookModal}
            >
              <Text style={styles.modalClose}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  save: {
    borderWidth: 1,
    borderColor: Colors.YELLOW,
    width: "100%",
    padding: 10,
    borderRadius: 20,
    backgroundColor: Colors.YELLOW,
  },
  modalContent: {
    backgroundColor: Colors.BLACK,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "appfont-medium",
    color: Colors.WHITE,
    marginBottom: 10,
  },
  modalClose: {
    fontSize: 16,
    fontFamily: "appfont-light",
    color: Colors.WHITE,
    textAlign: "center",
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioItema: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: "appfont-medium",
    color: Colors.WHITE,
  },
  iconContainer: {
    padding: 5,
  },
  optionText: {
    borderWidth: 1,
    borderRadius: 10,
    color: Colors.WHITE,
    borderColor: Colors.WHITE,
    padding: 10,
    width: "50%",
    textAlign: "center",
  },
  types:{
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  typesa:{
    width: "100%",
    borderColor: Colors.YELLOW,
    borderWidth: 1,
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    marginHorizontal: 20,
    marginHorizontal: "auto", // Horizontally center the button
    backgroundColor: Colors.YELLOW,
  }
});
