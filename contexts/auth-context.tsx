import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  type PropsWithChildren,
  useEffect,
  useState,
} from "react";

export type UserRole = "STUDENT" | "INSTRUCTOR" | "ADMIN";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type SignInData = {
  email: string;
  password: string;
};

export type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
const AUTH_STORAGE_KEY = "@driving-test-companion:user";
export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  async function signIn(data: SignInData) {
    const simulatedUser: User = {
      id: "local-user",
      name: "Test Student",
      email: data.email,
      role: "STUDENT",
    };

    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(simulatedUser));
    setUser(simulatedUser);
  }

  async function signOut() {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  }
  const isAuthenticated = user !== null;

  useEffect(() => {
    let isMounted = true;
    async function loadStoredUser() {
      try {
        const storedUser = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        if (storedUser && isMounted) {
          setUser(JSON.parse(storedUser) as User);
        }
      } catch (error) {
        console.error("Failed to load stored user", error);
      } finally {
        if (isMounted) setIsAuthLoading(false);
      }
    }
    loadStoredUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext
      value={{ user, isAuthenticated, isAuthLoading, signIn, signOut }}
    >
      {children}
    </AuthContext>
  );
}
