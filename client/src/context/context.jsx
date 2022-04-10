import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [postCreated, setPostCreated] = useState(true);
  const [commentCreated, setCommentCreated] = useState(true);

  return (
    <DataContext.Provider
      value={{ postCreated, setPostCreated, commentCreated, setCommentCreated }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
