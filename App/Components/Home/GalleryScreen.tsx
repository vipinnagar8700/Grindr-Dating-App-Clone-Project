import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import Colors from "../HelperComponents/Colors";
import { apiUrlImage } from "../../Api/ApiUrl";
import { useNavigation } from "@react-navigation/native";
import { UserDetailsApi } from "../../Api/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GalleryScreen = ({ UsersData, isLoadingA,ResetData }) => {
  const navigation = useNavigation();
  const [UsersMe, setUsersMe] = useState("");
  const [loggedInUserLatitude, setLoggedInUserLatitude] = useState(0);
  const [loggedInUserLongitude, setLoggedInUserLongitude] = useState(0);
  const [sortedUsersData, setSortedUsersData] = useState(UsersData);


  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const userId = await AsyncStorage.getItem("userId");

      if (userId) {
        try {
          const data = await UserDetailsApi(userId);
          setUsersMe(data?.data?.is_subscription || "");
          const userLatitude = parseFloat(data?.data?.latitude);
          const userLongitude = parseFloat(data?.data?.longitude);
          setLoggedInUserLatitude(userLatitude);
          setLoggedInUserLongitude(userLongitude);
        } catch (error) {
          console.log("Error fetching user data:", error);
        }
      } else {
        console.log("User not logged in!");
      }
    };

    checkUserLoggedIn();
  }, []);

  const SingleUserProfile = (userIdMain, index) => {
    if (index < 20) {
      navigation.navigate("SingleUserProfile", { userIdMain: userIdMain });
    } else {
      navigation.navigate("Store");
    }
  };

  useEffect(() => {
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 3958.8; // Earth's radius in miles
      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
          Math.cos(toRadians(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distance in miles
      return distance;
    };
  
    const toRadians = (degrees) => {
      return degrees * (Math.PI / 180);
    };
  
    const sortedData = UsersData.slice().map(user => {
      const latitude = parseFloat(user.latitude);
      const longitude = parseFloat(user.longitude);
      const distance = calculateDistance(loggedInUserLatitude, loggedInUserLongitude, latitude, longitude);
      const formattedDistance = isNaN(distance) ? '0 miles' : `${Math.round(distance)} miles`;
      return {
        ...user,
        distance: formattedDistance
      };
    }).sort((a, b) => {
      // Compare distances
      return a.distance - b.distance;
    });
    setSortedUsersData(sortedData);
  }, [loggedInUserLatitude, loggedInUserLongitude, UsersData]);
  

  

  return (
    <View style={styles.container}>
      {isLoadingA ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.WHITE} />
        </View>
      ) : (
        <>
          {UsersData.length === 0 ? (
            <View>
 <Text style={styles.noUsersText}>No users found.</Text>
 <TouchableOpacity onPress={ResetData} style={styles.resetButton}>
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
            </View>
           
          ) : (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.imageContainer}>
                {sortedUsersData.map((image, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.imageWrapper}
                    onPress={() => SingleUserProfile(image?.id, index)}
                  >
                    <View
                      style={[
                        styles.statusIndicator,
                        {
                          backgroundColor:
                            image?.online_status === "online"
                              ? "green"
                              : "red",
                        },
                      ]}
                    ></View>
                    {image?.image ? (
                      <Image
                        source={{ uri: `${apiUrlImage}/${image.image}` }}
                        style={styles.image}
                      />
                    ) : (
                      <Image
                        source={require("../../../assets/Avatar.jpg")}
                        style={styles.image}
                      />
                    )}
<Text style={styles.imageText}>
  {image.distance}
</Text>

                    {image?.is_subscription && (
                      <View style={styles.subscriptionBadge}>
                        <Text style={styles.subscriptionText}>Subscribed</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    paddingHorizontal: 10,
    paddingTop:10
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap", // Allow items to wrap to the next row
  },
  imageWrapper: {
    width: "33%",
    marginBottom: 2,
  },
  resetButton: {
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: Colors.YELLOW,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  resetButtonText: {
    color: Colors.WHITE,
    fontFamily: "appfont-medium",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 4,
  },
  imageText: {
    color: Colors.BLACK,
    position: "absolute",
    fontSize:12,
    bottom: 5,
    left: 25,
    fontFamily: "appfont-light",
  },
  statusIndicator: {
    width: 10,
  height: 10,
  borderRadius: 5,
  position: "absolute",
  bottom: 9, // Adjusted position from bottom to top
  right: 90, 
  zIndex:999
  },
  subscriptionBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  subscriptionText: {
    color: Colors.WHITE,
    fontWeight: "bold",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noUsersText: {
    alignSelf: "center",
    marginTop: 20,
    fontSize: 18,
    color: Colors.BLACK,
    fontFamily: "appfont-medium",
  },
});
