import { TextInput, StyleSheet } from "react-native";
import { styles } from "@/constants/Styles";
import React from "react";

interface CaptionInputProps {
  caption: string;
  setCaption: (caption: string) => void;
}

export function CaptionInput({ caption, setCaption }: CaptionInputProps) {
  return (
    <TextInput
      style={styles.input2}
      placeholder="Add a caption"
      placeholderTextColor="#8b9299"
      value={caption}
      onChangeText={setCaption}
      multiline
    />
  );
}

export function EmailInput(props: {
  email: string,
  setEmail: (email: string) => void
}) {
  return <TextInput
    style={styles.input}
    placeholder="Email"
    placeholderTextColor="#8b9299"
    keyboardType="email-address"
    autoCapitalize="none"
    onChangeText={(e) => {
      props.setEmail(e);
    }}
  />;
}

export function PasswordInput(props: {
  password: string,
  setPassword: (password: string) => void
}) {
  return <TextInput
    style={styles.input}
    placeholder="Password"
    placeholderTextColor="#8b9299"
    secureTextEntry={true}
    autoCapitalize="none"
    onChangeText={(e) => {
      props.setPassword(e);
    }}
  />;
}
