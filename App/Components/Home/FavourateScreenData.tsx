import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Colors from "../HelperComponents/Colors";
import { apiUrlImage } from "../../Api/ApiUrl";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserFavourate } from "../../Api/Api";

const FavourateScreenData = () => {
  const [UsersData, setUsersData] = useState("");
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const userId = await AsyncStorage.getItem("userId");

      if (userId) {
        try {
          const data = await UserFavourate(userId);
          setUsersData(data?.data);
        } catch (error) {
          console.log("Error fetching user data:", error);
        }
      } else {
        console.log("User not logged in!");
      }
    };

    checkUserLoggedIn();
  }, []);

  const navigation = useNavigation();
  const SingleUserProfile = (userId) => {
    navigation.navigate("SingleUserProfile", { userId: userId });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          {UsersData &&
            UsersData?.map((image, index) => {
              // Calculate the time difference for each user
              const messageTime = moment(image?.created_at);
              const currentTime = moment();
              const timeDifference = currentTime.diff(messageTime, "minutes");
              console.log(timeDifference,"timeDifference")
              let formattedTimeDifference;

              if (timeDifference < 60) {
                formattedTimeDifference = `${timeDifference} mins ago`;
              } else if (timeDifference < 1440) {
                formattedTimeDifference = `${Math.floor(
                  timeDifference / 60
                )} hrs ago`;
              } else if (timeDifference < 10080) {
                formattedTimeDifference = `${Math.floor(
                  timeDifference / 1440
                )} days ago`;
              } else if (timeDifference < 43800) {
                formattedTimeDifference = `${Math.floor(
                  timeDifference / 10080
                )} weeks ago`;
              } else if (timeDifference < 525600) {
                formattedTimeDifference = `${Math.floor(
                  timeDifference / 43800
                )} months ago`;
              } else {
                formattedTimeDifference = `${Math.floor(
                  timeDifference / 525600
                )} years ago`;
              }


              return (
                <TouchableOpacity
                  key={index}
                  style={styles.imageWrapper}
                  onPress={() => SingleUserProfile(image?.id)}
                >
                  {image?.friend?.image ? (
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

                  {image?.friend?.display_name ? (
                    <Text style={styles.imageText}>
                      {image?.friend?.display_name}
                    </Text>
                  ) : (
                    <Text style={styles.imageText}>User</Text>
                  )}

                  <Text style={styles.imageTexta}>{formattedTimeDifference}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default FavourateScreenData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    padding: 10,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageWrapper: {
    width: "49.90%", // Adjust as needed for spacing between images
    marginBottom: 2, // Adjust spacing between rows
    alignItems: "center",
  },
  image: {
    width: "100%", // Adjust as needed
    height: 150, // Adjust as needed
    borderRadius: 0,
  },
  imageText: {
    color: Colors.WHITE,
    position: "absolute",
    bottom: 20,
    left: 15,
    fontFamily: "appfont-light",
  },
  imageTexta: {
    color: Colors.WHITE,
    position: "absolute",
    bottom: 5,
    left: 15, 
    fontSize:12,
    fontFamily: "appfont-light",
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: "absolute",
    left: -105,
    bottom: 9,
  },
});
