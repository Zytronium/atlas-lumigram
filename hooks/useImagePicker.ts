import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export function useImagePicker() {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  async function openImagePicker() {
    if (status === null || !status.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        alert("Permission to access camera roll is required to access your images");
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  function reset() {
    setImage(undefined);
  }

  return { image, openImagePicker, reset };
}