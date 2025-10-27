import { StyleSheet, View, Text, Pressable } from "react-native";
import { useState } from "react";
import { CaptionInput } from "@/components/Inputs";
import { ImagePreview } from "@/components/ImagePreview";
import { useImagePicker } from "@/hooks/useImagePicker";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/Button";
import storage from "@/lib/storage";
import firestore from "@/lib/firestore";
import { useAuth } from "@/components/AuthProvider";

export default function Page() {
  const auth = useAuth();
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { image, openImagePicker, reset } = useImagePicker();

  async function save() {
    if (!image) return;
    setLoading(true);
    const name = image?.split("/").pop() as string;
    const { downloadURL, metadata } = await storage.upload(image, name);
    console.log(downloadURL);

    await firestore.addPost({
      caption,
      image: downloadURL,
      updatedAt: new Date(),
      createdAt: new Date(),
      createdBy: auth.user?.uid!!,
    });

    setLoading(false);
    alert("Post added!");
  }

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
            <Button theme="primary" label="Save" onPress={save} />
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
