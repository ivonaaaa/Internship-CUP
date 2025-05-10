import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import axios from "axios";
import { User } from "../types";
import { useUser } from "../api/user/useUserQueries";

export type AuthError = {
  status: number;
  message: string;
  code?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (registerData: RegisterData) => Promise<void>;
  logout: () => void;
};

interface RegisterData {
  email: string;
  name: string;
  surname: string;
  password: string;
}

interface TokenPayload {
  sub: number;
  email: string;
  name: string;
  surname: string;
  subscriptionPlan: string;
  createdAt: string;
  exp: number;
  iat: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  
  const { 
    data: userData, 
    isLoading: isLoadingUser 
  } = useUser(userId || 0);
  
  const isLoading = isLoadingAuth || (userId !== null && isLoadingUser);

  const getToken = (): string | null => {
    return localStorage.getItem("access_token");
  };

  const setToken = (token: string): void => {
    localStorage.setItem("access_token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const clearToken = (): void => {
    localStorage.removeItem("access_token");
    delete axios.defaults.headers.common["Authorization"];
  };

  const decodeToken = (token: string): TokenPayload | null => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      throw error;
    }
  };

  const isTokenExpired = (payload: TokenPayload): boolean => {
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp <= currentTime;
  };

  const logout = useCallback(() => {
    clearToken();
    setUserId(null);
  }, []);

  const validateToken = useCallback(() => {
    const token = getToken();

    if (!token) {
      setUserId(null);
      setIsLoadingAuth(false);
      return false;
    }

    try {
      const payload = decodeToken(token);

      if (!payload) {
        logout();
        setIsLoadingAuth(false);
        return false;
      }

      if (isTokenExpired(payload)) {
        logout();
        setIsLoadingAuth(false);
        return false;
      }

      setUserId(payload.sub);
      setIsLoadingAuth(false);
      return true;
    } catch (error) {
      logout();
      setIsLoadingAuth(false);
      return false;
    }
  }, [logout]);

  useEffect(() => {
    const token = getToken();
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      validateToken();
    } else setIsLoadingAuth(false);
  }, [validateToken]);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          const errorMessage = error.response?.data?.message;
          const isTokenError = errorMessage === "Invalid token.";
          if (isTokenError && userId) logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [userId, logout]);

  useEffect(() => {
    if (!userId) return;

    const checkTokenExpiration = () => {
      const token = getToken();
      if (!token) return;

      const payload = decodeToken(token);
      if (!payload) return;

      if (isTokenExpired(payload)) logout();
    };

    const intervalId = setInterval(checkTokenExpiration, 60000);

    return () => clearInterval(intervalId);
  }, [userId, logout]);

  const handleApiError = (error: any): never => {
    if (error.response?.status === 500) {
      console.warn(
        `Server error during API call to ${error.config?.url || "unknown endpoint"}`
      );
    }
    throw error;
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      const { access_token } = response.data;
      setToken(access_token);

      validateToken();
    } catch (error) {
      handleApiError(error);
    }
  };

  const register = async (registerData: RegisterData) => {
    try {
      const requestData = {
        ...registerData,
        subscriptionPlan: "FREE_TRIAL",
      };
      await axios.post("/api/auth/register", requestData);
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: userData || null,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};