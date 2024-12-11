import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/Ionicons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle password visibility

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

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/react-logo.png")}
        style={styles.image}
      />

      <Text style={styles.heading}>Login</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
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
              size={24}
              color="#333"
            />
          </TouchableOpacity>
        </View>
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
      </View>
      <Button title="Login" onPress={handleSubmit} />
      <Toast ref={(ref) => Toast.setRef(ref)} />
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
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
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
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default Login;
