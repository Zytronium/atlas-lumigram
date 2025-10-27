import { Text, View } from "react-native";
import React, { useState } from "react";
import { Loading } from "@/components/Loading";
import { CreateNewAccountLink, SignInButton } from "@/components/Buttons"
import { styles } from "@/constants/Styles";
import { Logo } from "@/components/Images";
import { EmailInput, PasswordInput } from "@/components/Inputs";
import { useAuth } from "@/components/AuthProvider";
import { router, useRouter } from "expo-router";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const auth = useAuth();
  const router = useRouter();

  async function login() {
    setLoading(true);
    try {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        setLoading(false);
        return;
      }

      await auth.login(email, password);
      // @ts-ignore
      router.replace('/(tabs)/');

    } catch (e: any) {
      console.error('Error logging in:', e);

      // Handle specific Firebase errors
      const errorCode = e?.code;
      let errorMessage = 'An error occurred. Please try again.';

      if (errorCode === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (errorCode === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (errorCode === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password.';
      } else if (errorCode === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
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
      <Text style={styles.title}>Login</Text>
      <EmailInput email={email} setEmail={setEmail} />
      <PasswordInput password={password} setPassword={setPassword} />
      <SignInButton onPress={login} />
      <CreateNewAccountLink />
      {loading && <Loading />}
    </View>
  );
}
