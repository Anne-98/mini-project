import React, { createContext, useContext, useState } from "react";

const IsConfirmDesign = createContext()

const IsConfirmDesignProvider = (props) => {

    var [IsConfirm, setIsConfirm] = useState(false)

    return(
        <IsConfirmDesign.Provider value={[IsConfirm, setIsConfirm]}>
             {props.children}
        </IsConfirmDesign.Provider>
    )
}

export default IsConfirmDesignProvider
