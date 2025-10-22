import { StyleSheet, View, Text, Pressable } from "react-native";
import { useState } from "react";
import { CaptionInput } from "@/components/Inputs";
import { ImagePreview } from "@/components/ImagePreview";
import { useImagePicker } from "@/hooks/useImagePicker";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/Button";
import { useRouter } from "expo-router";

export default function Page() {
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { image, openImagePicker, reset } = useImagePicker();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImagePreview src={image} />
      <View style={styles.footerContainer}>
        {!image && (
          <Button
            theme="primary"
            label="Choose a photo"
            includeImage
            onPress={openImagePicker}
            />
        )}
        {image && (
          <View style={styles.actionContainer}>
              <CaptionInput caption={caption} setCaption={setCaption} />
            <Button theme="primary" label="Save" onPress={reset} />
            <Pressable onPress={reset}>
              <Text style={styles.resetText}>Reset</Text>
            </Pressable>
          </View>
        )}
      </View>
      {loading && <Loading />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fef9e6",
  },
  footerContainer: {
    width: "90%",
    paddingBottom: 40,
  },
  actionContainer: {
    gap: 16,
    alignItems: "center",
  },
  resetText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "500",
    marginTop: 20,
  },
});
