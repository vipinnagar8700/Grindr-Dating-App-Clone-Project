import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity,Modal } from "react-native";
import React ,{useEffect, useState} from "react";
import Colors from "../HelperComponents/Colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SubscriptionApi } from "../../Api/Api";


const StoreScreen = () => {
 


  useEffect(() => {
    const fetchData = async () => {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        try {
          const data = await SubscriptionApi(userId);
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
  }, []);

  return (
    <ImageBackground
      source={require("../../../assets/30.jpg")} // Change path to your image
      style={styles.background}
    >
      <ScrollView  contentContainerStyle={styles.scrollViewContent}>

      <View style={{alignItems:'center',}}>
        <Text
          style={{
            fontFamily: "appfont-medium",
            fontSize: 35,
            color: Colors.WHITE
          }}
        >
          Unlimited
        </Text>
        <View style={{ marginVertical: 10 }}>
          <View style={{flexDirection:'row',gap:20,margin:5}}><AntDesign name="team" size={20} color={Colors.WHITE} />
            <Text
              style={{
                fontFamily: "appfont-light",
                fontSize: 15,
                color: Colors.WHITE,
              }}
            >
              Unlimited Profiles
            </Text>
          </View>
          <View style={{flexDirection:'row',gap:20,margin:5}}>
          <MaterialCommunityIcons name="advertisements-off" size={20} color={Colors.WHITE} />
            <Text
              style={{
                fontFamily: "appfont-light",
                fontSize: 15,
                color: Colors.WHITE,
              }}
            >
              No 3rd party ads
            </Text>
          </View>
          <View style={{flexDirection:'row',gap:20,margin:5}}><AntDesign name="eyeo" size={20} color={Colors.WHITE} />
            <Text
              style={{
                fontFamily: "appfont-light",
                fontSize: 15,
                color: Colors.WHITE,
              }}
            >
              Viewed Me
            </Text>
          </View>
          <View style={{flexDirection:'row',gap:20,margin:5}}><AntDesign name="filter" size={20} color={Colors.WHITE} />
            <Text
              style={{
                fontFamily: "appfont-light",
                fontSize: 15,
                color: Colors.WHITE,
              }}
            >
               advanced filters
            </Text>
          </View>
          <View style={{flexDirection:'row',gap:20,margin:5}}><FontAwesome name="photo" size={20} color={Colors.WHITE} />
            <Text
              style={{
                fontFamily: "appfont-light",
                fontSize: 15,
                color: Colors.WHITE,
              }}
            >
              Multiple Albumbs
            </Text>
          </View>
        </View>
      </View>
      </ScrollView>

      <View style={{flex:1,backgroundColor:Colors.WHITE,borderTopRightRadius:15,borderTopLeftRadius:15,padding:20,backgroundColor:Colors.BACKGROUND,gap:20,paddingTop:30}}>
        <TouchableOpacity style={{padding:10,flexDirection:'row',width:'100%',justifyContent:'space-between',borderColor:Colors.WHITE,borderWidth:1,borderRadius:10}}>
          <Text style={{fontFamily:'appfont-light',fontSize:20,color:Colors.WHITE}}>1 Weeks</Text>
         <Text style={{fontFamily:'appfont-light',fontSize:20,color:Colors.WHITE}}>$ 688.00</Text>
         </TouchableOpacity>
         <TouchableOpacity style={{padding:10,flexDirection:'row',width:'100%',justifyContent:'space-between',borderColor:Colors.WHITE,borderWidth:1,borderRadius:10}}>
          <Text style={{fontFamily:'appfont-light',fontSize:20,color:Colors.WHITE}}>1 Month</Text>
         <Text style={{fontFamily:'appfont-light',fontSize:20,color:Colors.WHITE}}>$ 688.00</Text>
         </TouchableOpacity>
         <TouchableOpacity style={{padding:10,flexDirection:'row',width:'100%',justifyContent:'space-between',borderColor:Colors.WHITE,borderWidth:1,borderRadius:10}}>
          <Text style={{fontFamily:'appfont-light',fontSize:20,color:Colors.WHITE}}>3 Months</Text>
         <Text style={{fontFamily:'appfont-light',fontSize:20,color:Colors.WHITE}}>$ 688.00</Text>
         </TouchableOpacity>
         <View style={{ padding: 16 }}>
                   
         <TouchableOpacity style={{padding:10,width:'100%',borderColor:Colors.YELLOW,borderWidth:1,borderRadius:10,alignItems:'center',backgroundColor:Colors.YELLOW}}>
         <Text style={{fontFamily:'appfont-light',fontSize:20,color:Colors.WHITE}}>Pay</Text>
         </TouchableOpacity>
                </View>
      </View>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  
  scrollViewContent:{
    flex:1,justifyContent:'center',alignItems:'center',paddingVertical:60,
  }
});

export default StoreScreen;
