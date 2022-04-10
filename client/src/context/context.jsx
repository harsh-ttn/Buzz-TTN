import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [postCreated, setPostCreated] = useState(true);
  const [userId, setUserId] = useState("");

  return (
    <DataContext.Provider
      value={{ postCreated, setPostCreated, userId, setUserId }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
