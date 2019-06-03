import image from "image";
import color from "./color";
import strings from './String';
import Style from './Style';
export default (resource = {
  strings: strings,
  colors: color,
  images: image,
  styles: Style,
  sounds: {},
  fonts: {}
});
