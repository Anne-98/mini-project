import React, {createContext, useState} from "react";

export const IsLogContext = createContext();

export const IsLogContextProvider = (props) => {

    var isLog = localStorage.getItem('isLogContext')
    var isLog_2;

    isLog != null ? isLog_2 = isLog : isLog_2 = '' 

    var [isLog, setIsLog] = useState(isLog_2)

    return(
        <IsLogContext.Provider value={[isLog, setIsLog]}>
            {props.children}
        </IsLogContext.Provider>
    )
}

