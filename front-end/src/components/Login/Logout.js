import React ,{Fragment,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {

    var navigate = useNavigate()

    useEffect(async() => {
        
        var {data} = await axios.get('http://localhost:8000/general/logout')

        console.log(data)
        if (data.isLog == false) {
            navigate('/')
        }
    }, [])

    return(
        <Fragment>
            <h1>Logout</h1>
        </Fragment>
    )
}

export default Logout