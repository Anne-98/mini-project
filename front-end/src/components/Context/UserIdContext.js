import React, {createContext, useState} from "react";

export const UserIdContext = createContext();

export const UserIdContextProvider = (props) => {
    let id = localStorage.getItem('userId')
    let id_2;
    id != null ? id_2 = id : id_2 = '' 
    let [userId, setUserId] = useState(id_2)
    console.log("id: ",id)

    return(
        <UserIdContext.Provider value={[userId, setUserId]}>
            {props.children}
        </UserIdContext.Provider>
    )
}
