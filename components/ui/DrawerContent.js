import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Ionicons } from "@expo/vector-icons";

const DrawerContent = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View>
          <Image
            source={require("../../assets/images/Logo.jpg")}
            style={{
              height: 60,
              width: 60,
              borderRadius: 40,
              marginBottom: 10,
            }}
          />
        </View>
        <View style={styles.userInfo}>
          <View>
            <Ionicons name="person-circle-outline" size={50} />
          </View>
          <View style={styles.userInfoText}>
            <Text>userName</Text>
            <Text>user@email.com</Text>
          </View>
          <View>
            <Ionicons name="caret-forward-outline" size={30} />
          </View>
        </View>
        <View style={styles.items}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Terms & Conditions</Text>
      </View>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerItems: {
    borderWidth: 1,
    marginVertical: 4,
  },

  userInfo: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
  },
  userInfoText: {
    margin: 10,
    paddingVertical: 10,
  },
  items: {},
  footer: {
    borderTopWidth: 2,
    borderTopColor: "#ccc",
    flex: 0.2,
    alignItems: "center",
  },
  footerText: {
    margin: 10,
  },
});
