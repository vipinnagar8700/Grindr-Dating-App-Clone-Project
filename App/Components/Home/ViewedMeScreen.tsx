import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,ActivityIndicator
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../HelperComponents/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDetailsApi, UserViwers } from "../../Api/Api";
import { apiUrlImage } from "../../Api/ApiUrl";

const ViewedMeScreen = ({ navigation }) => {
  const onBackPress = () => {
    navigation.goBack(); // Navigate back
  };
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [userDataMain, setuserDataMain] = useState(null);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      // Check if user ID and token exist in AsyncStorage
      const userId = await AsyncStorage.getItem("userId");
      console.log(userId);
      if (userId) {
        // Check if userId exists
        try {
          const data = await UserDetailsApi(userId); // Wait for the promise to resolve
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
  }, []);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      // Check if user ID and token exist in AsyncStorage
      const userId = await AsyncStorage.getItem("userId");
      const userIdMain = userData?.id;
      if (userId) {
        // Check if userId exists
        try {
          const data = await UserViwers(userId, userIdMain); // Wait for the promise to resolve
          if (data) {
            // Update state directly with the data
            setuserDataMain(data);
          }
          // Proceed with data processing
        } catch (error) {
          console.log("Error fetching user data:", error);
        }finally {
          setLoading(false); // Set loading state to false after fetching data
        }
      } else {
        console.log("User not logged in!");
      }
    };
    // Call the function to check user login status
    checkUserLoggedIn();
  }, []);

  const formatDate = (date) => {
    const today = new Date();
    const inputDate = new Date(date);

    // Calculate the difference in milliseconds
    const diffTime = Math.abs(today - inputDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.ceil(diffDays / 7);

    // Check if it's within a day
    if (diffDays === 1) {
      return "Last 1 day";
    }

    // Check if it's within a week
    if (diffDays <= 7) {
      return `Last ${diffDays} days`;
    }

    // Check if it's within a month
    const diffMonths =
      today.getMonth() -
      inputDate.getMonth() +
      12 * (today.getFullYear() - inputDate.getFullYear());
    if (diffMonths === 1) {
      return "Last 1 month";
    } else if (diffMonths > 1) {
      return `Last ${diffMonths} months`;
    }

    // Check if it's within a year
    if (today.getFullYear() === inputDate.getFullYear()) {
      return `Last ${diffWeeks} weeks`;
    }

    // Default: return the full date
    return "Over a year ago";
  };

  const formattedDate = formatDate(userDataMain?.data?.[0]?.created_at);


  const formatDatea = (date) => {
    const updatedDate = new Date(date);
    const now = new Date();
    
    // Calculate the difference in milliseconds
    const diffTime = Math.abs(now - updatedDate);
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  
    if (diffMinutes < 60) {
      return `${diffMinutes} mins ago`;
    } else {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    }
  };
  
  const SingleUserProfile = (userIdMain) => {
    navigation.navigate("SingleUserProfile", { userIdMain: userIdMain });
  };
 // Conditionally render loading indicator if loading
 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress}>
          <AntDesign name="arrowleft" size={24} color={Colors.WHITE} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Viewed Me</Text>
        <Text style={styles.headerText}></Text>
        <Text style={styles.headerText}></Text>
      </View>
      {
        loading ?(
<View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <ActivityIndicator size="large" color={Colors.WHITE} />
    </View>
        ):(
          <ScrollView>
          <View style={{ flexDirection: "row", flex: 1, gap: 10, padding: 20 }}>
            <View
              style={{
                flexGrow: 1,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: Colors.WHITE,
                  fontFamily: "appfont-medium",
                  fontSize: 15,
                }}
              >
                {userDataMain?.totalViews} Viewers
              </Text>
              <Text
                style={{
                  color: Colors.WHITE,
                  fontFamily: "appfont-medium",
                  fontSize: 12,
                }}
              >
                {formattedDate}
              </Text>
            </View>
          
          </View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{ width: "100%", flexDirection: "row", flexWrap: "wrap" }}
            >
              {userDataMain  &&
                 userDataMain.data.map((data, index) => {
                  return (
                    <TouchableOpacity  key={index}  onPress={() => SingleUserProfile(data?.view_by?.id)}
                      style={{
                        borderRadius: 0,
                        borderWidth: 1,
                        borderColor: Colors.BACKGROUND,
                        height: 200,
                        width: "50%",
                        boxSizing: "border-box", // Ensure border-box behavior for correct width calculation
                        padding: 4, // Add padding to avoid border overlapping
                        position: "relative", // Ensure the position is relative for absolute positioning to work
                      }}
                    >
                      {
                        data?.view_by?.image ? (
                          <Image
                          source={{ uri: `${apiUrlImage}/${data?.view_by?.image}` }}
                          style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "cover",
                          }}
                        />
                        ):(
                          <Image
                          source={require('../../../assets/Avatar.jpg')}
                          style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "cover",
                          }}
                        />
                        )
                      }
                     
                      <Text
                        style={{
                          color: "white",
                          position: "absolute",
                          bottom: 25,
                          left: 10,
                        }}
                      >
                        {data?.view_by?.display_name}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          position: "absolute",
                          bottom: 5,
                          left: 10,
                          fontSize: 10,
                          fontFamily: "appfont-light",
                          alignContent: "center",
                          textAlign: "center",
                          alignItems: "center",
                        }}
                      >
                        <AntDesign name="eyeo" size={12} color={Colors.WHITE} />{" "}
                        {formatDatea(data?.updated_at)}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          position: "absolute",
                          bottom: 5,
                          right: 10,
                          fontSize: 10,
                          fontFamily: "appfont-light",
                        }}
                      >
                        35 m away
                      </Text>
                    </TouchableOpacity>
                  );
                })}
            </View>
          </View>
        </ScrollView>
        )
      }
    
    </View>
  );
};

export default ViewedMeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.BACKGROUND },
  header: {
    flexDirection: "row",
    backgroundColor: Colors.BACKGROUND,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  headerText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontFamily: "appfont-medium",
  },
});
