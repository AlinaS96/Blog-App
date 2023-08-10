import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import './blog.css'
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const Blog = () => {
    const location = useLocation();
    const navigate =useNavigate()
    const url =  "http://localhost:8800"
    const PF = url + "/uploads/"
    const id = location.pathname.split('/')[2]
    
    const [blog,setBlog] = useState([])
    const [username, setUsername] = useState('')
    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await axios.get(`${url}/blogs/find/${id}`)
            setBlog(res.data)
            return res.data
        }
        fetchData();
        const fetchUsername = async ()=>{
            try{
                const blog = await fetchData()
                const res = await axios.get(`${url}/users/${blog.user}`)
                setUsername(res.data)
            }catch(err){console.log(err)}
        }
        fetchUsername();
    // },[`${location.pathname}`])
},[id])
   

    const diff = new Date().getTime() - new Date(blog.createdAt).getTime(); let timeInDays = diff/(1000*60*60*24);
    const dayOrHour = timeInDays<1
    if(dayOrHour){
        timeInDays=Math.floor(timeInDays*24) 
    }

    const handleEdit =()=>{
        navigate('/newPost', {state:{blog}})
    }

    const handleDelete = async ()=>{
        try{ 
            const config = {
                headers: {"Content-Type": "application/json",},
                withCredentials: true
            }
           await axios.delete(url+`/blogs/${id}`,config)
           navigate('/')
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className='blog' id={blog._id}>
            <div className="blogImg">
                <img src={PF+blog.image} alt="" />
            </div>
            <div className="title">
                <div className="blogTitle">
                    <h1>{blog.title}</h1>
                    <div className="icons">
                        <FontAwesomeIcon onClick={handleEdit} className="icon" icon={faPenToSquare} />
                        <FontAwesomeIcon onClick={handleDelete} className="icon" icon={faTrash} />
                    </div>
                </div>

            </div>
            <div className="postInfo">
                <span className="author">Author:<b>{username}</b></span>
                <span className="time">{timeInDays} {dayOrHour?' hours ago':' days ago'}</span>
            </div>
            <p>{blog.desc}</p>
        </div>
    )
}

export default Blog
