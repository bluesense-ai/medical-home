import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useAuthStore } from "../../store/useAuthStore";
import { useProvider } from "../../store/useProvider";
import { saveAuthToken } from "../../api/eventService";
import axios from "axios";

const { height, width } = Dimensions.get("window");

// API base URL - from OpenAPI documentation
const API_BASE_URL = 'https://sandbox-backend.medicalhome.cloud/api';

// Hardcoded token provided by your colleague
const HARDCODED_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ3MWRjOGE5LWMzZGQtNGNhZS1hZTQ2LTk4MzBlMjdhY2RjOSIsImVtYWlsIjoiaWxrZXJAYmx1ZXNlbnNlLmFpIiwicGhvbmVfbnVtYmVyIjoiKzkwNTM1MjQ4MzgwMCIsInVzZXJuYW1lIjoiaWxrZXIiLCJmaXJzdF9uYW1lIjoixLBsa2VyIiwibGFzdF9uYW1lIjoiR8O8emVsa29rYXIiLCJjcmVhdGVkQXQiOiIyMDI1LTAzLTA2VDA1OjMxOjQyLjU3OVoiLCJ1cGRhdGVkQXQiOiIyMDI1LTAzLTA2VDA1OjMxOjQyLjU3OVoiLCJ0eXBlIjoiYWRtaW4iLCJpYXQiOjE3NDEyMzkyNjMsImV4cCI6MTc0MTMyNTY2M30.MnGo1p5EsBjNxyGK69tvOvV7ouI_EY1QGu5nVwvkmPA";

const LoginSwitchVerification = ({ navigation, route }) => {
  const provider = useProvider((state) => state.provider);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const [accessCode, setAccessCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Get username and provider type from route params
  const { username = "providerUser", providerType = "provider" } = route.params || {};

  // Use the hardcoded token directly
  const useHardcodedToken = async () => {
    try {
      setIsLoading(true);
      
      // Save the hardcoded token
      await saveAuthToken(HARDCODED_TOKEN);
      console.log('Using hardcoded token for authentication');
      
      // Update authentication state
      setIsAuthenticated(true);
      
      // Navigate to the appropriate screen
      if (provider === "doctor") {
        navigation.navigate("DashboardScreen");
      } else {
        navigation.navigate("MainTabs");
      }
    } catch (error) {
      console.error('Error using hardcoded token:', error);
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  async function handleLogin() {
    if (!accessCode.trim()) {
      setError("Please enter your access code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      console.log(`Verifying access code for username: ${username}, code: ${accessCode}`);
      
      // Determine the correct endpoint based on provider type
      let endpoint = '/auth/verify-verification-code-provider';
      if (providerType !== "provider") {
        endpoint = '/auth/verify-access-code-admin';
      }
      
      console.log(`Making POST request to: ${API_BASE_URL}${endpoint}`);
      
      // Real API authentication call to verify the access code
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, {
        username: username,
        accessCode: accessCode,
        otpChannel: "sms" // Default to SMS, could be made configurable
      });
      
      console.log('API Response:', response.data);
      
      if (response.data && response.data.success && response.data.data && response.data.data.access_token) {
        // Save the real token from the API
        const token = response.data.data.access_token;
        console.log('Received token:', token.substring(0, 10) + '...');
        
        await saveAuthToken(token);
        console.log('Token saved successfully');
        
        // Update authentication state
        setIsAuthenticated(true);
        
        // Navigate to the appropriate screen
        if (provider === "doctor") {
          navigation.navigate("DashboardScreen");
        } else {
          navigation.navigate("MainTabs");
        }
      } else {
        console.error('Invalid response structure:', response.data);
        setError("Invalid response from server. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      
      if (err.response) {
        console.error('Error status:', err.response.status);
        console.error('Error details:', err.response.data);
        
        if (err.response.status === 401) {
          setError("Invalid access code. Please try again.");
        } else if (err.response.status === 403) {
          setError("Invalid credentials. Please check your username.");
        } else if (err.response.status === 400) {
          setError(err.response.data?.error || "Bad request. Please check your input.");
        } else {
          setError(err.response.data?.message || "Authentication failed. Please try again.");
        }
      } else if (err.request) {
        console.error('No response received');
        setError("No response from server. Please check your connection.");
      } else {
        console.error('Request setup error:', err.message);
        setError("Network error. Please check your connection.");
      }
      
      // Fallback to mock token for development/testing
      if (__DEV__) {
        console.log("Development mode: Using mock token");
        Alert.alert(
          "Authentication Options",
          "API call failed. Choose an option to proceed.",
          [
            {
              text: "Use Hardcoded Token",
              onPress: useHardcodedToken
            },
            {
              text: "Cancel",
              style: "cancel"
            }
          ]
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>{/* Content goes here */}</View>
      {/* Card at the bottom of the screen */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Verification</Text>
        <Text style={styles.creditSubTitle}>
          Find your access code via SMS in your phone or via email
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Access Code"
          placeholderTextColor="grey"
          value={accessCode}
          onChangeText={setAccessCode}
          keyboardType="numeric"
          maxLength={6}
        />
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <Pressable 
          style={styles.submitButton} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.submitButtonText}>Submit</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242222",
  },
  imageContainer: {
    flex: 1,
    alignSelf: "center",
    width: width * 0.9,
    marginTop: 150,
    borderRadius: 15,
    overflow: "hidden",
    opacity: 0.6,
    backgroundColor: "white",
  },
  card: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: height * 0.4,
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 10,
    paddingBottom: 15,
  },
  creditSubTitle: {
    width: width * 0.8,
    fontSize: 18,
    textAlign: "center",
    paddingBottom: 45,
  },
  input: {
    alignContent: "center",
    width: "90%",
    height: 60,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "black",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "black",
  },
  submitButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#32CD32",
    justifyContent: "center",
    borderRadius: 15,
    alignItems: "center",
    marginTop: 35,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "#FF6B6B",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default LoginSwitchVerification;
