import { Text, View } from "react-native";
import React, { useState } from "react";
import { Loading } from "@/components/Loading";
import { CreateNewAccountLink, SignInButton } from "@/components/Buttons"
import { styles } from "@/constants/Styles";
import { Logo } from "@/components/Images";
import { EmailInput, PasswordInput } from "@/components/Inputs";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  function login() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    alert(`Logging in with ${email} and ${password}`);
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
