import { Text, TextInput, View, Image } from "react-native";
import { Loading } from "@/components/Loading";
import { CreateAccountButton, LoginToExistingLink } from "@/components/Buttons";
import { styles } from "@/constants/Styles";
import React, { useState } from "react";
import { Logo } from "@/components/Images";
import { EmailInput, PasswordInput } from "@/components/Inputs";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "expo-router";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const auth = useAuth();
  const router = useRouter();

  async function register() {
    setLoading(true);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try {
      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        setLoading(false);
        return;
      }
      if (password.length < 6) { // normally would do 8 or even 10, but this for testing
        alert('Password must be at least 6 characters long.');
        setLoading(false);
        return;
      }
      if (password.toLowerCase() === "password") { // fun little Easter egg
        alert(`Really? "${password}"?`);
        setLoading(false);
        return;
      }
      if ([ // another fun Easter egg
        email.split("@")[0].toLowerCase().trim(),
        email.split("@")[1].split(".")[0].toLowerCase().trim(),
        password.toLowerCase().replaceAll(" ", "")
      ].includes("rickrollme")) {
        alert('Never Gonna Give You Up!');
      }

      await auth.register(email, password);
      // @ts-ignore
      router.replace('/(tabs)/');

    } catch (e: any) {
      console.error('Error registering user:', e);

      // Handle specific Firebase errors
      const errorCode = e?.code;
      let errorMessage = 'An error occurred. Please try again.';

      if (errorCode === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered.';
      } else if (errorCode === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (errorCode === 'auth/weak-password') {
        errorMessage = 'Password is too weak.';
      } else if (errorCode === 'auth/operation-not-allowed') {
        errorMessage = 'Registration is currently disabled.';
      } else if (errorCode === 'auth/network-request-failed') {
        errorMessage = 'Network error. Check your connection.';
      } else {
        errorMessage = 'An unknown error occurred. Please try again.';
      }

      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>Register</Text>
      <EmailInput email={email} setEmail={setEmail} />
      <PasswordInput password={password} setPassword={setPassword} />
      <CreateAccountButton onPress={register} />
      <LoginToExistingLink />
      {loading && <Loading />}
    </View>
  );
}
