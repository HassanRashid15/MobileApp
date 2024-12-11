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

const Signup = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });
    return () => listener.remove();
  }, []);

  const validateForm = () => {
    let isValid = true;

    // Reset errors
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Validate first name
    if (!firstName || firstName.length < 2) {
      setFirstNameError("First name must be at least 2 characters.");
      isValid = false;
    }

    // Validate last name
    if (!lastName || lastName.length < 2) {
      setLastNameError("Last name must be at least 2 characters.");
      isValid = false;
    }

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

    // Validate confirm password
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Toast.show({
        type: "success",
        position: "top",
        text1: "Signup Successful",
        text2: "Welcome to the app!",
        visibilityTime: 3000,
      });
      // Redirect to Login page (if needed)
      navigation.navigate("Login");
    } else {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Signup Failed",
        text2: "Please check the errors and try again.",
        visibilityTime: 3000,
      });
    }
  };

  const lightStyles = {
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      backgroundColor: "#fff",
    },
    text: {
      color: "#333",
    },
    input: {
      backgroundColor: "#fff",
      borderColor: "#ccc",
    },
    errorText: {
      color: "red",
    },
    button: {
      backgroundColor: "#1e90ff",
      paddingVertical: 12,
      width: "50%",
      paddingHorizontal: 30,
      borderRadius: 5,
    },
    buttonText: {
      color: "#fff",
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
      backgroundColor: "#000",
    },
    text: {
      color: "#fff",
    },
    input: {
      backgroundColor: "#333",
      borderColor: "#555",
    },
    errorText: {
      color: "red",
    },
    button: {
      backgroundColor: "#1e90ff",
      paddingVertical: 12,
      paddingHorizontal: 30,
      width: "50%",
      borderRadius: 5,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
  };

  const currentStyles = theme === "dark" ? darkStyles : lightStyles;

  return (
    <View style={[styles.container, currentStyles.container]}>
      <Image
        source={require("../../assets/images/react-logo.png")}
        style={styles.image}
      />
      <Text style={[styles.heading, currentStyles.text]}>Sign Up</Text>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, currentStyles.text]}>First Name</Text>
        <TextInput
          style={[styles.input, currentStyles.input]}
          placeholder="Enter your first name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        {firstNameError ? (
          <Text style={currentStyles.errorText}>{firstNameError}</Text>
        ) : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, currentStyles.text]}>Last Name</Text>
        <TextInput
          style={[styles.input, currentStyles.input]}
          placeholder="Enter your last name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        {lastNameError ? (
          <Text style={currentStyles.errorText}>{lastNameError}</Text>
        ) : null}
      </View>

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
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
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

      <View style={styles.inputContainer}>
        <Text style={[styles.label, currentStyles.text]}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, currentStyles.input]}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={!isConfirmPasswordVisible}
          />
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
          >
            <Icon
              name={isConfirmPasswordVisible ? "eye-off" : "eye"}
              size={16}
              color={theme === "dark" ? "#fff" : "#333"}
            />
          </TouchableOpacity>
        </View>
        {confirmPasswordError ? (
          <Text style={currentStyles.errorText}>{confirmPasswordError}</Text>
        ) : null}
      </View>

      <TouchableOpacity style={currentStyles.button} onPress={handleSubmit}>
        <Text style={currentStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.registerLink}
      >
        <Text style={currentStyles.text}>Already have an account? Login</Text>
      </TouchableOpacity>

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
    width: "100%",
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
    width: "100%",
  },
  passwordContainer: {
    flexDirection: "row",
    width: "100%",
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

export default Signup;
