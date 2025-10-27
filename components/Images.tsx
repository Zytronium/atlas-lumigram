import { Image } from "react-native";
import { styles } from "@/constants/Styles";
import React from "react";

export function Logo() {
  return <Image
    source={require("../assets/images/logo.png")}
    style={styles.logo}
    resizeMode="contain"
  />;
}
