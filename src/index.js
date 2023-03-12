import React, { useState, useEffect } from "react";
import {
    ActivityIndicator,
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import * as location from "expo-location";
const openWeatherKey = "1f33270dda9129a9ff6da0dc07457f83";
let url = `http://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${openWeatherKey}`;

const Weather = () => {
  const [forecast, setForecast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const loadForecast = async () => {
    setRefreshing(true);
    const { status } = await location.requestBackgroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("permisison to access location was denied");
    }
    let location = await location.getCurrentPositionAsync({});
    const response = await fetch(
      url + `&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
    );
    const data = await response.json();

    if (!response.ok) {
      Alert.alert("Error, Something went wrong");
    }
    useEffect(() => {
      loadForecast();
    }, []);
    if (!forecast) {
      return (
        <SafeAreaView style={StyleSheet.loading}>
          <ActivityIndicator size='large'/>
        </SafeAreaView>
      );
    }
    const current=forecast.current.weather
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadForecast()}
          />
        }
        style={{ marginTop: 50 }}
      >
        <Text></Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Weather;
