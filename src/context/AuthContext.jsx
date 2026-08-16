import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(user));
  }, [user]);

  const signup = (newUser) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.some(
      (user) =>
        user.email.toLowerCase() === newUser.email.toLowerCase()
    );

    if (emailExists) {
      return {
        success: false,
        message: "This email is already registered.",
      };
    }

    const nameExists = users.some(
      (user) =>
        user.name.toLowerCase() === newUser.name.toLowerCase()
    );

    if (nameExists) {
      return {
        success: false,
        message: "This username is already taken.",
      };
    }

        const userWithImage = {
        ...newUser,
        profileImage: "",
        };

        users.push(userWithImage);

        localStorage.setItem("users", JSON.stringify(users));

        setUser(userWithImage);

    return {
      success: true,
    };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const found = users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    if (!found) return false;

    setUser(found);

    return true;
  };

  const googleLogin = (googleUser) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const existingUser = users.find(
    (u) => u.email === googleUser.email
  );

  if (!existingUser) {
    users.push({
      ...googleUser,
      password: "",
    });

    localStorage.setItem("users", JSON.stringify(users));
  }

  const currentUser = existingUser || {
    ...googleUser,
    password: "",
  };

  localStorage.setItem(
    "currentUser",
    JSON.stringify(currentUser)
  );

  setUser(currentUser);

  return true;
};

  const updateProfile = (updatedData) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

 
  const usernameExists = users.some(
    (u) =>
      u.email !== user.email &&
      u.name.toLowerCase() === updatedData.name.toLowerCase()
  );

  if (usernameExists) {
    return {
      success: false,
      message: "This username is already taken.",
    };
  }

  const updatedUsers = users.map((u) =>
    u.email === user.email
      ? { ...u, ...updatedData }
      : u
  );

  localStorage.setItem("users", JSON.stringify(updatedUsers));

  const updatedUser = {
    ...user,
    ...updatedData,
  };

  localStorage.setItem(
    "currentUser",
    JSON.stringify(updatedUser)
  );

  setUser(updatedUser);

  return {
    success: true,
  };
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };



  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        googleLogin,
        logout,
        updateProfile,
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);