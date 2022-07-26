import create from 'zustand';
import { persist } from 'zustand/middleware';

const authStore = (set: any) => ({
	user: null,
	addUser: (userDetails: any) => set({ user: userDetails }),
	removeUser: () => set({ user: null }),
});

export const useAuthStore = create(persist(authStore, { name: 'auth' }));
