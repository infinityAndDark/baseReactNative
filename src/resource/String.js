import LocalizedStrings from "react-native-localization";

const data = {
  default: {
    app_loading: "Loading...",
    login_button_forgot: "Forgotten?",
    login_button_login: "Login",
    login_button_language: "Unknown",
    login_button_register: "Register",
    login_text_or: "Or",
    login_hint_user_name: "User name",
    login_hint_password: "Password",
    login_fingerprint_cancel: "Cancel",
    login_fingerprint_guide: "Scan your fingerprint\nto login",
    login_message_empty_user_name: "Please enter your user name",
    login_message_empty_password: "Please enter your password",
    message_title_notify: "Notification",
    modal_button_ok_default: "Ok",
    modal_button_cancel_default: "Cancel",
    modal_title_default: "Confirmation",
    home_button_logout: "Logout",
    home_logout_question: "Do you want to logout this account?",
    app_exit_question: "Do you want to exit app?",
    hello: "hello {0}"
  },
  en: {
    app_loading: "Loading...",
    login_button_forgot: "Forgot password?",
    login_button_login: "Login",
    login_button_language: "Tiếng Việt",
    login_button_register: "Register",
    login_text_or: "Or",
    login_hint_user_name: "User name",
    login_hint_password: "Password",
    login_fingerprint_cancel: "Cancel",
    login_fingerprint_guide: "Scan your fingerprint\nto login",
    login_message_empty_user_name: "Please enter your user name",
    login_message_empty_password: "Please enter your password",
    message_title_notify: "Notification",
    modal_button_ok_default: "Ok",
    modal_button_cancel_default: "Cancel",
    modal_title_default: "Confirmation",
    home_button_logout: "Logout",
    home_logout_question: "Do you want to logout this account?",
    app_exit_question: "Do you want to exit app?",
    hello: "hello {0}"
  },
  vi: {
    app_loading: "Đang tải...",
    login_button_forgot: "Quên mật khẩu?",
    login_button_login: "Đăng nhập",
    login_button_language: "English",
    login_button_register: "Đăng ký",
    login_text_or: "Hoặc",
    login_hint_user_name: "Tên đăng nhập",
    login_hint_password: "mật khẩu",
    login_fingerprint_cancel: "Huỷ bỏ",
    login_fingerprint_guide: "Quét vân tay để\nđăng nhập",
    login_message_empty_user_name: "Vui lòng điền tên đăng nhập",
    login_message_empty_password: "Vui lòng điền mật khẩu",
    message_title_notify: "Thông báo",
    modal_button_ok_default: "Đồng ý",
    modal_button_cancel_default: "Hủy bỏ",
    modal_title_default: "Xác nhận",
    home_button_logout: "Đăng xuất",
    home_logout_question: "Bạn có muốn đăng xuất khỏi tài khoản?",
    app_exit_question: "Bạn có muốn thoát ứng dụng?",
    hello: "hello {0}"
  }
};

const strings = new LocalizedStrings(data);

const get = (key, ...params) => {
  if (params.length !== 0) return strings.formatString(strings[key], ...params);
  else return strings[key];
};
const getLanguage = () => {
  return strings.getLanguage();
};
const setLanguage = key => {
  return strings.setLanguage(key);
};

export default {
  get,
  getLanguage,
  setLanguage
};
