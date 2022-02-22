import axios from 'axios';
import { useEffect, useState } from 'react';

const AdminCustomer = () => {

    var [row, setRow] = useState([])
    var i = 0;
    var [msg, setMsg] = useState('')

   useEffect(async()=>{
        var {data} = await axios.post('http://localhost:8000/admin/customer_details')
        
        console.log(data)
        if (data.isLog) {
                if (data.success) {
                    setRow(data.data)
                }else{
                    setMsg(data.msg)

                }
        }else{
            setMsg(data.msg)
        }

   }, [])

    return(
        <div>
            <h1>Customer Details</h1>
            {
                msg.length > 0 ? <p className='common-error-msg'>{msg}</p> : <></>
            }
            <div className="admin-table">
                <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col"></th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Contact Number</th>
                    {/* <th scope="col">Warn</th> */}
                    {/* <th scope="col">Delete</th> */}
                    </tr>
                </thead>
                <tbody>
                   {
                       row.map((item)=>{
                            i++; 
                           console.log(row.length)
                           return(
                                <tr>
                                    <th scope="row">{i}</th>
                                    <td>{item.cus_id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
                                    <td>0{item.contact_num}</td>
                                    {/* <td><button className='btn btn-warning'>Warn</button></td> */}
                                    {/* <td><button className='btn btn-danger'>Delete</button></td> */}
                                </tr>
                           )
                       })
                   }
                    {/* <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                    </tr> */}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default AdminCustomer

