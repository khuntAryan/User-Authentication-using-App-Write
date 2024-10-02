//context is just a provider regarding the user
//wheter the user is logged-in or not

import { createContext } from "react";

export const AuthContext = createContext<{
    authStatus: boolean;
    setAuthStatus: (status: boolean) => void;
}>({
    authStatus: false,
    setAuthStatus: () => {},
});

export const AuthProvider = AuthContext.Provider;

export default AuthContext;