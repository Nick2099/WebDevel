import React, { useState, createContext } from "react";

export const DataContext = createContext();

export const DataContextProvider = (props) => {
  const [data, setData] = useState({
    // informations which "areas" will be displayed
    showLogin: false,
    showHome: false,
    showEntry: false,
    showEntryAdd: false,
    showSettings: false,
    // info about user
    userID: 0,      // it's a userID
    localUser: [    // 0 - for main user, >0 - other users/names for same userID
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
