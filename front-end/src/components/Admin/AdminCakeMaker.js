import axios from 'axios';
import { useEffect, useState } from 'react';

const AdminCakeMaker = () => {

    var [row, setRow] = useState([])
    var i = 0;
    var [msg, setMsg] = useState('')

   useEffect(async()=>{
        let {data} = await axios.get('http://localhost:8000/general/profiles')
        
        console.log(data)
        if (data.isLog) {
                setRow(data.data)
                setMsg(data.msg)
        }else{
            setMsg(data.msg)
        }

   }, [])

   const cakemakerWarn = async(current_warnings, cake_makers_id) => {
        var warn = current_warnings + 1
        let {data} = await axios.post('http://localhost:8000/admin/warn', {warn, cake_makers_id})
            
        setMsg(data.msg)
        window.location.reload(true)
   }

    return(
        <div>
            <h1>Cake Maker Details</h1>
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
                    <th scope="col">District</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">Warn</th>
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
                                    <td>{item.cake_makers_id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.district}</td>
                                    <td>0{item.contact_num}</td>
                                    <td><button className='btn btn-warning' onClick={()=>{cakemakerWarn(item.warning, item.cake_makers_id)}}>Warn</button></td>
                                    {/* <td><button className='btn btn-danger'>Delete</button></td> */}
                                </tr>
                           )
                       })
                   }
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default AdminCakeMaker

