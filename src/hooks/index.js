import React, { createContext, useState, useContext } from "react";

const TagsGitHubContext = createContext();


function TagsGitHubProvider({ children }) {
    const [count, setCount] = useState(0);
    return (
        <TagsGitHubContext.Provider value={{ count, setCount }}>
            {children}
        </TagsGitHubContext.Provider>
    )
}


function useTagsGitHub(){
    const context = useContext(TagsGitHubContext);
    

    if (!context){
        throw new Error ("useTagsGitHub must be used within a TagsGitHubProvider")
    }

    return context;
}


export { TagsGitHubProvider, useTagsGitHub }