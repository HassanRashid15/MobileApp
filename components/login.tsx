import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Appearance,
} from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/Ionicons";

const Login = ({ navigation }) => {
  // Add navigation prop to handle routing
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle password visibility
  const [theme, setTheme] = useState(Appearance.getColorScheme()); // Track theme (light or dark)

  // Detect system theme changes
  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });
    return () => listener.remove();
  }, []);

  // Function to validate email and password
  const validateForm = () => {
    let isValid = true;

    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Validate email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email || !emailPattern.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    // Validate password
    if (!password || password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const namePart = email.split("@")[0];
      const nameArray = namePart.replace(/[^a-zA-Z ]/g, "").split(" ");
      const formattedName = nameArray
        .map(
          (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        )
        .join(" ");

      Toast.show({
        type: "success",
        position: "top",
        text1: "Login Successful",
        text2: `Welcome ${formattedName} !`,
        visibilityTime: 3000,
      });
    } else {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Login Failed",
        text2: "Please check the errors and try again.",
        visibilityTime: 3000,
      });
    }
  };

  // Styles for dark and light themes
  const lightStyles = {
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      backgroundColor: "#fff",
    },
    text: {
      color: "#333", // Dark text for light mode
    },
    input: {
      backgroundColor: "#fff", // Light background for input in light mode
      borderColor: "#ccc", // Light border color
    },
    errorText: {
      color: "red",
    },
    button: {
      backgroundColor: "#1e90ff", // Blue background for dark theme
      paddingVertical: 12,
      width: "50%",
      paddingHorizontal: 30,
      borderRadius: 5,
    },
    buttonText: {
      color: "#fff", // White text for light theme
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
  };

  const darkStyles = {
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      backgroundColor: "#000", // Dark background for dark mode
    },
    text: {
      color: "#fff", // Light text for dark mode
    },
    input: {
      backgroundColor: "#333", // Dark background for input in dark mode
      borderColor: "#555", // Darker border color
    },
    errorText: {
      color: "red",
    },
    button: {
      backgroundColor: "#1e90ff", // Blue background for dark theme
      paddingVertical: 12,
      paddingHorizontal: 30,
      width: "50%",
      borderRadius: 5,
    },
    buttonText: {
      color: "#fff", // White text for dark theme
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
  };

  // Apply styles based on the current theme
  const currentStyles = theme === "dark" ? darkStyles : lightStyles;

  return (
    <View style={[styles.container, currentStyles.container]}>
      <Image
        source={require("../../assets/images/react-logo.png")}
        style={styles.image}
      />

      <Text style={[styles.heading, currentStyles.text]}>Login</Text>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, currentStyles.text]}>Email</Text>
        <TextInput
          style={[styles.input, currentStyles.input]}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        {emailError ? (
          <Text style={currentStyles.errorText}>{emailError}</Text>
        ) : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, currentStyles.text]}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, currentStyles.input]}
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!isPasswordVisible} // Toggle visibility
          />
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)} // Toggle password visibility
          >
            <Icon
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={16}
              color={theme === "dark" ? "#fff" : "#333"}
            />
          </TouchableOpacity>
        </View>
        {passwordError ? (
          <Text style={currentStyles.errorText}>{passwordError}</Text>
        ) : null}
      </View>

      {/* Custom login button */}
      <TouchableOpacity style={currentStyles.button} onPress={handleSubmit}>
        <Text style={currentStyles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Register link */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={styles.registerLink}
      >
        <Text style={currentStyles.text}>Don't have an account? Register</Text>
      </TouchableOpacity>

      {/* Toast Component */}
      <Toast />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%", // Ensure full width of the container
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    width: "100%", // Ensure the input takes 100% of the container width
  },
  passwordContainer: {
    flexDirection: "row",
    width: "100%", // Make sure the container spans 100% width
    alignItems: "center",
  },
  eyeIconContainer: {
    position: "absolute",
    right: 10,
    fontSize: 12,
  },
  errorText: {
    fontSize: 12,
    marginTop: 10,
  },
  registerLink: {
    marginTop: 15,
  },
});

export default Login;
