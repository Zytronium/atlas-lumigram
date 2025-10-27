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
        return;
      }

      await auth.login(email, password);
      // @ts-ignore
      router.replace('/(tabs)/');

    } catch (e) {
      console.error('Error logging in:', e);
      alert('Error logging in. Please try again.');
    }
    setLoading(false);
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
