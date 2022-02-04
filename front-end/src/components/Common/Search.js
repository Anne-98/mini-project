import axios from "axios";
import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";

const Search = () => {

    // var params = useParams()
    // var searched_value = params.search_item
    
    // // useEffect(async()=>{

    // //     var {data} = await axios.post('http://localhost:8000/general/search/search_item', searched_value)


    // //     console.log(data.data)
    // // }, [])

    return(
        <Fragment>
            <h1 className="mt-5 pt-5 text-center">Search results</h1>
        </Fragment>
    )
}

export default Search