import { create } from "zustand";
import { persist } from "zustand/middleware";

// persist: Es guardar la información en localStorage
const useUserStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            // Funciones para poder cambiar el valor de user, isAuthenticated
            setUser: (userData) =>
                set({
                    user: userData,
                    isAuthenticated: true,
                }),
            logout: () =>
                set({
                    user: null,
                    isAuthenticated: false,
                }),
        }),
        {
            name: "proyecto-final",
        }
    )
);

export default useUserStore;