import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  BaseScreen,
  TextInput,
  Button,
  ButtonText,
  HandleBack,
  DismissKeyboardView,
  Header
} from "component";
import Context from "context";

export default class LoginScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      errorMessage: undefined
    };
  }

  goToMain = () => {
    this.props.navigation.navigate("MainFlow");
  };
  goToForgot = () => {
    Context.application.showMsg(Context.getString("login_button_forgot"));
  };
  goToRegister = () => {
    Context.application.showMsg(Context.getString("hello", "Thọ"));
  };
  login = () => {
    if (this.state.userName.length == 0) {
      Context.application.showMsg(
        Context.getString("login_message_empty_user_name"),
        "danger"
      );
      return;
    }
    if (this.state.password.length == 0) {
      Context.application.showMsg(
        Context.getString("login_message_empty_password"),
        "danger"
      );
      return;
    }

    Context.application.showLoading();
    this.props.login(this.state.userName, this.state.password);
  };
  componentDidUpdate() {
    if (this.props.isLogin) {
      Context.application.hideLoading();
      this.goToMain();
    }
  }
  onBackPress = () => {
    if (!this.props.showModalExit) return false;
    this.props.showModalExit();
    return true;
  };
  renderButtonBottom = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <ButtonText
          onPress={this.goToRegister}
          textStyle={styles.buttonText}
          title={Context.getString("login_button_register")}
        />
        <ButtonText
          onPress={this.goToForgot}
          textStyle={styles.buttonText}
          title={Context.getString("login_button_forgot")}
        />
      </View>
    );
  };
  renderLogo = () => {
    return (
      <Image
        source={Context.getImage("logo")}
        resizeMode="contain"
        style={styles.imageLogo}
      />
    );
  };
  render() {
    const { errorMessage } = this.state;

    return (
      <HandleBack onBack={this.onBackPress}>
        <DismissKeyboardView>
          <Header title="Đăng nhập" navigation={this.props.navigation} />
          <View style={styles.container}>
            <Image
              style={{ flex: 1, position: "absolute" }}
              source={Context.getImage("loginBack")}
            />
            <View style={{ flex: 1 }} />
            {this.renderLogo()}
            <View style={{ flex: 0.5 }} />
            <TextInput
              ref="userName"
              onChangeText={text =>
                this.setState({
                  ...this.state,
                  userName: text
                })
              }
              value={this.state.userName}
              placeholder={Context.getString("login_hint_user_name")}
              placeholderTextColor={Context.getColor("textHint")}
              textColor={Context.getColor("text")}
              lineColor={Context.getColor("primary")}
            />
            <TextInput
              ref="password"
              onChangeText={text =>
                this.setState({
                  ...this.state,
                  password: text
                })
              }
              value={this.state.password}
              placeholder={Context.getString("login_hint_password")}
              password={true}
              secureTextEntry={true}
              style={{ marginTop: 16 }}
              placeholderTextColor={Context.getColor("textHint")}
              textColor={Context.getColor("text")}
              lineColor={Context.getColor("primary")}
            />
            <Button
              style={{ marginTop: 30 }}
              title={Context.getString("login_button_login")}
              onPress={this.login}
            />
            <View style={{ flex: 1 }} />
            {this.renderButtonBottom()}
          </View>
        </DismissKeyboardView>
      </HandleBack>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 20,
    paddingTop: 40,
    flex: 1
  },
  imageLogo: {
    alignSelf: "center",
    width: "65%",
    height: 60
  },
  buttonText: {
    fontWeight: "400",
    color: Context.getColor("primary")
  },
});
