import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Carousel from "react-native-snap-carousel"; // Assuming you're using a carousel library for the image slider
import { AntDesign } from "@expo/vector-icons"; // Import AntDesign icon from Expo vector icons
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../HelperComponents/Colors";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { SendMessage, SingleUser } from "../../Api/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SingleUserProfile = ({ navigation, route }) => {
  const { userIdMain } = route.params;
  console.log(userIdMain, "userIdMain");
  const [userData, setUserData] = useState(null);
  const [token, settoken] = useState(null);
  const [message, setMessage] = useState("");
  const [countA, setCountA] = useState(0); // State variable for count

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      // Check if user ID and token exist in AsyncStorage
      const userId = await AsyncStorage.getItem("userId");
      settoken(userId);
      if (userId) {
        // Check if userId exists
        try {
          const data = await SingleUser(userId, userIdMain); // Wait for the promise to resolve
          if (data) {
            // Update state directly with the data
            setUserData(data?.data);
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
  }, [userIdMain]);

  const SendMessages = async () => {
    try {
      const data = await SendMessage(token, userIdMain, message);
      if (data.success) {
        Alert.alert("Success", "Message sent successfully!");
        setMessage("");
        setCountA(countA + 1); // Increment count after sending message
      }
    } catch (error) {
      // Show error alert
      Alert.alert("Error", "Failed to send message. Please try again later.");
    }
  };

  const handleChat = (userIdMain) => {
    navigation.navigate("ChatScreen", { userIdMain: userIdMain , countA: countA });
  };

  // Sample data for the image slider
  const images = [
    { id: 1, source: require("../../../assets/Avatar.jpg") },
    { id: 2, source: require("../../../assets/Avatar.jpg") },
    { id: 3, source: require("../../../assets/Avatar.jpg") },
  ];

  console.log(userData?.gallery[0]?.image_path)
  // Render individual image items for the carousel
  const renderImageItem = ({ item }) => (
    <View>
      {
        item ? (
          <Image
          source={require('../../../assets/Avatar.jpg')}
          style={{ width: "100%", height: 400, borderRadius: 20 }}
        />
        ):(
          <Image
          source={require('../../../assets/Avatar.jpg')}
          style={{ width: "100%", height: 400, borderRadius: 20 }}
        />
        )
      }
     
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.BACKGROUND }}>
      <View
        style={{
          margin: 10,
          position: "absolute",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "93%",
          zIndex: 9999, // Ensure the view takes up the full width
        }}
      >
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <MaterialIcons name="block" size={24} color="white" />
          {/* <AntDesign name="star" size={24} color="white" /> */}
        </View>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: "center", marginTop: 0 }}>
        {(userData && userData.gallery && userData.gallery.length > 0) ? (
          <Carousel
            data={userData.gallery}
            renderItem={renderImageItem}
            sliderWidth={400}
            itemWidth={400}
            autoplay
            autoplayInterval={3000}
            layout={"tinder"}
          />
        ) : (
          <Carousel
            data={images}
            renderItem={renderImageItem}
            sliderWidth={400}
            itemWidth={400}
            autoplay
            autoplayInterval={3000}
            layout={"tinder"}
          />
        )}
        </View>

        {/* User Bio */}
        <View style={{ margin: 20 }}>
          <Text
            style={{
              fontSize: 25,
              fontFamily: "appfont-medium",
              color: Colors.WHITE,
            }}
          >
            {userData?.display_name}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Octicons name="dot-fill" size={24} color="green" />
            <Text
              style={{
                fontSize: 15,
                fontFamily: "appfont-light",
                color: Colors.WHITE,
              }}
            >
              Online now
            </Text>
          </View>

          {userData?.about_me ? (
            <>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "appfont-light",
                  color: Colors.BLACK,
                }}
              >
                About Me
              </Text>
              <View
                style={{
                  borderTopLeftRadius: 20,
                  borderWidth: 1,
                  borderColor: Colors.BLACK,
                  padding: 20,
                  marginTop: 10,
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "appfont-light",
                    color: Colors.WHITE,
                  }}
                >
                  {userData?.about_me}
                </Text>
              </View>
            </>
          ) : (
            <></>
          )}

          <Text
            style={{
              fontSize: 18,
              fontFamily: "appfont-light",
              color: Colors.BLACK,
              marginTop: 10,
            }}
          >
            STATS
          </Text>
          <View>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "appfont-light",
                color: Colors.WHITE,
              }}
            >
              <MaterialCommunityIcons
                name="human-male-height"
                size={15}
                color={Colors.WHITE}
              />{" "}
              {userData?.height || 173} cm
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "appfont-light",
                color: Colors.WHITE,
                alignItems: "center",
              }}
            >
              <FontAwesome
                name="transgender-alt"
                size={15}
                color={Colors.WHITE}
              />{" "}
              {userData?.gender || "Male"}{" "}
              <SimpleLineIcons
                name="info"
                size={10}
                color={Colors.WHITE}
                style={{ marginLeft: 60 }}
              />
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "appfont-light",
                color: Colors.WHITE,
              }}
            >
              <MaterialCommunityIcons
                name="globe-model"
                size={15}
                color={Colors.WHITE}
              />{" "}
              Asian
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
          margin: 10,
          position: "absolute",
          bottom: 20,
          zIndex: 9999,
          justifyContent: "space-between",
        }}
      >
        <TextInput
          style={{
            backgroundColor: "#262626",
            padding: 10,
            borderRadius: 20,
            color: Colors.YELLOW,
            width: "80%",
          }}
          placeholder="Say Something..."
          onChangeText={(text) => setMessage(text)}
          placeholderTextColor={Colors.YELLOW}
        />
        {message.trim() !== "" && ( // Render the send button conditionally
          <TouchableOpacity
            onPress={SendMessages}
            style={{
              backgroundColor: Colors.YELLOW,
              padding: 8,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: Colors.WHITE }}>Send</Text>
          </TouchableOpacity>
        )}
        {message.trim() == "" && ( // Render the send button conditionally
          <TouchableOpacity onPress={() => handleChat(userData?.id)}>
            <MaterialCommunityIcons
              name="message-outline"
              size={32}
              color={Colors.YELLOW}
            />
          </TouchableOpacity>
        )}
      </View>
      {/* Image Slider */}
    </View>
  );
};

export default SingleUserProfile;
