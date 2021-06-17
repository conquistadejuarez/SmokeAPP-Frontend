
import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import { Context } from "../context/Store";
import axios from 'axios';
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Puls",
    description: "Vaš puls bi trebalo da se vratio u normalu",
    timeToHeal: 2,
  },

  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb2323",
    title: "Nivo Kiseonika",
    description: "Vaš nivo kiseonika bi trebalo da se vratio u normalu",
    timeToHeal: 3,
  },

  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb23333",
    title: "Nivo CO",
    description:
      "Ugljen-monoksid u vašem organizmu bi trebalo da je nestao iz vašeg organizma. ",
    timeToHeal: 5,
  },

  {
    id: "bd7acbea-c1b1-46c2-aad5-3ad53abb23133",
    title: "Nikotin",
    description:
      "Sav nikotin iz Vašeg organizma bi trebalo da je nestao iz vašeg organizma.",
    timeToHeal: 6,
  },

  {
    id: "bd7acbea-c1b1-46c2-aad5-3dd53abb23133",
    title: "Ukus i Miris",
    description:
      "Vaša mogucnost da osetite ukus i miris bi trebalo da je znatno poboljšana.",
    timeToHeal: 10,
  },

  {
    id: "bd7acbea-c1b1-56c2-aad5-3dd53abb23133",
    title: "Disanje",
    description:
      "Vaše bronhijalne cevi su pocele da se opuštaju i vase disanje bi trebalo da bude lakše.",
    timeToHeal: 12,
  },

  {
    id: "bd7acbea-c1b1-56c2-aad5-3dd53bbb23133",
    title: "Nivo Energije",
    description: "Vaš nivo energije trebalo bi da je veći.",
    timeToHeal: 14,
  },

  {
    id: "bd7acbea-c1b1-56c2-aad5-3dd53ccb23133",
    title: "Nokti i Kosa",
    description: "Kvalitet vaših noktiju i kose počinje da se popravlja",
    timeToHeal: 18,
  },

  {
    id: "bd3acbea-c121-c4c4-aad5-3dd53ccb23133",
    title: "Neprijatan Zadah",
    description: "Neprijatan zadah uzrokovan pušenjem bi trebalo da nestane.",
    timeToHeal: 22,
  },

  {
    id: "c4c4cbea-c121-c4c4-aad5-3dd53ccb23133",
    title: "Desni i Zubi",
    description: "Cirkulacija krvi u Vašim desnima i zubima trebalo bi da se postala slična kao kod ne pušaca.",
    timeToHeal: 25,
  },

  {
    id: "bla4cbea-blja-c4c4-aad5-3dd53ccb23133",
    title: "Tekstura Desni",
    description: "Tekstura i boja Vaših desni bi trebalo da se vratila u normalu.",
    timeToHeal: 35,
  },

  {
    id: "bla4cbea-blja-c4c4-aad5-bbbb3ccb23133",
    title: "Imunitet i funckija pluca",
    description: "Vas imunitet i funkcija pluca bi trebalo da je znatno poboljšana.",
    timeToHeal: 45,
  },

  {
    id: "bla4cbea-blja-c4c4-44d5-bbbb3ccb23144",
    title: "Rizik od srcanih bolesti",
    description: "Trebalo bi da je rizik od srčanih bolesti uzrokovan pušenjem znatno smanjen.",
    timeToHeal: 67,
  },
];

const Health = () => {

  const [state, dispatch] = useContext(Context);
  const [days, setDays] = useState([]);

  let url = `https://smokeapp.digitalcube.rs/api/f/CalcDays/` + state.id_user;

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

  const number = days
  
  return (
    <View style={styles.heroContainer}>
      <View style={styles.topPart}>
        <Text style={styles.topPartTitle}>Zdravlje</Text>
        <Text style={styles.topPartunder}>
          od prestanka pušenja postali ste zdraviji!
        </Text>
      </View>

      <View style={{marginBottom:20,}}>
        <Text style={{ fontSize: heightPercentageToDP('2%'), fontFamily: "Regular" }}>
          Postali ste zdraviji u:
        </Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={DATA}
        renderItem={({ item, index }) => {
          if (number >= item.timeToHeal) {
            return (
              <View
                style={{
                  maxWidth: "100%",
                  flexDirection: "row",
                  paddingHorizontal: 5,
                  marginBottom: 15,
                  paddingVertical: 5,
                  backgroundColor: "rgba(152, 178, 121, 0.2)",
                }}
              >
                <View style={styles.dayz}>
                  <Text style={styles.numa}>
                    {item.timeToHeal}
                    {"\n"}
                    <Text style={{ fontSize: 10, fontFamily: "Regular" }}>
                      dana
                    </Text>
                  </Text>
                </View>
                <View style={styles.other}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Regular",
                        fontSize: 20,
                        paddingVertical: 5,
                        paddingHorizontal: 5,
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        backgroundColor: "#7D9561",
                        opacity: 0.8,
                        fontFamily: "InterRegular",
                        fontSize: 12,
                        borderRadius: 2,
                        paddingVertical:2,
                        paddingHorizontal:4,
                        position:'absolute',
                        marginLeft: widthPercentageToDP('60%'),
                        color:'#FFF',
                      }}
                    >
                      Zavrseno
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontFamily: "Regular",
                      fontSize: 11,
                      paddingHorizontal: 5,
                      width: widthPercentageToDP('70%'),
                    }}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
            );
          } else {
            return (
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 5,
                  marginBottom: 15,
                  paddingVertical: 5,
                }}
              >
                <View style={styles.dayz}>
                  <Text style={styles.numa}>
                    {item.timeToHeal}
                    {"\n"}
                    <Text style={{ fontSize: 10, fontFamily: "Regular" }}>
                      dana
                    </Text>
                  </Text>
                </View>
                <View style={styles.other}>
                  <Text
                    style={{
                      fontFamily: "Regular",
                      fontSize: 20,
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Regular",
                      fontSize: 11,
                      paddingHorizontal: 5,
                      width: widthPercentageToDP('70%'),
                    }}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
            );
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heroContainer: {
    width: "100%",
    height: Dimensions.get("window").height + 20,
    backgroundColor: "#FFF",
    padding: 10,
  },

  topPart: {
    alignItems: "flex-start",
    paddingVertical: 25,
    marginTop: heightPercentageToDP('5%'),
  },

  topPartTitle: {
    fontFamily: "Regular",
    fontSize: heightPercentageToDP('3%'),
    color:'#333333',
  },

  topPartunder: {
    fontSize: heightPercentageToDP('2%'),
    fontFamily: "InterRegular",
    color:'#4F4F4F',
  },

  dayz: {
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    width:50,
    borderRightWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },

  numa: {
    fontFamily: "InterRegular",
    fontSize: 25,
    color:'#98B279',
    paddingHorizontal:7,
  },

  other: {
    maxWidth: "100%",
  },
});

export default Health;
