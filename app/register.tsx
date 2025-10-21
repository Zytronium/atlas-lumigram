import { Pressable, Text, TextInput, View, StyleSheet, Image } from "react-native";
import { Link, useRouter } from "expo-router";

export default function Page() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#8b9299"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#8b9299"
        secureTextEntry={true}
        autoCapitalize="none"
      />

      <Pressable
        style={styles.signInButton}
        onPress={() => {
          // @ts-ignore
          router.replace('/(tabs)/');
      }}
      >
        <Text style={styles.signInText}>Create Account</Text>
      </Pressable>

      <Link href="/login" replace asChild>
        <Pressable style={styles.createAccountButton}>
          <Text style={styles.createAccountText}>Log in to existing account</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00003c',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 250,
    height: 120,
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#1ed2af',
    borderRadius: 8,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#fef9e6',
    marginBottom: 16,
  },
  signInButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#1ed2af',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  signInText: {
    fontSize: 18,
    color: '#fef9e6',
    fontWeight: '500',
  },
  createAccountButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#000039',
    borderWidth: 2,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createAccountText: {
    fontSize: 16,
    color: '#fef9e6',
    fontWeight: '400',
  },
});