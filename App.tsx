import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import LoadingScreen from "./src/screens/Loading/LoadingScreen";
import Router from "./src/navigation/Router";
import useCalendarStore from './src/store/useCalendarStore';
import { saveAuthToken } from './src/api/eventService';

// Hardcoded token provided by your colleague
const HARDCODED_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ3MWRjOGE5LWMzZGQtNGNhZS1hZTQ2LTk4MzBlMjdhY2RjOSIsImVtYWlsIjoiaWxrZXJAYmx1ZXNlbnNlLmFpIiwicGhvbmVfbnVtYmVyIjoiKzkwNTM1MjQ4MzgwMCIsInVzZXJuYW1lIjoiaWxrZXIiLCJmaXJzdF9uYW1lIjoixLBsa2VyIiwibGFzdF9uYW1lIjoiR8O8emVsa29rYXIiLCJjcmVhdGVkQXQiOiIyMDI1LTAzLTA2VDA1OjMxOjQyLjU3OVoiLCJ1cGRhdGVkQXQiOiIyMDI1LTAzLTA2VDA1OjMxOjQyLjU3OVoiLCJ0eXBlIjoiYWRtaW4iLCJpYXQiOjE3NDEyMzkyNjMsImV4cCI6MTc0MTMyNTY2M30.MnGo1p5EsBjNxyGK69tvOvV7ouI_EY1QGu5nVwvkmPA";

// Create a client
const queryClient = new QueryClient();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const fetchEvents = useCalendarStore(state => state.fetchEvents);

  const loadAssets = async () => {
    try {
      const imageAssets = [
        require("./assets/images/welcome.png"),
        require("./assets/images/logo.png"),
      ];

      const loadImages = imageAssets.map((image) => {
        return Asset.fromModule(image).downloadAsync();
      });

      // Save the hardcoded token to ensure we're authenticated
      await saveAuthToken(HARDCODED_TOKEN);
      console.log('Hardcoded token saved on app start');

      // Load events from API
      await fetchEvents();
      console.log('Events loaded on app start');

      await Promise.all(loadImages);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    } catch (error) {
      console.warn("Error during loading:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAssets();
  }, []);

  if (isLoading) {
    return (
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <LoadingScreen />
          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Router />
          <StatusBar style="auto" />
        </NavigationContainer>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
