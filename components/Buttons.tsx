import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { styles } from "@/constants/Styles";
import { Link } from "expo-router";

export function SignInButton(props: {
  onPress: () => void;
}) {
  return <Pressable
    style={styles.signInButton}
    onPress={props.onPress}
  >
    <Text style={styles.signInText}>Sign in</Text>
  </Pressable>;
}

export function CreateAccountButton(props: {
  onPress: () => void;
}) {
  return <Pressable
    style={styles.signInButton}
    onPress={props.onPress}
  >
    <Text style={styles.signInText}>Create Account</Text>
  </Pressable>;
}

export function CreateNewAccountLink() {
  return <Link href="/register" replace asChild>
    <Pressable style={styles.createAccountButton}>
      <Text style={styles.createAccountText}>Create a new account</Text>
    </Pressable>
  </Link>;
}

export function LoginToExistingLink() {
  return <Link href="/login" replace asChild>
    <Pressable style={styles.createAccountButton}>
      <Text style={styles.createAccountText}>Log in to existing account</Text>
    </Pressable>
  </Link>;
}
