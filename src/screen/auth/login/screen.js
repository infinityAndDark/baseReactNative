import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  BaseScreen,
  TextInput,
  Button,
  ButtonImage,
  ButtonText,
  ModalConfirm,
  HandleBack,
  DismissKeyboardView
} from "component";
import Context from "context";
import Util from "util";

import FingerprintScanner from "react-native-fingerprint-scanner";
import FingerprintPopup from "./FingerprintPopup";

export default class LoginScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      errorMessage: undefined,
      popupShowed: false,
      modalExitVisible: false
    };
  }
  handleFingerprintShowed = () => {
    this.setState({ ...this.state, popupShowed: true });
  };
  hideFingerprint = () => {
    this.setState({ ...this.state, popupShowed: false });
  };

  handleFingerprintDismissed = isCorrectFingerprint => {
    this.setState({
      ...this.state,
      popupShowed: false,
      isCorrectFingerprint: isCorrectFingerprint
    });
  };
  componentDidMount() {
    FingerprintScanner.isSensorAvailable().catch(error =>
      this.setState({
        ...this.state,
        errorMessage: error.message
      })
    );
  }

  goToMain = () => {
    this.props.navigation.navigate("MainFlow");
  };
  goToForgot = () => {
    Context.application.showMsg(Context.getString("login_button_forgot"));
  };
  changeLanguage = () => {
    let currentLang = Context.getLanguage();
    if (currentLang === "en") currentLang = "vi";
    else currentLang = "en";
    Context.application.changeLanguage(currentLang);
  };
  goToRegister = () => {
    Context.application.showMsg(Context.getString("hello", "Thọ"));
  };
  login = () => {
    if (this.state.isCorrectFingerprint !== "OK") {
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
    }

    Context.application.showLoading();
    this.props.login(this.state.userName, this.state.password);
  };
  componentDidUpdate() {
    if (this.state.isCorrectFingerprint === "OK") {
      this.login();
    }
    if (this.props.isLogin) {
      Context.application.hideLoading();
      this.goToMain();
    }
  }

  showModalExit = () => {
    this.setState({
      ...this.state,
      modalExitVisible: true
    });
  };
  hideModalExit = () => {
    this.setState({
      ...this.state,
      modalExitVisible: false
    });
  };
  exitApp = () => {
    this.hideModalExit();
    Util.App.exitApp();
  };
  onBackPress = () => {
    if (this.state.popupShowed) this.hideFingerprint();
    else this.showModalExit();
    return true;
  };
  render() {
    const { errorMessage, popupShowed } = this.state;

    return (
      <HandleBack onBack={this.onBackPress}>
        <DismissKeyboardView>
          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 1.0 }}
            colors={["#F8E3DB", "#FFFFFF", "#E4FECF"]}
            style={styles.container}
          >
            <View style={{ flex: 1 }} />
            <Image
              source={Context.getImage("logo")}
              resizeMode="contain"
              style={styles.imageLogo}
            />
            <ButtonText
              style={styles.buttonLanguage}
              onPress={this.changeLanguage}
              textStyle={styles.textLanguage}
              title={Context.getString("login_button_language")}
            />
            <View style={{ flex: 0.5 }} />
            <TextInput
              ref="userName"
              onChangeText={text =>
                this.setState({ ...this.state, userName: text })
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
                this.setState({ ...this.state, password: text })
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
            <Text style={styles.textOr}>
              {Context.getString("login_text_or")}
            </Text>
            <ButtonImage
              style={styles.buttonFinger}
              onPress={this.handleFingerprintShowed}
              iconSource={Context.getImage("loginFingerprint")}
            />
            <View style={{ flex: 1 }} />
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
            <ModalConfirm
              content={Context.getString("app_exit_question")}
              isVisible={this.state.modalExitVisible}
              onAccept={this.exitApp}
              onCancel={this.hideModalExit}
            />
            {popupShowed && (
              <FingerprintPopup
                style={styles.popup}
                handlePopupDismissed={this.handleFingerprintDismissed}
              />
            )}
          </LinearGradient>
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
    flex: 1,
    backgroundColor: Context.getColor("background")
  },
  imageLogo: {
    alignSelf: "center",
    width: "65%",
    height: 60
  },
  textOr: {
    margin: 26,
    color: Context.getColor("textHint"),
    alignSelf: "center",
    alignContent: "center",
    textAlign: "center"
  },
  buttonFinger: {
    alignSelf: "center",
    width: 70,
    height: 70
  },
  buttonText: {
    fontWeight: "400",
    color: Context.getColor("primary")
  },
  popup: {
    width: Util.App.screen.width * 0.7
  },
  buttonLanguage: {
    alignSelf: "center",
    marginBottom: 15
  },
  textLanguage: {
    fontWeight: "400",
    color: Context.getColor("textHint"),
    textDecorationLine: "underline"
  }
});
