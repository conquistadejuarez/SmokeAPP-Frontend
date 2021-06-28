import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../context/Store";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const commaNumber = require("comma-number");

const Progress = ({ step, steps, height }) => {
  const [width, setWidth] = React.useState(0);
  const animatedValue = React.useRef(new Animated.Value(-1000)).current;
  const reactive = React.useRef(new Animated.Value(-1000)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  React.useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [step, width]);

  return (
    <>
      {/*<Text style={{fontFamily:'Regular', fontSize: 12,}}>{step}/{steps}</Text> */}
      <View
        style={{
          height: 10,
          borderRadius: 100,
          overflow: "hidden",
          backgroundColor: "rgba(0,0,0,0.1)",
        }}
      >
        <Animated.View
          onLayout={(e) => {
            const newWidth = e.nativeEvent.layout.width;

            setWidth(newWidth);
          }}
          style={{
            height: 10,
            overflow: "hidden",
            borderRadius: 100,
            backgroundColor: "#98B279",
            width: "100%",
            position: "absolute",
            left: 0,
            top: 0,
            transform: [{ translateX: animatedValue }],
          }}
        />
      </View>
    </>
  );
};

const Stats = () => {
  const [state, dispatch] = useContext(Context);

  const [number, setNumber] = useState([]);
  const [money, setMoney] = useState([]);
  const [perDay, setPerDay] = useState([]);

  const myurl = "https://smokeapp.digitalcube.rs";

  let url2 = myurl + `/api/f2/CalcCigarettes/` + state.id_user;

  useEffect(() => {
    if (state.id_user !== "") {
      axios
        .get(url2)
        .then((response) => {
          setNumber(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [state.id_user]);

  let url3 = myurl + `/api/f3/CalcMoneyNotSpend/` + state.id_user;

  useEffect(() => {
    if (state.id_user !== "") {
      axios
        .get(url3)
        .then((r) => {
          setMoney(r.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [state.id_user]);

  let url4 = myurl + `/api/f4/CalcMoneyPerDay/` + state.id_user;

  useEffect(() => {
    if (state.id_user !== "") {
      axios
        .get(url4)
        .then((b) => {
          setPerDay(b.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [state.id_user]);

  const total = (perDay * 365) / 1000;

  const total1 = (money * 100) / 100000;

  state.step = Math.ceil((total1 / 450) * 100);

  return (
    <View style={styles.heroContainer}>
      <View style={styles.topHeading}>
        <Text style={styles.topHeadingText}>Statistika</Text>
        <Text style={styles.topHeadingUnderline}>Od prestanka pušenja</Text>
      </View>

      <View style={styles.rowrowrow}>
        <View style={styles.row1}>
          <Text style={styles.mainText}>
            Propuštene{"\n"}
            <Text style={{ color: "#4F4F4F" }}>&nbsp;&nbsp;&nbsp;cigare</Text>
          </Text>
        </View>

        <View style={styles.row2}>
          <Text style={styles.mainText}>
            Sačuvan{"\n"}
            <Text style={{ color: "#4F4F4F" }}>&nbsp;&nbsp;novac</Text>
          </Text>
        </View>

        <View style={styles.row3}>
          <Text style={styles.mainText}>
            Godišnja{"\n"}
            <Text style={{ color: "#4F4F4F" }}>&nbsp;ušteda</Text>
          </Text>
        </View>
      </View>

      <View style={styles.rowrowrow}>
        <View>
          <View style={styles.circle}>
            <Text style={styles.number}>{number}</Text>
          </View>
        </View>

        <View>
          <View style={styles.circle}>
            <Text style={styles.number}>
              {total1.toFixed(1)}
              <Text style={{ fontSize: 20 }}>K</Text>
            </Text>
          </View>
        </View>

        <View>
          <View style={styles.circle}>
            <Text style={styles.number}>
              {total.toFixed(0)}
              <Text style={{ fontSize: 20 }}>K</Text>
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.stednja}>
        <Text style={styles.TextSavings}>Štedim za:</Text>
        <Text style={styles.TextSavingsUnderline}>IMac Pro 2020 27"</Text>
        <View>
          <Image
            style={styles.image}
            source={require("../src/images/imac.png")}
          />
        </View>
      </View>

      <View>
        <View style={styles.rowrowrow1}>
          <View style={styles.row}>
            <Text style={styles.mainText1}>Sačuvano</Text>
            <Text style={styles.number1}>{commaNumber(money)} rsd</Text>
          </View>

          <View style={styles.row2}>
            <Text style={styles.mainText1}>Ostalo</Text>
            <Text style={styles.number1}>
              {commaNumber(450000 - money)} rsd
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.mainText1}>Cilj</Text>
            <Text style={styles.number1}>{commaNumber(450000)} rsd</Text>
          </View>
        </View>

        <View style={styles.container}>
          {/* Todo: Progress bar */}
          <Progress step={state.step} steps={50} height={20} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroContainer: {
    width: "100%",
    height: Dimensions.get("window").height + 60,
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    padding: hp("2%"),
  },

  backgroundImg: {
    width: "100%",
    height: "100%",
    position: "absolute",
    resizeMode: "cover",
  },

  image: {
    width: "100%",
  },

  stednja: {
    marginTop: hp("5%"),
    marginBottom: hp("2%"),
  },

  topHeading: {
    alignItems: "flex-start",
    paddingVertical: wp("5%"),
    marginTop: 35,
    marginBottom: wp("5%"),
  },

  topHeadingText: {
    fontSize: 25,
    fontFamily: "Regular",
    color: "#333333",
  },

  topHeadingUnderline: {
    fontSize: 15,
    fontFamily: "InterRegular",
    color: "#4F4F4F",
  },

  rowrowrow: {
    //paddingHorizontal: 5,
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingVertical: 5,
    justifyContent: "space-around",
  },

  rowrowrow1: {
    //paddingHorizontal: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },

  row1: {
    justifyContent: "center",
    alignItems: "center",
  },

  row2: {
    justifyContent: "center",
    alignItems: "center",
  },

  row3: {
    justifyContent: "center",
    alignItems: "center",
  },

  mainText: {
    fontSize: wp("4%"),
    fontFamily: "InterRegular",
    color: "#333333",
    paddingBottom: 5,
  },

  number: {
    fontSize: wp("7.5%"),
    fontFamily: "InterRegular",
    color: "#333333",
    alignSelf: "center",
  },

  TextSavings: {
    fontSize: 20,
    fontFamily: "Regular",
    color: "#333333",
  },

  TextSavingsUnderline: {
    fontSize: 12,
    marginBottom: 10,
    fontFamily: "InterRegular",
    color: "#4F4F4F",
  },

  mainText1: {
    fontSize: 16,
    fontFamily: "Regular",
    color: "#333333",
  },

  number1: {
    fontSize: 12,
    fontFamily: "InterRegular",
    color: "#98B279",
    paddingVertical: 2,
  },

  circle: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.18,
    height: Dimensions.get("window").width * 0.18,
    backgroundColor: "rgba(152, 178, 121, 0.2)",
    justifyContent: "center",
  },
});

export default Stats;
