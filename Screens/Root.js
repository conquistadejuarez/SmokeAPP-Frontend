import React, { useContext } from "react";
import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  Image,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import { Context } from "../context/Store";
import moment from "moment";

const Root = () => {
  const text1 =
    "Prvih 5 dana je najveci pritisak!\n \u00a0 \u00a0 \u00a0  \u00a0  \u00a0  \u00a0 \u00a0 \u00a0  Izdrzite!";
  const text4 = "Svaka cast! Bravo!";

  const [state, dispatch] = useContext(Context);

  const [days, setDays] = useState([]);
  const [name, setName] = useState([]);
  let url = `https://smokeapp.digitalcube.rs/api/f/CalcDays/` + state.id_user;

  const [modalVisible, setModalVisible] = useState(false);

  const logout = () => {
    dispatch({ type: "SET_TOKEN", payload: "" });
    dispatch({ type: "SET_ID", payload: "" });
  };

  useEffect(() => {
    if (state.id_user !== "") {
      axios
        .get(url)
        .then((res) => {
          setDays(res.data);
          // console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [state.id_user]);

  let url1 = `https://smokeapp.digitalcube.rs/api/f1/str/` + state.id_user;

  useEffect(() => {
    if (state.id_user !== "") {
      axios
        .get(url1)
        .then((resp) => {
          setName(resp.data);
          console.log(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [state.id_user]);

  const dani = days;

  return (
    <View style={styles.heroContainer}>
      <ImageBackground
        source={require("../src/images/hero21.png")}
        style={styles.backgroundImg}
      />

      <View style={styles.topDiv}>
        <Text style={styles.usernameTitle}>Dobrodošli {name}</Text>
        <Text style={styles.underLineTitle}>
          {moment().format("MMM Do YYYY")}
        </Text>
      </View>

      <View style={styles.bottomDiv}>
        <Text style={styles.bigHeading}>Dani bez cigareta:</Text>
        <View
          style={{
            borderRadius:
              Math.round(
                Dimensions.get("window").width + Dimensions.get("window").height
              ) / 2,
            width: Dimensions.get("window").width * 0.15,
            height: Dimensions.get("window").width * 0.15,
            backgroundColor: "rgba(152, 178, 121, 0.2)",
            justifyContent: "center",
            alignContent: "center",
            position: "absolute",
          }}
          underlayColor="#CCC"
        ></View>
        <Text style={styles.mainHeading}>{days}</Text>
        <Text style={styles.underLineText}>{dani < 5 ? text1 : text4}</Text>
      </View>

      <TouchableHighlight onPress={() => logout()} style={styles.button}>
        <View>
          <Text style={styles.buttonText}>Odjavi me</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button1}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <View>
          <Text style={styles.buttonText}>O aplikaciji</Text>
        </View>
      </TouchableHighlight>

      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTextMain}>SmokeApp</Text>
              <Text style={styles.modalText}>
                SmokeApp aplikacija je dizajnirana sa ciljem da motiviše i
                podrži osobe koje žele da se odviknu od pušenja tako što im
                ukazuje na mnogobrojne prednosti koje se ostvaruju prestankom
                konzumiranja cigareta
              </Text>
              <Text style={styles.modalText}>
                Aplikacija meri napredak na dnevnom nivou prikazujući tačan broj
                nepopušenih cigareta od momenta prestanka pušenja, trenutnu
                uštedu u novcu od trenutka prestanka, kao i ukupnu godišnju
                uštedu.
              </Text>
              <Text style={styles.modalText}>
                Jedna od prednosti SmokeApp aplikacije je mogućnost da koristeći
                je možete da ispratite poboljšanje vašeg zdravlja tokom procesa
                prestanka konzumiranja cigareta na dnevnom nivou.
              </Text>

              <Text style={styles.modalText}>
                Projekat SmokeApp je uradjen na Praksi u firmi Digital Cube
                d.o.o.
              </Text>

              <Text style={styles.modalText}>Autor i kreator: Miloš Ćopić</Text>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Zatvori</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroContainer: {
    width: "100%",
    height: Dimensions.get("window").height + 60,
    backgroundColor: "#FFF",
  },

  backgroundImg: {
    width: "100%",
    height: "100%",
    position: "absolute",
    resizeMode: "cover",
  },

  topDiv: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    marginTop: hp("20%"),
  },

  bottomDiv: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp("5%"),
  },

  usernameTitle: {
    fontSize: 25,
    fontFamily: "Regular",
    textTransform: "capitalize",
    color: "#333333",
  },

  underLineTitle: {
    fontFamily: "InterRegular",
    fontSize: 15,
    color: "#4F4F4F",
  },

  bigHeading: {
    fontSize: 20,
    fontFamily: "Regular",
    color: "#333333",
  },

  mainHeading: {
    fontSize: 80,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    fontFamily: "InterRegular",
    justifyContent: "center",
    alignItems: "center",
    color: "#333333",
  },

  underLineText: {
    fontSize: 15,
    fontFamily: "InterRegular",
  },

  button: {
    opacity: 10,
    position: "absolute",
    marginTop: hp("8%"),
    alignSelf: "flex-end",
    paddingHorizontal: 10,
  },

  button1: {
    opacity: 10,
    position: "absolute",
    marginTop: hp("8%"),
    alignSelf: "flex-start",
    paddingHorizontal: 10,
  },

  buttonText: {
    fontFamily: "InterThin",
    color: "#98B279",
    fontSize: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  modalView: {
    marginBottom:50,
    marginHorizontal:15,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    color: "#98B279",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },

  modalTextMain: {
    marginBottom: 15,
    fontSize: 22,
    fontFamily: "InterBold",
    textAlign: "center",
    color: "#98B279",
  },
  modalText: {
    marginBottom: 10,
    fontSize: 14,
    fontFamily: "InterRegular",
    textAlign: "center",
  },

  boldirano: {
    fontFamily: "InterBold",
  },
});

export default Root;
