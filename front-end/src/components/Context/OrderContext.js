import { createContext, useState } from "react"

const OrderContext = createContext();

const OrderContextProvider = (props) => {

    localStorage.getItem('orders')

    var [orders, setOrders] = useState(0)

    return(
        <OrderContext.Provider value={[orders, setOrders]}>
            {props.children}
        </OrderContext.Provider>
    )

}

export {OrderContext, OrderContextProvider}