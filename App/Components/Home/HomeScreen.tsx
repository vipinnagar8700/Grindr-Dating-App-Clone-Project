import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import Colors from "../HelperComponents/Colors";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import GalleryScreen from "./GalleryScreen";
import { Entypo } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { FontAwesome } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AllUsers,
  UpdateUserDataLocation,
  UserDetailsApi,
} from "../../Api/Api";
import { apiUrlImage } from "../../Api/ApiUrl";
import * as Location from "expo-location";

const HomeScreen = ({ navigation }) => {
  const [UsersData, setUsersData] = useState([]);
  const [UsersMe, setUsersMe] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingA, setIsLoadingA] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [long, setlong] = useState(null);
  const [lat, setlat] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [selectedItemIndexMain, setSelectedItemIndexMain] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerWidth] = useState(250);
  const drawerTranslationX = useState(new Animated.Value(-drawerWidth))[0];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    if (drawerOpen) {
      Animated.timing(drawerTranslationX, {
        toValue: -drawerWidth,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(drawerTranslationX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    Animated.timing(drawerTranslationX, {
      toValue: -drawerWidth,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };


  const handleItemPress = (index) => {
    // Check if the item is already selected
    if (index === selectedItemIndex) {
      // If it's selected, deselect it and reset state values
      setSelectedItemIndex(null);
      ResetData(); // Call the function to reset state values
    } else {
      // If it's not selected, select it
      setSelectedItemIndex(index);
      data[index]?.onPress?.();
    }
  };

  const handleItemPressMain = (index) => {
    // Check if the item is already selected
    if (index === selectedItemIndexMain) {
      // If it's selected, deselect it and reset state values
      setSelectedItemIndexMain(null);
      ResetData(); // Call the function to reset state values
    } else {
      // If it's not selected, select it
      setSelectedItemIndexMain(index);
      dataMain[index]?.onPress?.();
    }
  };

  const [ageValue, setAgeValue] = useState(0); // Initial age value
  const [showLookModal, setshowLookModal] = useState(false);
  const [selectedTribes, setSelectedTribes] = useState("");
  const [selectedBodyType, setSelectedBodyType] = useState("");
  const [selectedLook, setSelectedLook] = useState("");
  const [selectedOnline, setSelectedOnline] = useState("");
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        try {
          const data = await AllUsers(userId);
          setUsersData(data?.data);
        } catch (error) {
          console.log("Error fetching user data:", error);
        } finally {
          setIsLoading(false); // Update loading state once fetching is done
        }
      } else {
        console.log("User not logged in!");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [count]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = await AsyncStorage.getItem("userId");

      if (userId) {
        try {
          const data = await UserDetailsApi(userId);
          setUsersMe(data?.data);
          setlong(data?.data?.longitude);
          setlat(data?.data?.latitude);
          if (data?.data?.longitude === null || data?.data?.latitude === null) {
            getLocation(userId, data?.data?.id);

            // Call getLocation function
          } else {
            setIsLoadingA(false); // Update loading state if latitude and longitude are already available
          }
        } catch (error) {
          console.log("Error fetching user data:", error);
        } finally {
          setIsLoadingA(false); // Update loading state once fetching is done
        }
      } else {
        console.log("User not logged in!");
        setIsLoadingA(false);
      }
    };

    fetchUserDetails();
  }, []);

  const getLocation = async (userId, id) => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const data = await UpdateUserDataLocation(
        userId,
        id,
        longitude,
        latitude
      );

      // You can use the location data for any purpose in your app
    } catch (error) {
      console.error("Error getting location and updating user data:", error);
      throw error;
    }
  };

  const ResetData = () => {
    setCount(count + 1);
    setAgeValue(0);
    setSearchQuery("");
    setSelectedBodyType("");
    setSelectedOnline("");
    setSelectedTribes("");
    setSelectedLook("");
  };
  const ViewSc = () => {
    navigation.navigate("ViewedMeScreen");
  };
  const Incognito = () => {
    navigation.navigate("Store");
  };
  const EditProfile = () => {
    navigation.navigate("EditProfileScreen");
  };
  const SettingScreen = () => {
    navigation.navigate("SettingScreen");
  };
  const MyAlbumScreen = () => {
    navigation.navigate("MyAlbumScreen");
  };
  // Filter users based on display name, age, and selected tribe
  const filteredUsers = UsersData.filter((user) => {
    if (!user) return false; // Skip null or undefined users
   
    const ageMatch = user?.age === ageValue || ageValue === 0;
    
    const lookfor = selectedLook
      ? user?.looking_for?.includes(selectedLook)
      : true; // Add null check for body_type
    const isOnlineMatch =
      selectedOnline === "online" ? user?.online_status === "online" : true; // Check if user is online if "Online Now" filter is selected
    return (
      ageMatch &&
      lookfor &&
      isOnlineMatch
    );
  });

  // Age
  const handleAgePress = () => {
    setShowAgeModal(true);
  };
  const handleCloseAgeModal = () => {
    setShowAgeModal(false);
    handleItemPressMain();
  };

  // Looking for
  const handleLookPress = () => {
    setshowLookModal(true);
  };

  const handleCloseLookModal = () => {
    setshowLookModal(false);
    handleItemPress();
  };

  
  // Function to handle tribe selection
  const handleRelationLook = (tribe) => {
    setSelectedLook(tribe === selectedLook ? "" : tribe); // Check if the tribe is already selected
  };

  // Handler for selecting "Online Now" filter
  const handleOnlineNowPress = () => {
    setSelectedOnline("online");
  };

  const data = [
    { id: 1, name: "Online Now", onPress: handleOnlineNowPress },
    { id: 2, name: "Age", onPress: handleAgePress },
   { id: 3, name: "Looking for", onPress: handleLookPress }
  ];


  return (
    <TouchableWithoutFeedback onPress={closeDrawer}>
      <View style={styles.container}>
        {isLoading ? ( // Render loader if data is still loading
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={Colors.WHITE} />
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.header}>
              {/* User Avatar */}
              <TouchableOpacity onPress={toggleDrawer}>
                {UsersMe?.image ? (
                  <Image
                    source={{ uri: `${apiUrlImage}/${UsersMe?.image}` }}
                    style={styles.avatar}
                  />
                ) : (
                  <Image
                    source={require("../../../assets/Avatar.jpg")}
                    style={styles.avatar}
                  />
                )}
              </TouchableOpacity>
                  <View
                    style={[
                      styles.item,
                      {
                        borderColor:
                         Colors.BLACK,width:'60%'
                      },
                    ]}
                  >
                    <Text
                      style={{color:Colors.WHITE,fontFamily:'appfont-light'}}
                    >
                     Single & Curious
                    </Text>
                  </View>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: Colors.BLACK,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={ViewSc}>
                  <Feather name="eye" size={22} color="#999" />
                </TouchableOpacity>
              </View>
            </View>
            {/* Scrollable items */}
            <View style={styles.headera}>
              <ScrollView
                horizontal
                contentContainerStyle={styles.itemsContainer}
                showsHorizontalScrollIndicator={false}
              >
                {data.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => handleItemPress(index)}
                    key={index}
                    style={[
                      styles.item,
                      {
                        borderColor:
                          index === selectedItemIndex
                            ? Colors.YELLOW
                            : Colors.BLACK,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color:
                          index === selectedItemIndex
                            ? Colors.YELLOW
                            : Colors.WHITE,
                        fontFamily: "appfont-light",
                      }}
                    >
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            
            
            <Modal
              animationType="slide"
              transparent={true}
              visible={showLookModal}
              onRequestClose={handleCloseLookModal}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  {/* Tribes options here */}
                  <View style={styles.centeredContainer}>
                    <TouchableOpacity onPress={ResetData}>
                      <Text
                        style={[
                          styles.modalTitle,
                          { fontFamily: "appfont-light", color: Colors.YELLOW },
                        ]}
                      >
                        Reset
                      </Text>
                    </TouchableOpacity>
                    <Text style={[styles.modalTitle, { marginRight: 40 }]}>
                      Looking For
                    </Text>
                    <Text style={styles.modalTitle}></Text>
                  </View>
                  <View style={styles.types}>
                    <TouchableOpacity
                      onPress={() => handleRelationLook("Chat")}
                      style={[
                        styles.optionText,
                        selectedLook.includes("Chat") &&
                          styles.selectedTribeOption,
                        selectedLook.includes("Chat") && {
                          borderColor: Colors.YELLOW,
                        },
                      ]}
                    >
                      <Text style={{ color: Colors.WHITE }}>Chat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleRelationLook("Dates")}
                      style={[
                        styles.optionText,
                        selectedLook.includes("Dates") &&
                          styles.selectedTribeOption,
                        selectedLook.includes("Dates") && {
                          borderColor: Colors.YELLOW,
                        },
                      ]}
                    >
                      <Text style={{ color: Colors.WHITE }}>Dates</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.types}>
                    <TouchableOpacity
                      onPress={() => handleRelationLook("Friends")}
                      style={[
                        styles.optionText,
                        selectedLook.includes("Friends") &&
                          styles.selectedTribeOption,
                        selectedLook.includes("Friends") && {
                          borderColor: Colors.YELLOW,
                        },
                      ]}
                    >
                      <Text style={{ color: Colors.WHITE }}>Friends</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleRelationLook("Networking")}
                      style={[
                        styles.optionText,
                        selectedLook.includes("Networking") &&
                          styles.selectedTribeOption,
                        selectedLook.includes("Networking") && {
                          borderColor: Colors.YELLOW,
                        },
                      ]}
                    >
                      <Text style={{ color: Colors.WHITE }}>Networking</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.types}>
                    <TouchableOpacity
                      onPress={() => handleRelationLook("Hookups")}
                      style={[
                        styles.optionText,
                        selectedLook.includes("Hookups") &&
                          styles.selectedTribeOption,
                        selectedLook.includes("Hookups") && {
                          borderColor: Colors.YELLOW,
                        },
                      ]}
                    >
                      <Text style={{ color: Colors.WHITE }}>Hookups</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleRelationLook("Relationship")}
                      style={[
                        styles.optionText,
                        selectedLook.includes("Relationship") &&
                          styles.selectedTribeOption,
                        selectedLook.includes("Relationship") && {
                          borderColor: Colors.YELLOW,
                        },
                      ]}
                    >
                      <Text style={{ color: Colors.WHITE }}>Relationship</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.types}>
                    <TouchableOpacity
                      onPress={() => handleRelationLook("null")}
                      style={[
                        styles.optionText,
                        selectedLook.includes("null") &&
                          styles.selectedTribeOption,
                        selectedLook.includes("null") && {
                          borderColor: Colors.YELLOW,
                        },
                      ]}
                    >
                      <Text style={{ color: Colors.WHITE }}>Not Specified</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.save}
                    onPress={handleCloseLookModal}
                  >
                    <Text style={styles.modalClose}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            {/* Age */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={showAgeModal}
              onRequestClose={handleCloseAgeModal}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  {/* Tribes options here */}
                  <View style={styles.centeredContainer}>
                    <TouchableOpacity onPress={ResetData}>
                      <Text
                        style={[
                          styles.modalTitle,
                          { fontFamily: "appfont-light", color: Colors.YELLOW },
                        ]}
                      >
                        Reset
                      </Text>
                    </TouchableOpacity>
                    <Text style={[styles.modalTitle, { marginRight: 40 }]}>
                      Age
                    </Text>
                    <Text style={styles.modalTitle}></Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.WHITE,
                        fontFamily: "appfont-medium",
                      }}
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
                      marginVertical: 20,
                    }}
                  >
                    Drag to adjust range
                  </Text>
                  <TouchableOpacity
                    style={styles.save}
                    onPress={handleCloseAgeModal}
                  >
                    <Text style={styles.modalClose}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <GalleryScreen
              UsersData={filteredUsers}
              isLoadingA={isLoadingA}
              ResetData={ResetData}
            />
          </View>
        )}

        <Animated.View
          style={[
            styles.drawer,
            { transform: [{ translateX: drawerTranslationX }] },
          ]}
        >
          <View style={{ flex: 1, backgroundColor: "#000", padding: 20 }}>
            {/* Drawer content goes here */}
            <View
              style={{
                width: 100,
                height: 100,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              {UsersMe?.image ? (
                <Image
                  source={{ uri: `${apiUrlImage}/${UsersMe?.image}` }}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 140,
                    borderRadius: 10,
                  }}
                />
              ) : (
                <Image
                  source={require("../../../assets/Avatar.jpg")}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 140,
                    borderRadius: 10,
                  }}
                />
              )}
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "center",
                padding: 10,
                borderWidth: 1,
                borderColor: Colors.BLACK,
                backgroundColor: Colors.BLACK,
              }}
            >
              {UsersMe?.display_name ? (
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: "center",
                    color: Colors.WHITE,
                    fontFamily: "appfont-light",
                  }}
                >
                  {UsersMe?.display_name}
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: "center",
                    color: Colors.WHITE,
                    fontFamily: "appfont-light",
                  }}
                >
                  User
                </Text>
              )}

            </View>
            <View style={{ marginTop: 5, flexDirection: "row", gap: 5 }}>
              <Text
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: Colors.BLACK,
                  backgroundColor: Colors.BLACK,
                  padding: 10,
                  fontFamily: "appfont-light",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Entypo name="dot-single" size={20} color="green" />
                  <Text
                    style={{
                      fontSize: 15,
                      color: Colors.WHITE,
                      fontFamily: "appfont-light",
                    }}
                  >
                    Online
                  </Text>
                </View>
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 15,
                  color: Colors.WHITE,
                  borderWidth: 1,
                  borderColor: Colors.BLACK,
                  backgroundColor: Colors.BLACK,
                  padding: 10,
                  fontFamily: "appfont-light",
                }}
              >
                <TouchableOpacity
                  onPress={Incognito}
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <FontAwesome
                    name="snapchat-ghost"
                    size={20}
                    color="black"
                    style={{ marginRight: 1 }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      color: Colors.WHITE,
                      fontFamily: "appfont-light",
                    }}
                  >
                    Incognito
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>

            <Divider style={{ marginVertical: 20 }} />
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Entypo name="infinity" size={20} color={Colors.BLACK} />
              <View>
                <Text
                  style={{
                    padding: 3,
                    fontFamily: "appfont-light",
                    fontSize: 18,
                    color: Colors.YELLOW,
                  }}
                >
                  Buy Unlimited for 3 day
                </Text>
                <Text
                  style={{
                    fontFamily: "appfont-light",
                    fontSize: 13,
                    color: Colors.BLACK,
                  }}
                >
                  Only $ 2.99
                </Text>
              </View>
            </View>
            <Divider style={{ marginVertical: 20 }} />
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Entypo name="edit" size={20} color={Colors.BLACK} />
              <TouchableOpacity onPress={EditProfile}>
                <Text
                  style={{
                    padding: 3,
                    fontFamily: "appfont-light",
                    fontSize: 18,
                    color: Colors.YELLOW,
                  }}
                >
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
            <Divider style={{ marginVertical: 20 }} />
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Entypo name="image" size={20} color={Colors.BLACK} />
              <TouchableOpacity onPress={MyAlbumScreen}>
                <Text
                  style={{
                    padding: 3,
                    fontFamily: "appfont-light",
                    fontSize: 18,
                    color: Colors.YELLOW,
                  }}
                >
                  My Albumbs
                </Text>
              </TouchableOpacity>
            </View>
            <Divider style={{ marginVertical: 20 }} />
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <AntDesign name="like2" size={24} color={Colors.BLACK} />
              <Text
                style={{
                  padding: 3,
                  fontFamily: "appfont-light",
                  fontSize: 18,
                  color: Colors.YELLOW,
                }}
              >
                Mpox Resources
              </Text>
            </View>
            <Divider style={{ marginVertical: 20 }} />
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <AntDesign name="setting" size={24} color={Colors.BLACK} />
              <TouchableOpacity onPress={SettingScreen}>
                <Text
                  style={{
                    padding: 3,
                    fontFamily: "appfont-light",
                    fontSize: 18,
                    color: Colors.YELLOW,
                  }}
                >
                  Settings
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  button: {
    padding: 10,
    backgroundColor: "#DDDDDD",
    marginBottom: 10,
  },
  drawer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: "#FFFFFF",
  },
  drawerItem: {
    fontSize: 18,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
  },
  headera: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.BACKGROUND,
    borderRadius: 20,
    borderColor: Colors.BLACK,
    borderWidth: 1,
    paddingHorizontal: 8,
    padding: 6,
  },
  searchIcon: {
    marginRight: 8,
    paddingLeft: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.WHITE,
    fontFamily: "appfont-light",
    paddingLeft: 10,
  },
  itemsContainer: {
    justifyContent: "center",
    paddingHorizontal: 14,
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
  centeredContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center", // Center items vertically
  },
  modalContent: {
    backgroundColor: Colors.BACKGROUND,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
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
  optionText: {
    borderWidth: 1,
    borderRadius: 10,
    color: Colors.WHITE,
    borderColor: Colors.WHITE,
    padding: 10,
    width: "50%",
    textAlign: "center",
  },
  types: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  item: {
    height: 30,
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    paddingVertical: 2,
    paddingHorizontal: 15,
  },
});

export default HomeScreen;
