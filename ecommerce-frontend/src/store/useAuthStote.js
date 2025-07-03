import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getUser } from '../utils/getUser'
import { getProfile, updateProfile } from '../api/profile'


export const useAuthStore = create(
    persist(
        (set) => ({
            user: getUser(),
            token: localStorage.getItem("token") || null,

            login: (token) => {
                localStorage.setItem("token", token);
                const userData = getUser();
                set({ user: userData, token})
            },

            logout: () => {
                localStorage.removeItem("token");
                set({ user: null, token: null})
            },

            register: (token) => {
                localStorage.setItem("token", token);
                const userData = getUser();
                set({ user: userData, token})
            },

            setUser: (userData) => set({ user: userData }),

            getUserProfile: async () => {
                try {
                    const profile = await getProfile();
                    console.log(profile)
                    set({user: profile.data})
                    return "Profile fetched successfully";
                } catch (error) {
                    console.error("Failed to get user profile:", error);
                    // throw error;
                }
            },

            updateUserProfile: async (data) => {
                try {
                    const profile = await updateProfile(data);
                    set({ user: profile.data.user });
                    return profile.data.message;
                } catch (error) {
                    console.error("Failed to update user profile:", error);
                    // throw error;
                }
            }
        }),
        {
            name: "auth storage",
            partialize: (state) => ({ token: state.token }),
        }
    )
)