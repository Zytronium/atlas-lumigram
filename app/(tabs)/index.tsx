import { View, StyleSheet, Image, Alert, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useState } from "react";
import { homeFeed } from "@/placeholder";
import Animated from "react-native-reanimated";
import { runOnJS } from "react-native-reanimated";
import { useAuth } from "@/components/AuthProvider";

interface Post {
  image: string;
  caption: string;
  id: string;
  createdBy: string;
}

interface PostItemProps {
  imageUrl: string;
  caption: string;
}

function PostItem({ imageUrl, caption }: PostItemProps) {
  const [showCaption, setShowCaption] = useState(false);

  const showAlert = () => {
    Alert.alert("Double Tap", "Image favorited!");
  };

  const longPress = Gesture.LongPress()
    .minDuration(500)
    .onStart(() => {
      runOnJS(setShowCaption)(true);
    })
    .onEnd(() => {
      runOnJS(setShowCaption)(false);
    });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      runOnJS(showAlert)();
    });

  const composed = Gesture.Exclusive(doubleTap, longPress);

  return (
    <View style={styles.postContainer}>
      <GestureDetector gesture={composed}>
        <Animated.View>
          <Image source={{ uri: imageUrl }} style={styles.postImage} />
          {showCaption && (
            <View style={styles.captionOverlay}>
              <Text style={styles.captionText}>{caption}</Text>
            </View>
          )}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

export default function HomeScreen() {
  const auth = useAuth();
  return (
    <View style={styles.container}>
      <FlashList
        data={posts}
        renderItem={({ item }: { item: Post }) => (
          <PostItem imageUrl={item.image} caption={item.caption} />
        )}
        // @ts-ignore
        estimatedItemSize={400}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fef9e6",
  },
  postContainer: {
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 25,
    overflow: "hidden",
  },
  postImage: {
    width: "100%",
    height: 400,
    backgroundColor: "#fef9e6",
  },
  captionOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 15,
  },
  captionText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
