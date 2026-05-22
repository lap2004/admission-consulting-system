import { create } from "zustand";

interface User {
  email: any;
  full_name: any;
  user_id: string;
  username: string;
  role: "admin" | "student";
}

interface UserStore {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  clearUser: () => void;
}

export const useUser = create<UserStore>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }), 
  setLoading: (loading) => set({ loading }),
  clearUser: () => set({ user: null, loading: false }),
}));
