import { addDoc, collection } from "@firebase/firestore";
import { db } from "@/firebaseConfig";

type Post = {
  caption: string;
  image: string;
  updatedAt: Date;
  createdAt: Date;
  createdBy: string;
}
const posts = collection(db, "posts");

async function addPost(post: Post) {
  await addDoc(posts, post);
}

export default { addPost };
