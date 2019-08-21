import Resource from "resource";
import { Dimensions } from "react-native";
const win = Dimensions.get("window");

export default class Context {
  static application;
  static res = Resource;
  static style = Resource.styles;
  static getLanguage() {
    return this.res.strings.getLanguage();
  }
  static setLanguage(key) {
    return this.res.strings.setLanguage(key);
  }
  static getString(key, ...params) {
    return this.res.strings.get(key, ...params);
  }
  static getColor(key) {
    return this.res.colors[key];
  }
  static getFont(key) {
    return this.res.fonts[key];
  }
  static getImage(key) {
    return this.res.images[key];
  }
  static getSound(key) {
    return this.res.sounds[key];
  }
  static getWindow(){
    return win;
  }
}
