import {
  addDoc,
  collection, DocumentSnapshot,
  getDocs,
  limit,
  orderBy,
  query, startAfter,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  setDoc
} from "@firebase/firestore";
import { db } from "@/firebaseConfig";

type Post = {
  caption: string;
  image: string;
  updatedAt: Date;
  createdAt: Date;
  createdBy: string;
}
const posts = collection(db, "posts");

async function getPosts(pageSize: number = 5, lastDoc?: DocumentSnapshot) {
  let q = query(posts, orderBy("createdAt", "desc"), limit(pageSize));
  if (lastDoc) {
    q = query(posts, orderBy("createdAt", "desc"), startAfter(lastDoc), limit(pageSize));
  }

  const snapshot = await getDocs(q);

  return {
    posts: snapshot.docs.map(doc => ({
      id: doc.id,
      image: doc.data().image,
      caption: doc.data().caption,
      createdBy: doc.data().createdBy
    })) as (Post & { id: string })[],
    lastDoc: snapshot.docs[snapshot.docs.length - 1]
  };
}

async function addPost(post: Post) {
  await addDoc(posts, post);
}

async function addToFavorites(userId: string, postId: string) {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    // Create user document if it doesn't exist
    await setDoc(userRef, {
      favorites: [postId]
    });
  } else {
    // Update existing document
  await updateDoc(userRef, {
    favorites: arrayUnion(postId)
  });
}
}

export { addPost, getPosts, addToFavorites };