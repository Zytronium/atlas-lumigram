import { Image, StyleSheet, View } from "react-native";

interface ImagePreviewProps {
  src: string | undefined;
}

export function ImagePreview({ src }: ImagePreviewProps) {
  return (
    <View style={styles.container}>
      {src ? (
        <Image source={{ uri: src }} style={styles.image} />
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    aspectRatio: 1,
    marginTop: 80,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  placeholder: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },
});
