import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [postCreated, setPostCreated] = useState(true);

  return (
    <DataContext.Provider
      value={{ postCreated, setPostCreated}}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
