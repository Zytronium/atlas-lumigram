import { Pressable, Text, StyleSheet, ViewStyle } from "react-native";

interface ButtonProps {
  theme: "primary" | "secondary";
  label: string;
  onPress: () => void;
  includeImage?: boolean;
}

export function Button({ theme, label, onPress, includeImage }: ButtonProps) {
  const buttonStyle = theme === "primary" ? styles.primaryButton : styles.secondaryButton;
  const textStyle = theme === "primary" ? styles.primaryText : styles.secondaryText;

  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    width: "100%",
    height: 60,
    backgroundColor: "#1ED2AF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButton: {
    width: "100%",
    height: 60,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#1ED2AF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: {
    fontSize: 18,
    color: "#fef9e6",
    fontWeight: "600",
  },
  secondaryText: {
    fontSize: 18,
    color: "#1ED2AF",
    fontWeight: "600",
  },
});
