import { SafeAreaView, StyleSheet, Text, View, ImageBackground, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import * as location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  const [currentLocation, setCurrentLocation] = useState("Loading Location ....");
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await location.hasServicesEnabledAsync();
    if (!enabled) {
      alert("Location Services not enabled.");
    } else {
      setLocationServicesEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied");
    }
    const { coords } = await location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode} ${item.country}`;
        setCurrentLocation(address);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.maintext}>Hi ! Sarvesh</Text>
      <View style={styles.box}>
        <MaterialIcons name="location-on" size={17} color="black" />
        <Text style={styles.subtext}>{currentLocation}</Text>
      </View>
      <ImageBackground
        source={require('../assets/waves.png')}
        style={styles.backImage}
      >
        <Text style={styles.imageText}>34,547,291</Text>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
  },
  maintext: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#57DDFB",
    paddingLeft: 10,
  },
  subtext: {
    fontSize: 14,
    color: "gray",
  },
  box: {
    overflow: "scroll",
    flexDirection: "row",
    gap: 3,
    paddingLeft: 10,
  },
  backImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get('window').width,
    height: 280,
    zIndex : 1 , 
  },
  imageText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    zIndex : 1 , 
  },
});
