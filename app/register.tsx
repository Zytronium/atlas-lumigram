import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Page() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Register</Text>

      <Link href={"/login"} replace>
        <Text>Log in to existing account</Text>
      </Link>
    </View>
  );
}
