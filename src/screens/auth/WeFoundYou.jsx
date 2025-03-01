// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   ImageBackground,
//   StyleSheet,
//   Dimensions,
//   ActivityIndicator,
//   Animated,
// } from "react-native";
// import Svg from "react-native-svg";
// import { TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// const { height, width } = Dimensions.get("window");

// const WeFoundYou = ({ navigation }) => {
//   const [loading, setLoading] = useState(true);
//   const [showContent, setShowContent] = useState(false);
//   const fadeAnim = useState(new Animated.Value(0))[0]; // Initial opacity is 0 (hidden)

//   useEffect(() => {
//     // Set a timer to stop loading after 2 seconds and show content
//     const setLongTimer = setTimeout(() => {
//       setLoading(false);
//       setShowContent(true);
//       // Fade-in the content after it's loaded
//       Animated.timing(fadeAnim, {
//         toValue: 1, // Fade to fully visible
//         duration: 1000, // 1 second fade-in
//         useNativeDriver: true,
//       }).start();
//     }, 2000);

//     // Set a timer to navigate to the next screen after 5 seconds
//     const navigateTimer = setTimeout(() => {
//       // Fade-out the content before navigating
//       Animated.timing(fadeAnim, {
//         toValue: 0, // Fade out the content
//         duration: 1000, // 1 second fade-out
//         useNativeDriver: true,
//       }).start();

//       setTimeout(() => {
//         navigation.navigate("LoginVerification"); // Navigate after fade-out
//       }, 1000); // Wait until the fade-out animation completes
//     }, 5000); // Navigate after 5 seconds

//     return () => {
//       clearTimeout(setLongTimer); // Clear the loading timer
//       clearTimeout(navigateTimer); // Clear the navigation timer
//     };
//   }, [navigation, fadeAnim]);

//   return (
    
//     <View style={styles.container}>
//       {/* Background Image covering only bottom half */}

// //header



//       <ImageBackground
//         source={require("../../../assets/bgimgrg.png")}
//         style={styles.topImage}
//       />

//       <ImageBackground
//         source={require("./image.jpg")}
//         style={styles.imageBackground}
//       >
//         {/* Uniform Bottom Overlay */}
//         <View style={styles.overlay}>
//           {loading ? (
//             // Show loading spinner for 2 seconds
//             <ActivityIndicator size="large" color="#32CD32" />
//           ) : showContent ? (
//             // Show actual content after loading is complete for 5 seconds
//             <Animated.View
//               style={{ opacity: fadeAnim, width: "100%", alignItems: "center" }}
//             >
//               <Svg
//                 width={50}
//                 height={30}
//                 style={{ marginBottom: 20, padding: 0 }}
//                 source={require("../../../assets/greenprofile.svg")}
//               />
//               <Text style={styles.title}>We Found You</Text>
//               <Text style={styles.description}>
//                 We have found your health card number in our system as a current
//                 patient, now you'll be redirected to the log in screen.
//               </Text>
//             </Animated.View>
//           ) : null}
//         </View>
//       </ImageBackground>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "flex-end",
//   },
//   imageBackground: {
//     width: width,
//     height: height * 0.5, // Cover only bottom half of the screen
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   topImage: {
//     width: width * 0.7,
//     alignSelf: "center",
//     height: height * 0.6, // Covers 60% of the screen
//     position: "absolute", // Keeps it fixed at the top
//     top: 0,
//   },
//   overlay: {
//     width: "100%",
//     height: "100%", // Ensure the overlay covers the entire bottom image
//     alignItems: "center",
//     padding: 20,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "normal",
//     color: "#32CD32",
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 16,
//     fontWeight: "300",
//     color: "white",
//     textAlign: "center",
//     marginBottom: 20,
//     paddingHorizontal: 30,
//   },
//   header: {
//     height: 100, // Increase height
//     backgroundColor: "white",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 15,
//   },
//   whiteBackground: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   iconContainer: {
//     width: 40, // Fixed width for icons
//     alignItems: "center", // Center icons
//   },
//   centerTextContainer: {
//     flex: 1, // Take up remaining space
//     justifyContent: "center", // Center vertically
//     alignItems: "center", // Center horizontally
//   },
//   centerText: {
//     fontSize: 40,
//     color: "black", // Make text visible
//   },
// });

// export default WeFoundYou;
import AuthHeader from "../../components/Header/AuthHeader";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Animated,
  TouchableOpacity,
} from "react-native";
import Svg from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

