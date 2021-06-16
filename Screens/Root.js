
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
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import { Context } from "../context/Store";
import moment from "moment";

const Root = () => {

 const text1 = 'Prvih 5 dana je najveci pritisak!\n \u00a0 \u00a0 \u00a0  \u00a0  \u00a0  \u00a0 \u00a0 \u00a0  Izdrzite!';
 const text4 = 'Svaka cast! Bravo!';

  const [state, dispatch] = useContext(Context);

  const [days, setDays] = useState([]);
  const [name, setName] = useState([]);
  let url = `https://smokeapp.digitalcube.rs/api/f/CalcDays/` + state.id_user;

 const logout = () => {
  dispatch({type:'SET_TOKEN', payload:""});
  dispatch({type:'SET_ID', payload:""});
 }
  

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
          console.log(resp.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [state.id_user]);

  const dani = days


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
        
          borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
          width: Dimensions.get('window').width * 0.15,
          height: Dimensions.get('window').width * 0.15,
          backgroundColor:'rgba(152, 178, 121, 0.2)',
          justifyContent: 'center',
          alignContent: 'center',
          position: 'absolute',
        }}
        underlayColor = '#CCC'
        >
        </View>
        <Text style={styles.mainHeading}>{days}</Text>
        <Text style={styles.underLineText}>{dani < 5 ? text1 : text4}</Text>
      </View>

      <TouchableHighlight 
      onPress={() => logout() }
      style={styles.button}
      >
        <View>
          <Text style={styles.buttonText}>Odjavi me</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  heroContainer: {
    width: "100%",
    height: Dimensions.get("window").height,
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
    marginTop: hp('20%')
  },

  bottomDiv: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp('5%'),
  },

  usernameTitle: {
    fontSize: 25,
    fontFamily: "Regular",
    textTransform: 'capitalize',
    color: '#333333',
  },

  underLineTitle: {
    fontFamily: "InterRegular",
    fontSize: 15,
    color: '#4F4F4F',
  },

  bigHeading: {
    fontSize: 20,
    fontFamily: "Regular",
    color:'#333333',
  },

  mainHeading: {
    fontSize: 80,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal:10,
    fontFamily: "InterRegular",
    justifyContent: 'center',
    alignItems: 'center',
    color:'#333333',
    
  },

  underLineText: {
    fontSize: 15,
    fontFamily: "InterRegular",
  },

  button: {
  opacity:10,
  position:'absolute',
  marginTop:hp('8%'),
  alignSelf:'flex-end',
  paddingHorizontal:10,

  },

  buttonText: {
    fontFamily: 'InterThin',
    color:'#98B279',
    fontSize:15,
  },
});

export default Root;
