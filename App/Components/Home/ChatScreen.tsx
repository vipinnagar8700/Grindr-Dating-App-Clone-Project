import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Linking } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import * as FileSystem from "expo-file-system";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../HelperComponents/Colors";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AllchatUsersSingle,
  ReadMessages,
  SendMessage,
  SendMessageMain,
  SingleUser,
  UpdateUserDataFCM,
} from "../../Api/Api";
import { apiUrlImage } from "../../Api/ApiUrl";

const ChatScreen = ({ navigation, route }) => {
  const [isEmojiModalVisible, setEmojiModalVisible] = useState(false);
  const [count, setCount] = useState(0);
  const { userIdMain, countA } = route.params;
  const [token, setToken] = useState(null);
  const [isCameraModalVisible, setCameraModalVisible] = useState(false);
  const [message, setmessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageA, setSelectedImageA] = useState(null);
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const [liveLocation, setLiveLocation] = useState(null);
  const flatListRef = useRef(null); // Ref for FlatList

  const openLocationModal = () => {
    setLocationModalVisible(true);
  };

  const closeLocationModal = () => {
    setLocationModalVisible(false);
  };

  const [user, SetUser] = useState(null);
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      // Check if user ID and token exist in AsyncStorage
      const userId = await AsyncStorage.getItem("userId");
      setToken(userId);
      if (userId) {
        try {
          const data = await SingleUser(userId, userIdMain); // Wait for the promise to resolve
          if (data) {
            SetUser(data?.data);
          }
        } catch (error) {
          console.log("Error fetching user data:", error);
        }
      } else {
        console.log("User not logged in!");
      }
    };
    checkUserLoggedIn();
  }, [userIdMain, countA]);
  const [userChat, SetuserChat] = useState([]);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      // Check if user ID and token exist in AsyncStorage
      const userId = await AsyncStorage.getItem("userId");
    ReadMessageses(userId,userIdMain)

      if (userId) {
        // Check if userId exists
        try {
          const data = await AllchatUsersSingle(userId, userIdMain); // Wait for the promise to resolve
          if (data) {
            SetuserChat(data?.data);
           
        //   // if(token){
        //   //   const data = await UpdateUserDataFCM(
        //   //     userId,
        //   //     userIdMain,
        //   //     token
        //   //   );
        //   //   console.log(userId, userIdMain,token);
        //   //   if (data) {
        //   //     console.log(data, "data");
        //   //   }
          
        //  } else {
        //    console.log('Permission to receive push notifications denied.');
        //  }
            // Update state directly with the data
          }
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
  }, [userIdMain, count, countA]);

  const sendMessage = async () => {
    if (message.trim() === "" && !selectedImage) return; // Don't send empty messages
    try {
      let result;
      if (selectedImage) {
        // If there is a selected image, send it along with the message
        result = await SendMessage(token, userIdMain, message, selectedImage);
      } else {
        // If no image is selected, send only the message
        result = await SendMessage(token, userIdMain, message);
      }
      setCount(count + 1);
      // Clear input after sending message
      setmessage("");
      setSelectedImage(null); // Clear selected image after sending
    } catch (error) {
      console.log("Error sending message:", error);
      // Handle error, if needed
    }
  };

  const renderMessageItem = ({ item }) => {
    if (!item) {
      return null; // Return null if item is undefined
    }

    const isSender = item.sender_id === user?.id;
    const messageTime = moment(item.created_at);

    let timeDisplay;
    if (moment().diff(messageTime, "days") === 0) {
      // If the message was sent today, display the time
      timeDisplay = messageTime.format("h:mm A");
    } else if (moment().diff(messageTime, "days") === 1) {
      // If the message was sent yesterday, display "Yesterday"
      timeDisplay = "Yesterday";
    } else if (moment().diff(messageTime, "days") > 1) {
      // If the message was sent more than 2 days ago, display the date and time
      timeDisplay = messageTime.format("DD MMM, hh:mm A");
    }

    return (
      <View
        style={{
          flexDirection: isSender ? "row" : "row-reverse",
          alignItems: "flex-end",
          marginVertical: 5,
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            backgroundColor: isSender ? "#DCF8C5" : "#E5E5EA",
            padding: 10,
            borderRadius: 10,
            maxWidth: "70%", // Limiting message width
          }}
        >
          {item?.location ? (
          <View>
          <TouchableOpacity onPress={() => Linking.openURL(item.location)}>
            <Text style={{ color:Colors.YELLOW, marginBottom: 5 }}>View Location</Text>
          </TouchableOpacity>
          
        </View>
        ) : item?.file_path ? (
            <TouchableOpacity
              onPress={() => handleImageDownload(item?.file_path)}
            >
              <Image
                source={{ uri: item?.file_path }}
                style={[styles.selectedImage, { borderRadius: 2 }]}
              />
            </TouchableOpacity>
          ) : (
            <Text
              style={{
                fontSize: 14,
                color: Colors.BACKGROUND,
                fontFamily: "appfont-medium",
              }}
            >
              {item.message}
            </Text>
          )}

          <Text
            style={{ fontSize: 10, color: "#888", fontFamily: "appfont-light" }}
          >
            {timeDisplay}
          </Text>
        </View>
      </View>
    );
  };

  const handleFileSelect = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
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

    if (result.cancelled) {
      console.log("Image selection cancelled.");
      return;
    }
    if (!result.cancelled) {
      setSelectedImage(result.assets[0].uri);
      setCameraModalVisible(false);
    }
  };

  const openCameraModal = () => {
    setCameraModalVisible(true);
  };

  const closeCameraModal = () => {
    setCameraModalVisible(false);
  };
  const deleteImage = () => {
    setSelectedImage(null); // Assuming setSelectedImage is a state setter function to update the selected image
  };

  const handleImageDownload = async (imageUri) => {
    try {
      if (imageUri) {
        const { uri: fileUri } = await FileSystem.downloadAsync(
          imageUri,
          FileSystem.documentDirectory + "image.jpg"
        );
        Linking.openURL(imageUri).catch((error) => {
          console.error("Failed to open URL:", error);
        });
      } else {
        console.log("Storage permission denied.");
      }
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const recordVideo = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Camera permission is required to record a video.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });
      if (result.cancelled) {
        console.log("Image selection cancelled.");
        return;
      }
      if (!result.cancelled) {
        setSelectedImageA(result.assets[0].uri);
        setCameraModalVisible(false);
      }
    } catch (error) {
      console.error("Error recording video:", error);
    }
  };

  const sendLiveLocation = async () => {
    if (!liveLocation) {
      console.log("Live location not available.");
      return;
    }
    console.log(liveLocation);
    try {
      // Construct the message with live location coordinates
      const message = `Live Location: Latitude ${liveLocation.latitude}, Longitude ${liveLocation.longitude}`;

    // Construct URL for Google Maps
    const mapsUrl = `https://www.google.com/maps?q=${liveLocation.latitude},${liveLocation.longitude}`;


      // Send the message with live location coordinates
      const result = await SendMessageMain(token, userIdMain,  `${mapsUrl}`);
      console.log(result);
      // Increment the count to trigger FlatList update
      setCount(count + 1);

      // Close the modal after sending
      closeLocationModal();
    } catch (error) {
      console.log("Error sending live location:", error);
    }
  };

  const getLocation = async () => {
    try {
      // Request permission to access the user's current location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied.");
        return;
      }

      // Get the user's current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Set live location state
      setLiveLocation({ latitude, longitude });
    } catch (error) {
      console.log("Error getting live location:", error);
    }
  };

  const openEmojiModal = () => {
    setEmojiModalVisible(true);
  };

  const closeEmojiModal = () => {
    setEmojiModalVisible(false);
  };

  const selectEmoji = (emoji) => {
    console.log(emoji, "emoji");
    setmessage(message + emoji.native);
  };

  useEffect(() => {
    // Scroll to bottom when content size changes
    flatListRef.current.scrollToEnd({ animated: true });
  }, [userChat]);

