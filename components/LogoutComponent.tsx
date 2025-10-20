import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function LogoutComponent() {

  function logout() {
    router.replace('/login');
  }
  return (
    <Pressable onPress={logout} >
      <Ionicons name="log-out-outline" size={24} style={{ marginRight: 16 }} />
    </Pressable>
  );
}
