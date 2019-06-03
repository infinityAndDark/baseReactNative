import BaseScreen from "component/BaseScreen";
import React from "react";
import { StyleSheet, Image, View, Dimensions, Text } from "react-native";
const win = Dimensions.get("window");
import Context from "context";

export default class LoadingApp extends BaseScreen {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={Context.getImage("logo")}
          resizeMode="contain"
          style={styles.imageLogo}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Context.getColor("background")
  },
  imageLogo: {
    width: "55%"
  }
});
