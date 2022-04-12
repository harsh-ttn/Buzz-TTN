import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [postCreated, setPostCreated] = useState(true);
  const [commentCreated, setCommentCreated] = useState(true);
  const [postUpdated, setPostUpdated] = useState(true);
  const [friend, setFriend] = useState(true);

  return (
    <DataContext.Provider
      value={{
        postCreated,
        setPostCreated,
        commentCreated,
        setCommentCreated,
        postUpdated,
        setPostUpdated,
        friend,
        setFriend,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
