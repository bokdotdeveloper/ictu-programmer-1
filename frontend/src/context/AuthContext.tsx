/*
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
  import {
    checkAuthStatus,
    loginUser,
    logoutUser,
    signupUser,
  } from "../helpers/api-communicator";
  
  type User = {
    name: string;
    email: string;
  };
  type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
  };
  const AuthContext = createContext<UserAuth | null>(null);
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      // fetch if the user's cookies are valid then skip login
      async function checkStatus() {
        const data = await checkAuthStatus();
        if (data) {
          setUser({ email: data.email, name: data.name });
          setIsLoggedIn(true);
        }
      }
      checkStatus();
    }, []);
    const login = async (email: string, password: string) => {
      const data = await loginUser(email, password);
      if (data) {
        setUser({ email: data.email, name: data.name });
        setIsLoggedIn(true);
      }
    };
    const signup = async (name: string, email: string, password: string) => {
      const data = await signupUser(name, email, password);
      if (data) {
        setUser({ email: data.email, name: data.name });
        setIsLoggedIn(true);
      }
    };
    const logout = async () => {
      await logoutUser();
      setIsLoggedIn(false);
      setUser(null);
      window.location.reload();
    };
  
    const value = {
      user,
      isLoggedIn,
      login,
      logout,
      signup,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  
  export const useAuth = () => useContext(AuthContext);
  */

  import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
  import {
    checkAuthStatus,
    loginUser,
    logoutUser,
    signupUser,
  } from "../helpers/api-communicator";
  
  type User = {
    name: string;
    email: string;
  };
  type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
  };
  const AuthContext = createContext<UserAuth | null>(null);
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      // Load user data from localStorage on app initialization
      const savedUser = localStorage.getItem("auth_user");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } else {
        // Fallback to API-based session check
        async function checkStatus() {
          const data = await checkAuthStatus();
          if (data) {
            const userData = { email: data.email, name: data.name };
            setUser(userData);
            setIsLoggedIn(true);
            localStorage.setItem("auth_user", JSON.stringify(userData));
          }
        }
        checkStatus();
      }
    }, []);
  
    const login = async (email: string, password: string) => {
      const data = await loginUser(email, password);
      if (data) {
        const userData = { email: data.email, name: data.name };
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem("auth_user", JSON.stringify(userData));
      }
    };
  
    const signup = async (name: string, email: string, password: string) => {
      const data = await signupUser(name, email, password);
      if (data) {
        const userData = { email: data.email, name: data.name };
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem("auth_user", JSON.stringify(userData));
      }
    };
  
    const logout = async () => {
      await logoutUser();
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("auth_user");
      window.location.reload(); // Optional: Ensure a fresh state
    };
  
    const value = {
      user,
      isLoggedIn,
      login,
      logout,
      signup,
    };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  
  export const useAuth = () => useContext(AuthContext);
  