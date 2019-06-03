import React from 'react';
import {BaseScreen,LoadingApp} from 'component';
import {View,Text} from 'react-native';

export default class SplashScreen extends BaseScreen{
  goToMain=()=>{
       this.props.navigation.navigate('MainFlow');
  }
  goToLogin=()=>{
     this.props.navigation.navigate('AuthFlow');
  }
  checkFlow=()=>{
    if(this.props.isLogin) this.goToMain();
    else this.goToLogin();
  }
  componentDidMount(){
      setTimeout(this.checkFlow,2000);
  }

  render(){
    return (<LoadingApp/>);
  }
}
