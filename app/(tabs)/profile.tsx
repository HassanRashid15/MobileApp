import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Profile = ({ navigation }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchHeight = useRef(new Animated.Value(0)).current;

  const toggleSearchBar = () => {
    if (isSearchVisible) {
      Animated.timing(searchHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsSearchVisible(false));
    } else {
      setIsSearchVisible(true);
      Animated.timing(searchHeight, {
        toValue: 50,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSearchBar}>
          <Icon name="search-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Animated Search Bar */}
      {isSearchVisible && (
        <Animated.View style={[styles.searchBar, { height: searchHeight }]}>
          <TextInput
            placeholder="Search..."
            style={styles.searchInput}
            autoFocus={true}
          />
        </Animated.View>
      )}

      {/* Profile Info */}
      <Text style={styles.headerTitle}>My profile</Text>

      <View style={styles.profileInfo}>
        <Image
          source={{ uri: "https://example.com/profile-pic.jpg" }}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.profileName}>Matilda Brown</Text>
          <Text style={styles.profileEmail}>matildabrown@mail.com</Text>
        </View>
      </View>

      {/* Options List */}
      <ScrollView>
        {[
          {
            title: "My orders",
            subtitle: "Already have 12 orders",
            // navigateTo: "Order",
          },
          { title: "Shipping addresses", subtitle: "3 addresses" },
          { title: "Payment methods", subtitle: "Visa **34" },
          { title: "Promocodes", subtitle: "You have special promocodes" },
          { title: "My reviews", subtitle: "Reviews for 4 items" },
          { title: "Settings", subtitle: "Notifications, password" },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => {
              if (item.navigateTo) {
                navigation.navigate(item.navigateTo); // Ensure this matches the screen name
              }
            }}
          >
            <View>
              <Text style={styles.optionTitle}>{item.title}</Text>
              <Text style={styles.optionSubtitle}>{item.subtitle}</Text>
            </View>
            <Icon name="chevron-forward-outline" size={20} color="#ccc" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  searchBar: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    justifyContent: "center",
    overflow: "hidden",
  },
  searchInput: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileEmail: {
    color: "#888",
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  optionSubtitle: {
    color: "#888",
  },
});

export default Profile;
