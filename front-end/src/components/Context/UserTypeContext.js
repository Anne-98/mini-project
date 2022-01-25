import React, {createContext, useState} from "react";

export const UserTypeContext = createContext()

export const UserTypeContextProvider = (props) => {

    let storedType = localStorage.getItem('type')
    let storedType_2

    storedType != null ? storedType_2 = storedType : storedType_2 = ''
    let [type, setType] = useState(storedType_2)


    return(
        <UserTypeContext.Provider value={[type, setType]}>
            {props.children}
        </UserTypeContext.Provider>
    )
}
