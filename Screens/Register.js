import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  TextInput,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";

const Register = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [brand, setBrand] = React.useState();
  const [brands, setBrands] = React.useState([]);
  const [password, setPassword] = React.useState("");
  const [averagePerDay, setAveragePerDay] = React.useState();
  const [date, setDate] = React.useState(new Date(moment().format("ll")));
  const [modalOpen, setModalOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [check, setCheck] = useState();
  const [checkPw, setCheckPw] = useState();
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  

  React.useEffect(() => {
    getBrands();
  }, []);

  const displayBrand = () => {
    if (brand) {
      return brand.name;
    } else {
      return <Text>Izaberite brend</Text>;
    }
  };

  const displayDate = () => {
    if (moment(date).format('ll')) {
      return moment(date).format('ll');
    } else {
      return <Text>Izaberi datum prestanka</Text>;
    }
  };


  

  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const register = () => {
    let body = {
      id_tenant: "fea6df76-a751-11eb-bcbc-0242ac130002",
      username: username,
      password: password,
      average_per_day: averagePerDay,
      brand_smoking: brand.id,
      quit_date: date,
    };
    axios
      .post("https://smokeapp.digitalcube.rs/api/users/register", body)
      .then((r) => console.log(r.data))
      .catch((e) => console.log(e));

    onPressHandler();
  };

  const getBrands = () => {
    axios
      .get("https://smokeapp.digitalcube.rs/api/brands")

      .then((r) => {
        
        setBrands(r.data);
        
      })
      .catch((e) => console.log(e));
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const onPressHandler = () => {
    navigation.navigate("Login");
  };

  const returnDate = () => {
    return moment(date).format("ll");
  };

  const regex = /[A-Z]/g;
  const regex1 = /[a-z]/g;
  const regex2 = /[0-9]/g;
  const regex3 = /[!@#$%^&*()_+]/g;

  const checkUsername = () => {
    if (!username) {
      setCheck("Molimo Vas upišite vaš zeljeni username");
    } else if (username.length < 4) {
      setCheck("Username mora imati makar 4 karaktera");
    } else {
      setCheck(null);
    }
  };

  const checkPassword = () => {
    if (!password) {
      setCheckPw("Molimo vas upišite zeljeni password");
    } else if (password.length < 6) {
      setCheckPw("Password mora da ima makar 6 karaktera");
    } else if (!password.match(regex)) {
      setCheckPw("Password mora imati makar jedno veliko slovo");
    } else if (!password.match(regex1)) {
      setCheckPw("Password mora sadrzati makar jedno malo slovo");
    } else if (!password.match(regex2)) {
      setCheckPw("Password mora imati makar jedan broj!");
    } else if (!password.match(regex3)) {
      setCheckPw(
        "Password mora imati makar jedan specijalni karakter (!@#$%^*()_+)"
      );
    } else {
      setCheckPw(null);
    }
  };
  return (
    <KeyboardAvoidingView keyboardVerticalOffset={35}>
      <View style={styles.heroContainer}>
        <ImageBackground
          source={require("../src/images/hero.png")}
          style={styles.backgroundImg}
        />

        <View style={styles.naslovi}>
          <Text style={styles.naslov}>Registruj se</Text>
        </View>

        <View style={styles.forma}>
          <TextInput
            value={username}
            onChangeText={(value) => setUsername(value)}
            style={styles.formaText}
            placeholder={"Vaše Ime"}
            onEndEditing={() => checkUsername()}
          />
        </View>
        {check && <Text style={styles.checker}>{check}</Text>}

        <View style={styles.forma}>
          <TextInput
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry={isSecureEntry}
            style={styles.formaText1}
            placeholder={"Vaša sifra"}
            onEndEditing={() => checkPassword()}
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
        {checkPw && <Text style={styles.checker}>{checkPw}</Text>}

        <View style={styles.forma}>
          <TextInput
            value={averagePerDay}
            onChangeText={(value) => setAveragePerDay(value)}
            style={styles.formaText}
            placeholder={"Prosecno cigareta dnevno: (npr: 20)"}
            keyboardType="numeric"
          />
        </View>

        <Modal visible={dateOpen} animationType="slide">
          <ImageBackground
            source={require("../src/images/hero.png")}
            style={styles.backgroundImg}
          />
          <View style={styles.modalContent}>
            <TouchableOpacity style={{ marginTop: 50 }}>
              <Text onPress={() => setDateOpen(false)} style={styles.btn}>
                Potvrdi
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 1 }}>
              <Text onPress={showDatepicker} style={styles.btn1}>
                {moment(date).format('ll')}
              </Text>
            </TouchableOpacity>

            <View style={styles.row}>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
          </View>
        </Modal>

        <View style={styles.forma}>
          <Text
            onPress={() => setDateOpen(true)}
            style={{ color: "#959595", width: "100%" }}
          > Datum prestanka :&nbsp;
            {displayDate()}
          </Text>
        </View>

        <Modal visible={modalOpen} animationType="slide">
          <ImageBackground
            source={require("../src/images/hero21.png")}
            style={styles.backgroundImg}
          />
          <View style={styles.modalContent}>
            <Text onPress={() => setModalOpen(false)} style={styles.btn}>
              Potvrdi
            </Text>

            <View style={styles.row}>
              <Picker
                style={{ width: "100%", height: 100, color: "#959595" }}
                itemStyle={{ width: "100%", color: "#333" }}
                selectedValue={brand}
                // onChange={(item)=> {setBrand(item);console.log(item);}}
                onValueChange={(itemValue, itemIndex) => setBrand(itemValue)}
              >
                <Picker.Item
                  label="Izaberi iz liste"
                  value="1"
                  enabled="false"
                />
                {brands.map((element) => {
                  return (
                    <Picker.Item
                      label={element.name}
                      value={element}
                      key={element.id}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
        </Modal>

        <View style={styles.forma}>
          <Text
            onPress={() => setModalOpen(true)}
            style={{ color: "#959595", width: "100%" }}
          >
            {displayBrand()}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => register()}
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
          <Text style={{ color: "#FFF" }}>Registruj se</Text>
        </TouchableOpacity>
        <Text
          onPress={onPressHandler}
          style={{
            alignSelf: "center",
            color: "#98B279",
            paddingVertical: 10,
          }}
        >
          <Text style={{ color: "black" }}>Vec imate nalog?</Text> Prijavi se
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  heroContainer: {
    width: "100%",
    height: Dimensions.get("window").height + 60,
  },

  backgroundImg: {
    width: "100%",
    height: "100%",
    position: "absolute",
    resizeMode: "cover",
  },

  naslovi: {
    marginTop: "30%",
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
    paddingHorizontal: 10,
    backgroundColor: "#F2F2F2",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    paddingVertical: 7,
    alignItems: "center",
    marginTop:15,
    marginBottom:15,
  },

  formaText: {
    color: "#333",
    width: "100%",
  },

  formaText1: {
    color: "#333",
    width: "90%",
  },

  row: {
    width: "100%",
    justifyContent: "center",
    padding: 20,
  },

  btn: {
    alignSelf: "center",
    fontSize: 20,
    padding: 10,
    fontFamily: "Regular",
    backgroundColor: "#98B279",
    color: "#fff",
    marginTop: 70,
  },

  btn1: {
    alignSelf: "center",
    fontSize: 25,
    padding: 10,
    fontFamily: "SemiBold",
    color: "#000",
    marginTop: 40,
    textDecorationLine:'underline'
  },

  checker: {
    color: "#f72a2a",
    fontFamily: "Regular",
    fontSize: 10,
    alignSelf: "center",
  },
});

export default Register;
