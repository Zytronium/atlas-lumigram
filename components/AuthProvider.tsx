import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, User,
  UserCredential
} from "@firebase/auth";
import { auth } from "@/firebaseConfig";

const AuthContext = createContext<AuthContextType>({ register, login, logout });

type AuthContextType = {
  user?: User | null;
  register: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

export const useAuth = () => useContext(AuthContext);

function register(email: string, password: string) {
   return createUserWithEmailAndPassword(auth, email, password);
}

function logout() {
  return auth.signOut();
}

function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function AuthProvider({ children}: { children: ReactNode }) {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      { children }
    </AuthContext.Provider>
  );
}
