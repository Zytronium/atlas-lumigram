import {
  addDoc,
  getDoc,
  collection,
  DocumentSnapshot,
  query,
  where,
  getDocs,
  limit,
  orderBy,
  startAfter,
  doc,
  updateDoc,
  arrayUnion,
  setDoc
} from "@firebase/firestore";
import { db } from "@/firebaseConfig";

type Post = {
  caption: string;
  image: string;
  updatedAt: Date;
  createdAt: Date;
  createdBy: string;
};

const posts = collection(db, "posts");
const PAGE_SIZE = 5;

async function getPosts(pageSize: number = PAGE_SIZE, lastDoc?: DocumentSnapshot) {
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
      createdBy: doc.data().createdBy,
      createdAt: doc.data().createdAt
    })) as (Post & { id: string })[],
    lastDoc: snapshot.docs[snapshot.docs.length - 1]
  };
}

async function getFavorites(userID: string, lastDoc?: DocumentSnapshot) {
  const userRef = doc(db, "users", userID);
  const userDoc = await getDoc(userRef);
  if (!userDoc.exists()) throw new Error(`User ${userID} not found`);

  const data = userDoc.data() || {};
  const favorites: string[] = Array.isArray(data.favorites) ? data.favorites : [];

  if (favorites.length === 0) {
    return { posts: [], lastDoc: undefined };
  }

  const postsRef = collection(db, "posts");

  let q = query(
    postsRef,
    where("__name__", "in", favorites.slice(0, 10)),
    orderBy("createdAt", "desc"),
    limit(PAGE_SIZE)
  );

  if (lastDoc) {
    q = query(
      postsRef,
      where("__name__", "in", favorites.slice(0, 10)),
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(PAGE_SIZE)
    );
  }

  const snapshot = await getDocs(q);

  const filteredDocs = snapshot.docs.filter(d => favorites.includes(d.id));

  const posts = filteredDocs.map(d => ({
    id: d.id,
    image: d.data().image,
    caption: d.data().caption,
    createdBy: d.data().createdBy,
    createdAt: d.data().createdAt
  })) as (Post & { id: string })[];

  const newLastDoc =
    filteredDocs.length > 0 ? filteredDocs[filteredDocs.length - 1] : undefined;

    return {
    posts,
    lastDoc: newLastDoc
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

export { addPost, getPosts, getFavorites, addToFavorites };
