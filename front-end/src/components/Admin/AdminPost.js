import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminViewPost from './AdminViewPost';

const AdminPost = ({table}) => {

    var [row, setRow] = useState([])
    var i = 0;
    var [msg, setMsg] = useState('')
    var navigate = useNavigate()
    var [content, setContent] = useState('post')
    var [postId, setPostId] = useState('')
    var [approve, setApprove] = useState(0)
    

   useEffect(async()=>{
        var {data} = await axios.get('http://localhost:8000/admin/posts/show_all_posts')

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
    
    const approveOnClick = async(post_id, i) => {
        console.log(post_id)
        var {data} = await axios.post('http://localhost:8000/admin/posts/give_approve', {post_id})
        
        var element = document.getElementById(i)
        console.log("element: ",document.getElementById(i))
        element.classList.add('disabled')
        element.classList.add('btn-success')

        if (data.isLog) {
            setMsg(data.msg)
        }else{
            setMsg(data.msg)
        }
   }
    const deleteOnClick = async(id,id_name, table_name) => {
        var {data} = await axios.post('http://localhost:8000/general/delete_row', {id, id_name, table_name})
        
        if (data.isLog) {
            // window.location.reload(true)
            setMsg(data.msg)
        }else{
            setMsg(data.msg)
        }
   }

   const viewPost = (y) => {
    table('view_post',y)
   }

    return(
        <div>
            
            {/* { content == 'post' ?  */}
                <>
                <h1 className='admin-common-header'>Post Details</h1>
            {
                msg.length > 0 ? <p className='common-error-msg'>{msg}</p> : <></>
            }
            <div className="admin-table">
                <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col"></th>
                    <th scope="col">Post ID</th>
                    <th scope="col">Post Name</th>
                    <th scope="col">Cakemaker Name</th>
                    <th scope="col">Approve</th>
                    <th scope="col">Delete</th>
                    <th scope="col">View</th>
                    </tr>
                </thead>
                <tbody>
                   {
                       row.map((item, index)=>{

                        i++; 
                        
                           return(
                                <tr>
                                    <th scope="row">{i}</th>
                                    <td>{item.post_id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.name}</td>
                                    {
                                        item.approve == 0 ? 
                                        <td><button id={`${i}`} className='btn btn-primary' onClick={()=>{approveOnClick(item.post_id, (index+1))}}>Approve</button></td> : 
                                        <td><button className='btn btn-success disabled' >Approve</button></td>
                                    }
                                    <td><button className='btn btn-danger' onClick={()=>{deleteOnClick(item.post_id, 'post_id', 'posts')}}>Delete</button></td>
                                    
                                    <td><button className='btn btn-primary' onClick={()=>{viewPost(item.post_id)}}>View</button></td>
                                </tr>
                           )
                       })
                   }
                </tbody>
            </table>
            </div>
                </> 
                {/* :  content == 'overview' ? <AdminViewPost post_id = {postId}/> : <></> */}
            {/* } */}
        </div>
    )
}

export default AdminPost

