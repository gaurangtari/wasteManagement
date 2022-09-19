import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const InfoTile = ({ cardTitle, onPress, bgColor, borderColor, titleColor }) => {
  return (
    <Pressable
      style={[
        styles.card,
        { backgroundColor: bgColor, borderColor: borderColor },
      ]}
      onPress={onPress}
    >
      <View style={[styles.titleContainer]}>
        <Text style={[styles.titleText, { color: "black" }]}>{cardTitle}</Text>
      </View>
      <View>
        <Text>More details</Text>
      </View>
    </Pressable>
  );
};

export default InfoTile;

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    elevation: 4,
    height: 150,
    width: 165,
    margin: 10,
    borderWidth: 2,
  },
  titleText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
