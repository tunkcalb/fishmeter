import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Alert,
  Settings,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  createStackNavigator,
} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Tabs from "./navigation/tabs";
import DogamGallery from "./screens/dogam/DogamGallery";
import KaKaoLogin from "./KaKaoLogin";
import KaKaoLogOut from "./KaKaoLogOut";
import DogamDetail from "./screens/dogam/DogamDetail";
import { RecoilRoot } from "recoil";
import TestImage from "./TestImage";
import Home from "./Home";
import DogamDetailTest from "./screens/dogam/DogamDetailTest";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RecoilRoot>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Root" component={Tabs} />
          <Stack.Screen name="DogamGallery" component={DogamGallery} />
          <Stack.Screen name="DogamDetail" component={DogamDetail} />
          <Stack.Screen name="DogamDetailTest" component={DogamDetailTest} />
          <Stack.Screen name="KaKaoLogin" component={KaKaoLogin} />
          <Stack.Screen name="KaKaoLogOut" component={KaKaoLogOut} />
          <Stack.Screen name="TestImage" component={TestImage} />
          <Stack.Screen name="HomeTest" component={Home} />
        </Stack.Navigator>
      </RecoilRoot>
    </NavigationContainer>
  );
}
