import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import React from "react";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import { Transition } from "react-native-reanimated";
import SplashScreen from "screen/splash";
import LoginScreen from "screen/auth/login";
import { withExitModal } from "component";
import HomeScreen from "screen/main/home";

const MainStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  { headerMode: "none" }
);

const AuthStack = createStackNavigator(
  {
    Login: withExitModal(LoginScreen)
  },
  { headerMode: "none" }
);

const SwitchStack = createAnimatedSwitchNavigator(
  {
    Splash: SplashScreen,
    MainFlow: MainStack,
    AuthFlow: AuthStack
  },
  {
    transition: (
      <Transition.Together>
        <Transition.In type="fade" durationMs={300} />
      </Transition.Together>
    )
  }
);

export default createAppContainer(SwitchStack);
