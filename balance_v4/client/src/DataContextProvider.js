import React, { useState, createContext } from "react";

export const DataContext = createContext();

export const DataContextProvider = (props) => {
  const [data, setData] = useState({
    showLogin: false,
    showHome: false,
    showEntry: false,
    showEntryAdd: false,
    showSettings: false,
    mainUserID: 0,
    localUserID: [
      {
        id: 0,
        name: "",
      },
    ],
    setData: () => {},
  });
  return (
    <DataContext.Provider value={[data, setData]}>
      {props.children}
    </DataContext.Provider>
  );
};
