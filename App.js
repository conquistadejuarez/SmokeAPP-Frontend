
import React, {useContext} from "react";
import { StyleSheet, Text, View, Image} from "react-native";
import * as Font from "expo-font";
import Store, { Context } from './context/Store';
import Reducer from "./context/Reducer";
import Navigator from './navigation/navigator';

export default class App extends React.Component {
  state = {
    isFontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      SemiBold: require("./src/fonts/Merriweather-Bold.ttf"),
      Medium: require("./src/fonts/Merriweather-Regular.ttf"),
      Regular: require("./src/fonts/Merriweather-Light.ttf"),
      InterBold: require("./src/fonts/static/Inter-SemiBold.ttf"),
      InterRegular: require("./src/fonts/static/Inter-Regular.ttf"),
      InterThin: require("./src/fonts/static/Inter-Medium.ttf"),
    });
    this.setState({ isFontLoaded: true });
  }

  render() {
    return this.state.isFontLoaded === true ? <Appl /> : null;
  }
}


function Appl() {


  return (
    <Store>
    <Navigator />
    </Store>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  

});
