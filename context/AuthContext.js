import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  //   Register user
  const register = async (user) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/local/register`, {
        username: user.username,
        email: user.email,
        password: user.password,
      });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;
    } catch (error) {
      setError(error.response.data.message);
      setError(null);
    }
  };

  //  Login user
  const login = async ({ email: identifier, password }) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/local`, {
        identifier,
        password,
      });
      //   Store the token in headers of axios for future requests
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;
    } catch (error) {
      setError(error.response.data.message);
      setError(null);
    }
  };

  //   user
  const logout = async () => {};

  // Check if user is logged in
  const checkUserLoggedIn = async (user) => {};

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        register,
        login,
        logout,
        checkUserLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
