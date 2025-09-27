import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'counselor' | 'admin';
  isAnonymous?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isLoading: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>({
    id: "1",
    name: "John Doe",
    email: "john.doe@university.edu",
    role: "student", // Default to student - can be changed in login
    isAnonymous: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string, role: string = 'student') => {
    setIsLoading(true);
    try {
      // Mock login - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser({
        id: "1",
        name: role === 'admin' ? 'Admin User' : role === 'counselor' ? 'Dr. Sarah Johnson' : 'John Doe',
        email: email,
        role: role as 'student' | 'counselor' | 'admin',
        isAnonymous: false
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};