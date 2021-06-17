import React, {Component, useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from '../Screens/Login';
import Register from '../Screens/Register'
import Root from '../Screens/Root';
import Stats from '../Screens/Stats';
import Health from '../Screens/Health';
import {Context} from '../context/Store';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const Navigator = () => {

    const [state, dispatch] = useContext(Context);
    console.log(state)

return(
    <NavigationContainer>
      {state.token === '' ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              header: () => null,

              style: {
                height: 0,
                width: 0,
              }
            }}
            
          />
        
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              header: () => null,
            }}
          />

        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          tabBarOptions={{
            showLabel: false,
            style: {
              position: "absolute",
              elevation: 0,
              borderRadius: 15,
              borderTopColor: 'transparent',
              backgroundColor: '#FFF',
            },
          }}
        >
          <Tab.Screen
            name="Root"
            component={Root}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={styles.nav}
                >
                  <Image
                    source={require('../src/images/home.png')}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: focused ? "#98B279" : "#333333",
                    }}
                  />
                </View>
              ),
            }}
          />

          <Tab.Screen
            name="Stats"
            component={Stats}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={styles.nav}
                >
                  <Image
                    source={require('../src/images/stats.png')}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: focused ? "#98B279" : "#333333",
                    }}
                  />
                </View>
              ),
            }}
          />

          <Tab.Screen
            name="Health"
            component={Health}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={styles.nav}
                >
                  <Image
                    source={require('../src/images/hearth.png')}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: focused ? "#98B279" : "#333333",
                    }}
                  />
                </View>
              ),
            }}
          />
          
        </Tab.Navigator>
      )}
    </NavigationContainer>
)
}

const styles = StyleSheet.create({})

export default Navigator
