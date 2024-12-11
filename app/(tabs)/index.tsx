import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

const Index = () => {
  const [showSecondLayout, setShowSecondLayout] = useState(false);
  const firstLayoutAnim = useRef(new Animated.Value(0)).current;
  const secondLayoutHeight = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation(); // Using navigation to navigate to the tabs

  const handlePress = () => {
    // Animate the first layout to swipe up and disappear
    Animated.timing(firstLayoutAnim, {
      toValue: -height, // Moves the first layout off-screen (swipe up)
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Animate the second layout to expand to full screen height
    Animated.timing(secondLayoutHeight, {
      toValue: height, // Expand the second layout to full screen height
      duration: 1500,
      useNativeDriver: false,
    }).start();

    // Show the second layout and navigate to the tabs after the animation completes
    setTimeout(() => {
      setShowSecondLayout(true);

      // Navigate to the "Tabs" screen after the animation
      navigation.replace("Tabs"); // Replace the current screen with the Tabs screen
    }, 1350); // Wait for the animation to finish
  };

  return (
    <View style={styles.container}>
      {/* First Layout (Animated View) */}
      <Animated.View
        style={[
          styles.layout,
          { transform: [{ translateY: firstLayoutAnim }] },
        ]}
      >
        <Text style={styles.text}>First Layout</Text>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text style={styles.buttonText}>Click Me</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Second Layout (Animated View) */}
      {showSecondLayout && (
        <Animated.View
          style={[
            styles.layout,
            {
              height: secondLayoutHeight,
              backgroundColor: "#2196F3", // Different color for second layout
            },
          ]}
        >
          <Text style={styles.text}>Second Layout</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  layout: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", // Stack layouts on top of each other
    padding: 20,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FF5722",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Index;
