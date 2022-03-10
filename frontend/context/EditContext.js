import React, { useState } from "react";

export const EditContext = React.createContext();

export const EditProvider = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");

  return (
    <EditContext.Provider
      value={{ title, setTitle, body, setBody, author, setAuthor }}
    >
      {props.children}
    </EditContext.Provider>
  );
};
