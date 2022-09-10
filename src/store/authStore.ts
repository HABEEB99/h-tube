import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { UserDetailsProps } from "../../typings";

interface Authstore {
  user: any;
  addUser: (newUser: UserDetailsProps) => void;
  removeUser: () => void;
}

export const useAuthStore = create<Authstore>()(
  devtools(
    persist((set) => ({
      user: null,
      addUser: (newUser) => set({ user: newUser }),
      removeUser: () => set({ user: null }),
    }))
  )
);
