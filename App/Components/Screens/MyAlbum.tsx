import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../HelperComponents/Colors";
import { TextInput } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { DeleteUploadGallery, SingleUser, UpdateGalleryImages, UserDetailsApi } from "../../Api/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiUrlImage } from "../../Api/ApiUrl";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker

const MyAlbum = ({ navigation }) => {
  const [albumName, setAlbumName] = useState("");
  const [albumImage, setAlbumImage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    // Request permissions for accessing camera and media library
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library is required!");
      }
    })();
  }, []);

  const handleTakePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setAlbumImage(result.assets[0].uri);
      uploadImages(userId, result.assets[0].uri);
    }
  };

  const handleMediaLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setAlbumImage(result.assets[0].uri);
      uploadImages(userId, result.assets[0].uri);
    }
  };

  const [user, SetUser] = useState(null);
  console.log(user)
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      // Check if user ID and token exist in AsyncStorage
      const userId = await AsyncStorage.getItem("userId");
      setUserId(userId);
      if (userId) {
        try {
          const data = await UserDetailsApi(userId); // Wait for the promise to resolve
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
  }, [count]);

  const uploadImages = async (userId, albumImage) => {
    try {
      const response = await UpdateGalleryImages(userId, albumImage);
      console.log("Images uploaded:", response);
      if (response.success) {
        setCount(count + 1);
      }
      // Here you can handle success or error response accordingly
    } catch (error) {
      console.log("Error uploading images:", error);
    }
  };

  const handleDeleteImage = async (id) => {
    // Make sure user.gallery is an array

    try {
      const data = DeleteUploadGallery(id, userId);
      if (data) {
        console.log(data)
        setCount(count + 1)
      }
    } catch (error) {
      console.log("Error deleting image:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Create Album</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={24} color={Colors.WHITE} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {user?.gallery?.length > 0 ? (
          <>{/* Content to render when the condition is true */}</>
        ) : (
          <>
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Text style={styles.headerTexta}>
                Add a photo to start your album
              </Text>
            </View>
            <View
              style={{
                padding: 20,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {user?.image && user?.image ? (
                <Image
                  source={{ uri: `${apiUrlImage}/${user?.image}` }}
                  style={{ width: 150, height: 200, borderRadius: 5 }}
                />
              ) : (
                <Image
                  source={require("../../../assets/Avatar.jpg")}
                  style={{ width: 40, height: 40, borderRadius: 5 }}
                />
              )}

              <View style={{ padding: 10, width: "60%" }}>
                <TextInput
                  style={{
                    color: Colors.WHITE,
                  }}
                  placeholder={user?.display_name}
                  placeholderTextColor={Colors.YELLOW}
                  readOnly
                />
                <Text style={styles.headerTextaaa}>
                  {user?.gallery?.length} images
                </Text>
              </View>
            </View>
          </>
        )}

        <View style={styles.imageContainer}>
          {user?.gallery.map((data, index) => {
            return (
              <View key={index} style={styles.imageWrapper}>
                <Image
                  source={{ uri: `${data?.image_path}` }}
                  style={styles.image}
                />
                <TouchableOpacity
                  style={styles.deleteIcon}
                  onPress={() => handleDeleteImage(data.id)}
                >
                  <AntDesign name="delete" size={15} color={Colors.YELLOW} />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <TouchableOpacity
          onPress={handleTakePhoto}
          style={{
            alignItems: "center",
            borderColor: Colors.BLACK,
            borderWidth: 1,
            padding: 10,
            borderRadius: 20,
            margin: 20,
            flexDirection: "row",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <MaterialIcons name="photo-camera" size={24} color={Colors.WHITE} />
          <Text style={styles.Button}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleMediaLibrary}
          style={{
            alignItems: "center",
            borderColor: Colors.BLACK,
            borderWidth: 1,
            padding: 10,
            borderRadius: 20,
            marginVertical: 5,
            marginHorizontal: 20,
            flexDirection: "row",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <MaterialIcons name="perm-media" size={24} color={Colors.WHITE} />
          <Text style={styles.Button}>Media Library</Text>
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>What's an Album?</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyAlbum;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  header: {
    flexDirection: "row",
    backgroundColor: Colors.BACKGROUND,
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontFamily: "appfont-medium",
  },
  headerTexta: {
    color: Colors.WHITE,
    fontSize: 20,
    fontFamily: "appfont-medium",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
  },
  imageWrapper: {
    position: "relative",
    width: "31%",
    height: 100,
    borderRadius: 5,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  deleteIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  Button: {
    color: Colors.WHITE,
    fontSize: 15,
    fontFamily: "appfont-light",
  },
  headerTextaaa: {
    color: Colors.BLACK,
    fontSize: 11,
    fontFamily: "appfont-light",
    marginTop: 5,
  },
  infoContainer: {
    marginVertical: 20,
    left: "50%",
    transform: [{ translateX: -50 }],
  },
  infoText: {
    color: Colors.YELLOW,
    fontFamily: "appfont-medium",
    fontSize: 15,
  },
});

