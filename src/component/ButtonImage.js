import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import Context from "context";
export default class MyButtonImage extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[styles.touch, this.props.style]}
        onPress={this.props.onPress}
      >
        <Image
          source={this.props.iconSource}
          resizeMode="contain"
          style={styles.icon}
        />
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  touch: {
    height: 46,
    width: 46
  },
  icon: {
    flex: 1
  }
});
