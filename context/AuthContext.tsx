"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { User, UserAddress, DEMO_USER } from "@/data/users";
import { getFromStorage, saveToStorage, removeFromStorage, STORAGE_KEYS } from "@/lib/storage";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  loginAsDemo: () => void;
  register: (name: string, email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  updateUserAddress: (address: UserAddress) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from storage on client mount
  useEffect(() => {
    const savedUser = getFromStorage<User | null>(STORAGE_KEYS.USER, null);
    if (savedUser) {
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, _password?: string): Promise<boolean> => {
    // Frontend demo mock login
    const normalizedEmail = email.trim().toLowerCase();
    let authUser: User;

    if (normalizedEmail === DEMO_USER.email.toLowerCase()) {
      authUser = DEMO_USER;
    } else {
      authUser = {
        id: `usr-${Date.now()}`,
        name: email.split("@")[0].replace(/[._-]/g, " ") || "SoleX Member",
        email: email.trim(),
        createdAt: new Date().toISOString(),
      };
    }

    setUser(authUser);
    saveToStorage(STORAGE_KEYS.USER, authUser);
    return true;
  }, []);

  const loginAsDemo = useCallback(() => {
    setUser(DEMO_USER);
    saveToStorage(STORAGE_KEYS.USER, DEMO_USER);
  }, []);

  const register = useCallback(async (name: string, email: string, _password?: string): Promise<boolean> => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    saveToStorage(STORAGE_KEYS.USER, newUser);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    removeFromStorage(STORAGE_KEYS.USER);
  }, []);

  const updateUserAddress = useCallback((address: UserAddress) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, address };
      saveToStorage(STORAGE_KEYS.USER, updated);
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginAsDemo,
        register,
        logout,
        updateUserAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
