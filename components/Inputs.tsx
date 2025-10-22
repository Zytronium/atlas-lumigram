import { TextInput, StyleSheet } from "react-native";

interface CaptionInputProps {
  caption: string;
  setCaption: (caption: string) => void;
}

export function CaptionInput({ caption, setCaption }: CaptionInputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholder="Add a caption"
      placeholderTextColor="#8b9299"
      value={caption}
      onChangeText={setCaption}
      multiline
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    minHeight: 60,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#1ED2AF",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: "#000",
  },
});