const ReadMessageses = async(userId,userIdMain)=>{
  try {
    const data = await ReadMessages(userId,userIdMain);
    if(data){
      console.log(data)
    }
  } catch (error) {
    console.log(error)
  }
}


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color={Colors.WHITE} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", gap: 15 }}>
          {user?.image && user?.image ? (
            <Image
              source={{ uri: `${apiUrlImage}/${user?.image}` }}
              style={{ width: 40, height: 40, borderRadius: 5 }}
            />
          ) : (
            <Image
              source={require("../../../assets/Avatar.jpg")}
              style={{ width: 40, height: 40, borderRadius: 5 }}
            />
          )}
          <View>
            <Text style={styles.headerText}>{user?.display_name}</Text>
            <Text style={styles.headerTexta}>313 meters away</Text>
          </View>
        </View>
        <AntDesign name="filter" size={24} color={Colors.WHITE} />
      </View>
      <FlatList
        ref={flatListRef}
        data={userChat}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id.toString()}
        onContentSizeChange={() => flatListRef.current.scrollToEnd()}
      />
      <View
        style={[styles.inputContainer, { marginHorizontal: 10, marginTop: 10 }]}
      >
        {selectedImage ? (
          <View style={styles.selectedImageContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.selectedImage}
            />
            <TouchableOpacity
              onPress={deleteImage}
              style={styles.deleteIconContainer}
            >
              <MaterialIcons name="cancel" size={24} color={Colors.WHITE} />
            </TouchableOpacity>
          </View>
        ) : null}
        {selectedImageA ? (
          <View style={styles.selectedImageContainer}>
            <Image
              source={{ uri: selectedImageA }}
              style={styles.selectedImage}
            />
            <TouchableOpacity
              onPress={deleteImage}
              style={styles.deleteIconContainer}
            >
              <MaterialIcons name="cancel" size={24} color={Colors.WHITE} />
            </TouchableOpacity>
          </View>
        ) : null}
        <TextInput
          style={styles.textInput}
          placeholder="Say Something ...."
          value={message}
          onChangeText={setmessage}
          placeholderTextColor={Colors.WHITE}
        />
        {selectedImage && message.trim() !== "" ? (
          <TouchableOpacity onPress={sendMessage} style={styles.iconContainer}>
            <Feather name="send" size={24} color={Colors.WHITE} />
          </TouchableOpacity>
        ) : null}
        {!selectedImage && message.trim() !== "" ? (
          <TouchableOpacity onPress={sendMessage} style={styles.iconContainer}>
            <Feather name="send" size={24} color={Colors.WHITE} />
          </TouchableOpacity>
        ) : null}
        {selectedImage && message.trim() === "" ? (
          <TouchableOpacity onPress={sendMessage} style={styles.iconContainer}>
            <Feather name="send" size={24} color={Colors.WHITE} />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={openCameraModal}
          style={styles.iconContainer}
        >
          <AntDesign
            name="camera"
            size={28}
            color={Colors.BLACK}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={openEmojiModal} style={styles.iconContainer}>
          <AntDesign
            name="smileo"
            size={28}
            color={Colors.BLACK}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={openLocationModal}
          style={styles.iconContainer}
        >
          <AntDesign
            name="enviromento"
            size={28}
            color={Colors.BLACK}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      {/* Camera modal */}
      <Modal
        visible={isEmojiModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeEmojiModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 100,
              }}
            >
              <Text></Text>
              <Text style={{ fontFamily: "appfont-medium", fontSize: 18 }}>
                Select Emoji
              </Text>
              <TouchableOpacity
                onPress={closeEmojiModal}
                style={styles.closeButton}
              >
                <AntDesign name="close" size={24} color={Colors.BLACK} />
              </TouchableOpacity>
            </View>
            <EmojiSelector
              category={Categories.symbols}
              onEmojiSelected={selectEmoji}
            />
          </View>
        </View>
      </Modal>
      <Modal
        visible={isCameraModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeCameraModal}
      >
        <View style={styles.modalContainer}>
          {/* Modal content */}
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 100,
              }}
            >
              <Text></Text>
              <Text style={{ fontFamily: "appfont-medium", fontSize: 18 }}>
                Add Photo
              </Text>
              <TouchableOpacity
                onPress={closeCameraModal}
                style={styles.closeButton}
              >
                <AntDesign name="close" size={24} color={Colors.BLACK} />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row" }}>
              {/* Render camera modal options here */}
              <TouchableOpacity
                style={styles.modalOption}
                onPress={handleFileSelect}
              >
                <AntDesign name="plus" size={24} color={Colors.WHITE} />
                <Text style={{ color: Colors.WHITE }}>Add Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={recordVideo}
              >
                <AntDesign name="videocamera" size={24} color={Colors.WHITE} />
                <Text style={{ color: Colors.WHITE }}>Add Video</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption}>
                <Ionicons name="images" size={24} color={Colors.WHITE} />
                <Text style={{ color: Colors.WHITE }}>Create Album</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isLocationModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeLocationModal}
      >
        <View style={styles.modalContainer}>
          {/* Modal content */}
          <View style={styles.modalContent}>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                gap: 120,
                marginVertical: 10,
              }}
            >
              <Text style={styles.modalTitle}></Text>

              <Text style={styles.modalTitle}>Location</Text>
              <TouchableOpacity onPress={closeLocationModal}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <MapView
              style={styles.map}
              initialRegion={{
                latitude: liveLocation ? liveLocation.latitude : 28.5355,
                longitude: liveLocation ? liveLocation.longitude : 77.391,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onPress={(e) =>
                setLiveLocation({
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                })
              }
            >
              {/* Marker for live location */}
              {liveLocation && (
                <Marker
                  coordinate={{
                    latitude: liveLocation.latitude,
                    longitude: liveLocation.longitude,
                  }}
                />
              )}
            </MapView>
            {/* Button to detect live location */}
            <TouchableOpacity onPress={getLocation} style={styles.modalButton}>
              <FontAwesome6
                name="location-crosshairs"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            {/* Button to send live location */}
            <View style={{ gap: 10, width: "100%", marginVertical: 10 }}>
              <TouchableOpacity
                onPress={sendLiveLocation}
                style={styles.modalButtonAA}
              >
                <Text style={styles.modalButtonText}>Send Live Location</Text>
              </TouchableOpacity>

              {/* Button to close modal */}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.BACKGROUND },
  header: {
    flexDirection: "row",
    backgroundColor: Colors.BLACK,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 13,
  },
  headerText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontFamily: "appfont-medium",
  },
  headerTexta: {
    color: Colors.WHITE,
    fontSize: 12,
    fontFamily: "appfont-light",
  },

  modalButtonAA: {
    padding: 10,
    borderColor: Colors.YELLOW,
    borderWidth: 1,
    width: "100%",
    backgroundColor: Colors.YELLOW,
    gap: 10,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 1,
    backgroundColor: Colors.BLACK,
    borderRadius: 25,
  },
  textInput: {
    flex: 1,
    color: Colors.WHITE,
    padding: 10,
  },
  iconContainer: {
    padding: 10,
  },
  map: {
    width: "100%", // Set the width to 100% of the parent container
    height: 200, // Set the height to a fixed value, e.g., 400px
  },

  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  modalOption: {
    width: "32%",
    height: 100,
    borderWidth: 1,
    gap: 12,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.BLACK,
    borderColor: Colors.WHITE,
    color: Colors.WHITE,
  },
  selectedImage: {
    width: 130,
    height: 130,
    borderRadius: 10,
  },
  deleteIconContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 12,
    padding: 5,
  },
  modalButton: {
    position: "absolute",
    bottom: "30%",
    right: 30,
  },
  modalButtonA: {
    position: "absolute",
    bottom: "50%",
    right: 30,
  },
  iconContainer: {
    marginLeft: 10,
  },
  placeholderContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  placeholderText: {
    color: "white",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "appfont-medium",
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonText: {
    fontFamily: "appfont-medium",
    fontSize: 18,
    color: Colors.WHITE,
  },
});
