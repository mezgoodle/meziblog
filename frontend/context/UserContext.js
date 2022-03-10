import React, { useState, useEffect, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userMail, setMail] = useState(null);

  useEffect(() => {
    const token = localStorage.token;
    const checkUser = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      const response = await fetch(
        "http://127.0.0.1:8000/posts",
        requestOptions
      );

      if (!response.ok) {
        setToken(null);
      } else {
        localStorage.setItem("token", token);
        setToken(token);
      }
    };
    checkUser();
  });

  return (
    <UserContext.Provider value={{ token, setToken, userMail, setMail }}>
      {props.children}
    </UserContext.Provider>
  );
};
