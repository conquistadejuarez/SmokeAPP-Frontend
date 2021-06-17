import React, { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  TextInput,
  SafeAreaView
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import { Context } from "../context/Store";
import { useEffect, useState } from "react";

const Login = ({ navigation }) => {
  const [state, dispatch] = useContext(Context);

  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [checkLogin, setCheckLogin] = React.useState();

  const login = () => {
    let body = {
      id_tenant: "fea6df76-a751-11eb-bcbc-0242ac130002",
      username: username,
      password: password,
    };

    axios
      .post("https://smokeapp.digitalcube.rs/api/users/login", body)
      .then((r) => {
        console.log(r.data);
        dispatch({ type: "SET_TOKEN", payload: r.data.id_session });
        dispatch({ type: "SET_ID", payload: r.data.id_user });
      })
      .catch((e) => {
        console.log(e);
        setCheckLogin("Pogresna kombinacija imena i šifre! Pokušajte opet.");
      });
  };

  const onPressHandler = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView>
    <View style={styles.heroContainer}>
      <ImageBackground
        source={require("../src/images/hero.png")}
        style={styles.backgroundImg}
      />

      <View style={styles.naslovi}>
        <Text style={styles.naslov}>Prijavi se</Text>
      </View>

      <View style={styles.forma}>
        <TextInput
          value={username.toLowerCase()}
          onChangeText={(value) => setUsername(value)}
          style={styles.formaText}
          placeholder={"Vaše Ime"}
        />
      </View>

      <View style={styles.forma}>
        <TextInput
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={isSecureEntry}
          style={styles.formaText1}
          placeholder={"Vaša sifra"}
        />
        <TouchableOpacity
          onPress={() => {
            setIsSecureEntry((prev) => !prev);
          }}
        >
          <Text style={{ color: "#98B279" }}>
            {isSecureEntry ? "Show" : "Hide"}
          </Text>
        </TouchableOpacity>
      </View>

      {checkLogin && <Text style={styles.checker}>{checkLogin}</Text>}

      <TouchableOpacity
        onPress={() => login()}
        style={{
          marginHorizontal: wp("10%"),
          alignItems: "center",
          justifyContent: "center",
          marginTop: 30,
          backgroundColor: "#98B279",
          paddingVertical: 12,
          width: wp("80%"),
          borderRadius: 100,
        }}
      >
        <Text style={{ color: "#FFF" }}>Prijava</Text>
      </TouchableOpacity>
      <Text
        onPress={onPressHandler}
        style={{
          alignSelf: "center",
          color: "#98B279",
          paddingVertical: 10,
        }}
      >
        <Text style={{ color: "black" }}>Nemate nalog?</Text> Registrujte se
      </Text>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heroContainer: {
    width: "100%",
    height: Dimensions.get("window").height + 60,
    backgroundColor:'#FFF',
    
  },

  backgroundImg: {
    width: "100%",
    height: "100%",
    position: "absolute",
    resizeMode: "cover",
  },

  naslovi: {
    marginTop: wp("30%"),
    width: "100%",
    alignItems: "center",
  },

  naslov: {
    fontSize: hp("4%"),
    fontFamily: "Regular",
  },

  forma: {
    flexDirection: "row",
    marginHorizontal: 16,
    borderWidth: 2,
    marginTop: 15,
    paddingHorizontal: 10,
    backgroundColor: "#F2F2F2",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    paddingVertical: 7,
    alignItems: "center",
  },

  formaText: {
    color: "#333",
    width: "100%",
  },

  formaText1: {
    color: "#333",
    width: "90%",
  },

  checker: {
    color: "#f72a2a",
    fontFamily: "Regular",
    alignSelf: "center",
    marginTop: 10,
  },
});
export default Login;
