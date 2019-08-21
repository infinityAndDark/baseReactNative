import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform
} from "react-native";
import Context from "context";
export default class HeaderView extends Component {
  renderLeftIcon = () => {
    return (
      <Image
        source={this.props.leftIcon ? leftIcon : undefined}
        style={styles.leftIcon}
      />
    );
  };
  renderRightIcon = () => {
    return <Image source={this.props.rightIcon} style={styles.rightIcon} />;
  };
  getTitleStyle = colorTitle => {
    if (colorTitle) return [styles.title, { color: colorTitle }];
    else return styles.title;
  };
  getContainerStyle = () => {
    return styles.container;
  };
  render() {
    let leftOnPress = this.props.navigation
      ? this.props.navigation.goBack
      : undefined;
    let leftIcon = this.props.navigation ? this.renderLeftIcon() : undefined;
    let title = this.props.title ? this.props.title : "";
    let rightIcon = this.props.rightIcon ? this.renderRightIcon() : undefined;
    return (
      <View style={this.getContainerStyle()}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <Image
          source={Context.getImage("headerBottom")}
          resizeMode="stretch"
          style={styles.imageBack}
        />
        <View style={styles.statusBarSpace} />
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.touch}
            onPress={() => {
              leftOnPress ? leftOnPress() : undefined;
            }}
          >
            {leftIcon}
          </TouchableOpacity>
          <Text style={this.getTitleStyle(this.props.colorTitle)}>
            {title}
          </Text>
          <TouchableOpacity
            style={styles.touch}
            onPress={() => {
              this.props.rightOnPress
                ? this.props.rightOnPress()
                : undefined;
            }}
          >
            {rightIcon}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Context.getColor("primary"),
    // borderBottomLeftRadius:7,
    // borderBottomRightRadius:7,
    // ...Platform.select({
    //   android: {
    //     elevation: 2
    //   },
    //   ios: {
    //     shadowColor: "#000",
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.7,
    //     shadowRadius: 2
    //   }
    // })
  },
  statusBarSpace: {
    height: StatusBar.currentHeight
  },
  content: {
    height: 44,
    width: "100%",
    flexDirection: "row"
  },
  leftIcon: {
    resizeMode: "contain",
    width: 20,
    height: 20
  },
  rightIcon: {
    resizeMode: "contain",
    width: 20,
    height: 20
  },
  title: {
    flex: 1,
    height: 44,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#FFF",
    fontSize: 18,
    fontWeight: "500"
  },
  touch: {
    width: 46,
    height: 46,
    justifyContent: "center",
    alignItems: "center"
  },
  imageBack: {
    width: Context.getWindow().width,
    height: (Context.getWindow().width / 1125) * 98,
    position: "absolute",
    bottom: 0
  }
});
