import { Text, TextInput, View, Image } from "react-native";
import { Loading } from "@/components/Loading";
import { CreateAccountButton, LoginToExistingLink } from "@/components/Buttons";
import { styles } from "@/constants/Styles";
import React, { useState } from "react";
import { Logo } from "@/components/Images";
import { EmailInput, PasswordInput } from "@/components/Inputs";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  function register() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) { // normally would do 8 or even 10, but this for testing
      alert('Password must be at least 6 characters long.');
      return;
    }
    if (password.toLowerCase() === "password") { // fun little Easter egg
      alert(`Really? "${password}"?`);
      return;
    }
    if ([ // another fun Easter egg
      email.split("@")[0].toLowerCase().trim(),
      email.split("@")[1].split(".")[0].toLowerCase().trim(),
      password.toLowerCase().replaceAll(" ", "")
    ].includes("rickrollme")) {
      alert('Never Gonna Give You Up!');
    }

    alert(`Creating account with ${email} and ${password}`);
  }

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>Register</Text>
      <EmailInput email={email} setEmail={setEmail} />
      <PasswordInput password={password} setPassword={setPassword} />
      <CreateAccountButton onPress={register}/>
      <LoginToExistingLink />
      {loading && <Loading />}
    </View>
  );
}
