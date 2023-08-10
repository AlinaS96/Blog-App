import { useState } from 'react'
import axios from 'axios'
import './newPost.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

const NewPost = () => {
    const location = useLocation()
    console.log(location)
    // if(location.state.blog){
    const blogState = location.state?.blog
    // const [blog, setBlog] = useState(
    //    { location.state?.blog.title,
    //     location.state?.blog.desc
    //     }
        // )
    const [ updateTitle, setUpdateTitle ] = useState(blogState?.title)
    const [ updateDesc, setUpdateDesc ] = useState(blogState?.desc)
    const [ updateImage, setUpdateImage ] = useState(blogState?.image)
    console.log(blogState)
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (blogState) {
             
            try{
                const config = {
                    headers: {"Content-Type": "application/json",},
                    withCredentials: true
                }
                
                const res = await axios.put(`http://localhost:8800/blogs/${blogState._id}`,{image:updateImage, title:updateTitle, desc:updateDesc},config)
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }
        else {
            const newPost = { title, desc }
            if (image) {
                const data = new FormData();
                const filename = Date.now() + image.name
                data.append("name", filename)
                data.append("image", image)
                newPost.image = filename
                console.log(newPost)
                try {
                    await axios.post("http://localhost:8800/api/upload", data)
                } catch (err) { }
            }
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        // "access_token": localStorage.getItem('access_token')
                    },
                    withCredentials: true
                }
                // console.log(localStorage.getItem('access_token'))
                await axios.post("http://localhost:8800/blogs", newPost, config)
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err))
                navigate('/')
            } catch (err) { }
        }
    }
    // const imagePath= `http://localhost:8800/uploads/${blog.image}`

    const handleImageChange = (e) => {
        if(blogState){
            setUpdateImage(e.target.files[0]) 
         }else{
        setImage(e.target.files[0])}
    }

    const handleTitleChange = (e) =>{
        if(blogState){
           setUpdateTitle(e.target.value) 
        }
        else{setTitle(e.target.value)}
    }
    const handleDescChange = (e) =>{
        if(blogState){
            setUpdateDesc(e.target.value) 
         }
         else{
        setDesc(e.target.value)
        }
    }
    let imageSrc
    // if(blogState){
    //     imageSrc = updateImage
    // }else{imageSrc = Image}
    // console.log(imageSrc)
    return (
        <form onSubmit={handleSubmit} className='newPost' encType='multipart/form-data'>
            <div className="newPostWrapper">
                {image && <img src={URL.createObjectURL(image)} alt="" />}
                <div className="postTitle">
                    <label htmlFor="fileInput" className='postLabel'>
                        <FontAwesomeIcon icon={faPlus} />
                    </label>
                    <input onChange={handleTitleChange} type="text" name='title' placeholder='Title' value={updateTitle} />
                    <input onChange={handleImageChange} name="image" type="file" accept=".png, .jpg, .jpeg" id="fileInput" style={{ display: "none" }} />
                </div>
                <div className="postDesc">
                    <input onChange={handleDescChange} type="text" name="desc" placeholder='Tell your story' value={updateDesc} />
                </div>
            </div>
            <button type="submit" className='publishBtn'>Publish</button>
        </form>
    )
}

export default NewPost
