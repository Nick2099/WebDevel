import React, {useState, createContext} from "react";

export const PageContentContext = createContext();

export const PageContentProvider = (props) => {
    const [page, setPage] = useState({
        showLogin: false,
        showHome: true,
        showEntry: false,
        showEntryAdd: false,
        showSettings: false,
        showShow: false,
        setPage: () => {}
        }
    );
    return(
        <PageContentContext.Provider value={[page, setPage]}>
            {props.children}
        </PageContentContext.Provider>
    );
};