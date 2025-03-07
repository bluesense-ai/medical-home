import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Text, Pressable, StyleSheet, StatusBar } from "react-native";
import { RootStackParamList } from "../../navigation/types";

const Home = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Pressable
        style={styles.button1}
        onPress={() => navigation.navigate("ProvideInformation")}
      >
        <Text>Click here to go</Text>
      </Pressable>
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button1: {
    height: 50,
    width: 150,
    backgroundColor: "#FFFFFF",
    borderColor: "black",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});

export default Home;
