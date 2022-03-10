import axios from 'axios';
import {Link} from 'react-router-dom';
import {React, Fragment, useEffect, useState} from 'react';
import './../../css/Common/Categories.css';

const CategoriesPage = () => {

    let [row, setRow] = useState([])

    useEffect(async()=>{
        var {data} = await axios.post('http://localhost:8000/general/get_categories/categories')
        
        console.log(data)
        if (data.success) {
            setRow(data.data)
        }

    },[])
    return(
        <Fragment>
            <h1 className='text-center common-header' style={{zIndex:"3"}}>Categories</h1>
            <div className='row categories-row'>
                {
                    row.map((item) => {
                        return(
                            <div className='col-md-4 categories-col'>
                                    <Link to={`/category/selected_category/${item.name}`}>
                                    <div className='categories-img-div'>
                                        <img src={item.image} className="categories-img"/>
                                    </div>    
                                    <div className='categories-name-div'>
                                        <h5 className="categories-name">{item.name}</h5>
                                    </div>    
                            </Link>
                                </div>    
                        )
                    })
                }
            </div>
        </Fragment>
    )
}

export default CategoriesPage