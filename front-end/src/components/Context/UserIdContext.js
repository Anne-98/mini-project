import React, {createContext, useState} from "react";

export const UserIdContext = createContext();

export const UserIdContextProvider = (props) => {
    var id = localStorage.getItem('userId')
    var id_2;
    id != null ? id_2 = id : id_2 = '' 
    const [userId, setUserId] = useState(id_2)
    console.log("id: ",id)

    return(
        <UserIdContext.Provider value={[userId, setUserId]}>
            {props.children}
        </UserIdContext.Provider>
    )
}
