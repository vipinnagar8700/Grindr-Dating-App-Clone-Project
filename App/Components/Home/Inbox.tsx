import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import Colors from "../HelperComponents/Colors";
import { AntDesign } from "@expo/vector-icons";
import { AllchatUsers } from "../../Api/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiUrlImage } from "../../Api/ApiUrl";
import { useFocusEffect } from '@react-navigation/native';

const Inbox = ({ navigation }) => {
  const handleChat = (userIdMain) => {
    navigation.navigate("ChatScreen", { userIdMain: userIdMain });
  };

  const [chatUsers, setChatUsers] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading status

  const formatLastSeen = (timestamp) => {
    const currentTime = new Date();
    const lastSeenTime = new Date(timestamp);
    const timeDifference = currentTime - lastSeenTime;

    // Convert milliseconds to minutes, hours, days, weeks, or months
    const minutes = Math.floor(timeDifference / (1000 * 60));
    if (minutes < 60) {
        return `${minutes} min ago`;
    }

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    if (hours < 24) {
        return `${hours} hr ago`;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    if (days < 7) {
        return `${days} days ago`;
    }

    const weeks = Math.floor(days / 7);
    if (weeks < 4) {
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }

    const months = Math.floor(days / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
};


  useEffect(() => {
    console.log("Inbox page loaded");
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    setLoading(true); // Start the spinner
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        const data = await AllchatUsers(userId);
        if (data) {
          setChatUsers(data?.data);
          setLoading(false); // Stop the spinner when data is fetched
        }
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Inbox</Text>
        {/* <AntDesign name="filter" size={24} color={Colors.BLACK} /> */}
      </View>

      <View style={styles.containerInbox}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.WHITE} />
        ) : (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {chatUsers && chatUsers.length > 0 ? (
    chatUsers.map((user, index) => (
                <TouchableOpacity
                  key={`${user.id}-${index}`}
                  style={styles.userItem}
                  onPress={() => handleChat(user?.id)}
                >
                  {user.image ? (
                    <Image
                      source={{ uri: `${apiUrlImage}/${user?.image}` }}
                      style={styles.avatar}
                    />
                  ) : (
                    <Image
                      source={require("../../../assets/Avatar.jpg")}
                      style={styles.avatar}
                    />
                  )}
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{user.display_name}</Text>
                    <Text style={styles.message}>{user.newMessage}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ color: Colors.WHITE,fontSize:10,fontFamily:'appfont-light' }}>{formatLastSeen(user?.last_seen)}</Text>
                    {user.newMessageCount !== 0 && (
                      <Text style={styles.time}>{user.newMessageCount}</Text>
                    )}
                  </View>
                </TouchableOpacity>
               ))
               ) : (
                 <View style={styles.noUserContainer}>
                   <Text style={styles.noUserText}>No user for chat</Text>
                 </View>
               )}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  noUserContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noUserText: {
    fontSize: 16,
    color: Colors.BLACK,
    fontFamily: 'appfont-medium',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    padding: 20,
  },
  containerInbox: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    padding: 0,
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    backgroundColor: Colors.BACKGROUND,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    color: Colors.BLACK,
    fontSize: 18,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.BLACK,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 2,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    color: Colors.BLACK,
    fontFamily: "appfont-medium",
  },
  message: {
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: "appfont-medium",
  },
  time: {
    fontSize: 12,
    color: Colors.WHITE,
    backgroundColor: "red",
    padding: 5,
    borderRadius: 50,marginTop:10
  },
});
