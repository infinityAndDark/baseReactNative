import RNRestart from "react-native-restart";
import RNExitApp from "react-native-exit-app";
import { Dimensions } from "react-native";

export default class App {
  static restartApp = () => {
    RNRestart.Restart();
  };
  static exitApp = () => {
    RNExitApp.exitApp();
  };
  static screen = {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  };
}
