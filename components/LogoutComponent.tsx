import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "@/components/AuthProvider";

export default function LogoutComponent() {
  const auth = useAuth();

  async function logout() {
    try {
      await auth.logout();
      router.replace('/login');
    } catch (e: any) {
      alert("Error logging out. Please try again.");
    }
  }

  return (
    <Pressable onPress={logout}>
      <Ionicons name="log-out-outline" size={24} style={{ marginRight: 16 }} />
    </Pressable>
  );
}