const WeFoundYou = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [currentStep,setCurrentStep] = useState(2);
  const fadeAnim = useState(new Animated.Value(0))[0]; // Initial opacity is 0 (hidden)

  // useEffect(() => {
  //   // Set a timer to stop loading after 2 seconds and show content
  //   const setLongTimer = setTimeout(() => {
  //     setLoading(false);
  //     setShowContent(true);
  //     // Fade-in the content after it's loaded
  //     Animated.timing(fadeAnim, {
  //       toValue: 1, // Fade to fully visible
  //       duration: 1000, // 1 second fade-in
  //       useNativeDriver: true,
  //     }).start();
  //   }, 2000);

  //   // Set a timer to navigate to the next screen after 5 seconds
  //   const navigateTimer = setTimeout(() => {
  //     // Fade-out the content before navigating
  //     Animated.timing(fadeAnim, {
  //       toValue: 0, // Fade out the content
  //       duration: 1000, // 1 second fade-out
  //       useNativeDriver: true,
  //     }
  //   ).start();

  //     setTimeout(() => {
  //       navigation.navigate("LoginVerification"); // Navigate after fade-out
  //     }, 1000); // Wait until the fade-out animation completes
  //   }, 5000); // Navigate after 5 seconds

  //   return () => {
  //     clearTimeout(setLongTimer); // Clear the loading timer
  //     clearTimeout(navigateTimer); // Clear the navigation timer
  //   };
  // }, [navigation, fadeAnim]);


  useEffect(() => {
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });
  
    const fadeOut = Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    });
  
    const showContentTimer = setTimeout(() => {
      setLoading(false);
      setShowContent(true);
      setCurrentStep(3);
      fadeIn.start();
    }, 2000);
  
    const navigateTimer = setTimeout(() => {
      fadeOut.start(() => navigation.navigate("LoginVerification"));
    }, 5000);
  
    return () => {
      clearTimeout(showContentTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigation]);
  


  return (
    <View style={styles.container}>
              <View style={styles.whiteBackground}>

      {/* Header */}
      <AuthHeader
        navigation={navigation}
        currentStep={currentStep} // You can dynamically set this value based on your logic
        totalSteps={4} // Total steps in your process
      />
      {/* Background Image covering only bottom half */}
       <View style={styles.topImageWrapper}>
                 
              <ImageBackground source={require('../../../assets/bgimgrg2.jpg')} style={styles.topImage} />
             </View>
        <View style={styles.bottomImageWrapper}>

      <ImageBackground
        source={require("./image.jpg")}
        style={styles.imageBackground}
      >
        {/* Uniform Bottom Overlay */}
        <View style={styles.overlay}>
          {loading ? (
            // Show loading spinner for 2 seconds
            <ActivityIndicator size="large" color="#32CD32" />
          ) : showContent ? (
            // Show actual content after loading is complete for 5 seconds
            <Animated.View
              style={{ opacity: fadeAnim, width: "100%", alignItems: "center" }}
            >
              <Svg
                width={50}
                height={30}
                style={{ marginBottom: 20, padding: 0 }}
                source={require("../../../assets/greenprofile.svg")}
              />
              <Text style={styles.title}>We Found You</Text>
              <Text style={styles.description}>
                We have found your health card number in our system as a current
                patient, now you'll be redirected to the log in screen.
              </Text>
            </Animated.View>
          ) : null}
      </View>
      </ImageBackground>
      </View>     
       </View>
       </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  topImageWrapper: {
    width: width * 0.9,
    height: height * 0.7, // 70% of screen height
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
    top:height*0.1,
  },
  topImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  bottomImageWrapper: {
    width: width ,
    height: height*0.50, // 50% of screen height
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
    position: "absolute",
    bottom: height *-0.1, // Overlaps 20% of the top image
    zIndex: 2,
  },
  bottomImage: {
    width: "100%",
    height: height*0.70,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "normal",
    color: "#32CD32",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: "300",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  header: {
    height: 100, // Increase height
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    position: "absolute", // Keep it fixed at the top
    top: 0,
    width: "100%",
    zIndex: 10, // Ensure it's above other elements
  },
  iconContainer: {
    width: 40, // Fixed width for icons
    alignItems: "center", // Center icons
  },
  centerTextContainer: {
    flex: 1, // Take up remaining space
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  centerText: {
    fontSize: 40,
    color: "black", // Make text visible
  },
  whiteBackground: {
    flex: 1,
    backgroundColor: "white",
  },
});


export default WeFoundYou;
