import { View, StyleSheet, Image, Alert, Text, RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { getPosts } from "@/lib/firestore";
import Animated from "react-native-reanimated";
import { runOnJS } from "react-native-reanimated";
import { useAuth } from "@/components/AuthProvider";
import { DocumentSnapshot } from "@firebase/firestore";

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
  const [homeFeed, setHomeFeed] = useState<Post[]>([]);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | undefined>();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadPosts = async (lastDocument?: DocumentSnapshot) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const result = await getPosts(5, lastDocument);

      if (result.posts.length === 0) {
        setHasMore(false);
      } else {
        setHomeFeed(prev => [...prev, ...result.posts]);
        setLastDoc(result.lastDoc);
      }
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const result = await getPosts(5);
      setHomeFeed(result.posts);
      setLastDoc(result.lastDoc);
    setHasMore(true);
    } catch (error) {
      console.error("Error refreshing posts:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleEndReached = () => {
    if (hasMore && !loading) {
      loadPosts(lastDoc);
    }
  };

  return (
    <View style={styles.container}>
      <FlashList
        data={homeFeed}
        renderItem={({ item }: { item: Post }) => (
          <PostItem imageUrl={item.image} caption={item.caption} />
        )}
        // @ts-ignore
        estimatedItemSize={400}
        keyExtractor={(item) => item.id}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
