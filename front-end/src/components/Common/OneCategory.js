import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

const OneCategory = () => {

    var params = useParams()
    var category_name = params.category_name
    let [row, setRow] = useState([])
    var type = localStorage.getItem('type')

    useEffect(async()=>{
         let {data} = await axios.post('http://localhost:8000/general/get_categories/one_category', {category_name})

            if (data.success) {
                setRow(data.data)
            }
        }, [])
    
    const userOnClick = () => {
        alert("You should have an account to make order")
    }
    return(
        <div>
            <h1 className="common-header text-center" style={{zIndex:"3"}}>{category_name}</h1>

            <div className="container">
                <div className='row mt-5 '>
                {
                    row.map((item) => {
                        console.log(item.title)
                        return(
                            <div className="design-container col ">
                                <div className="design-card">
                                    <div className="design-img-cover">
                                        <img src={item.image}/>
                                        {
                                            type == 'customer' || type == 'cakemaker' ? <Link to={`/orders/direct/${item.design_id}`}><div className="design-icon" >
                                            <i class="fas fa-cart-plus"></i>
                                        </div></Link> : <div className="design-icon" onClick={userOnClick}>
                                            <i class="fas fa-cart-plus"></i>
                                        </div>
                                        }
                                    </div>
                                    
                                    <div className="design-desc">
                                    <h2>{item.title}</h2>
                                    <p>{item.description}</p>
                                    </div>
                                    <Link to={`/designs/details/${item.design_id}`} className="text-decoration-none design-details-btn">Details 
                                    <i style={{paddingLeft:"10px"}} className="fas fa-angle-double-right"></i>
                                    </Link>
                                </div>
                                </div>
                        )
                    })
                }
            </div>    
            </div>
        </div>
    )
}

export default OneCategory