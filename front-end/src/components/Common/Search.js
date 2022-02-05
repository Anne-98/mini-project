import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './../../css/Common/Search.css';

const Search = () => {

    var params = useParams()
    var searched_value = params.searched_item
    var [district, setDistrict] = useState([])
    var [title, setTitle] = useState([])
    var [name, setName] = useState([])
    
    useEffect(async()=>{

        var {data} = await axios.post('http://localhost:8000/general/search/search_item', {searched_value})
        
        setDistrict(data.data.district_rows)
        setTitle(data.data.title_rows)
        setName(data.data.name_rows)

        console.log(data.data)
    }, [params])

    return(
        <Fragment>
            <h1 className="text-center common-header">Search results</h1>
            <div className="container">
                    {
                        district.length > 0 ? <div className="row">
                        <h3 className="common_sub_header">Bakers District</h3>
                        {
                            district.map((item) => {
                                return(
                                    <div className="col-md-3 col">
                                            <Link to={`/profiles/cakemaker/${item.cake_makers_id}`} className="text-decoration-none">
                                        <div className= 'search_item row'>
                                            <div className="search_item_avatar col-5">
                                                <img className="img-fluid search_img" src={item.profile_picture} />
                                            </div>
                                            <div className="search_item_content col-6">
                                                <span className="search_item_message">{item.district}</span>
                                            </div>
                                        </div>
                                    </Link>
                                    </div>
                                )
                            })
                        }
                    <hr className="mt-2"/>
                    </div> : <></>
                    }
                    {
                        name.length > 0 ? <div className="row">
                        <h3 className="common_sub_header">Bakers Names</h3>
                        {
                            name.map((item) => {
                                return(
                                    <div className="col-md-3 col">
                                            <Link to={`/profiles/cakemaker/${item.cake_makers_id}`} className="text-decoration-none">
                                        <div className= 'search_item row'>
                                            <div className="search_item_avatar col-5">
                                                <img className="img-fluid search_img" src={item.profile_picture} />
                                            </div>
                                            <div className="search_item_content col-6">
                                                <span className="search_item_message">{item.name}</span>
                                            </div>
                                        </div>
                                    </Link>
                                    </div>
                                )
                            })
                        }
                    
                    <hr className="mt-2"/></div> : <></>
                    }
                    {
                        title.length > 0 ? <div className="row">
                        <h3 className="common_sub_header">Cake Designs</h3>
                        {
                            title.map((item) => {
                                return(
                                    <div className="col-md-3 col">
                                            <Link to={`/designs/details/${item.design_id}`} className="text-decoration-none">
                                        <div className= 'search_item row'>
                                            <div className="search_item_avatar col-5">
                                                <img id="search_title_img" src={item.image} />
                                            </div>
                                            <div className="search_item_content col-6">
                                                <span className="search_item_message">{item.title}</span>
                                            </div>
                                        </div>
                                    </Link>
                                    </div>
                                )
                            })
                        }
                    </div> : <></>
                    }
                </div>
        </Fragment>
    )
}

export default Search