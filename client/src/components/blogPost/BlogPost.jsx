import React from 'react'
import './blogPost.css'
import { useNavigate } from 'react-router-dom'
const BlogPost = ( {id,image,title,desc,category,time}) => {
  const navigate=useNavigate()
  const PF = "http://localhost:8800/uploads/"
  const diff = new Date().getTime() - new Date(time).getTime();
  let timeInDays = diff/(1000*60*60*24);
  const dayOrHour = timeInDays<1
  if(dayOrHour){
    timeInDays=Math.floor(timeInDays*24) 
  }
  const handleClick=()=>{
    navigate(`/post/${id}`)
  }

  return (
    <div className='blogPost' id={id} onClick={handleClick}>
      <img src={PF+image} alt="" />
      <h1>{title}</h1>
      <span>{timeInDays} {dayOrHour? 'hours ago':'days ago'}</span>
      <span>{category}</span>
      <p>{desc}</p>
    </div>
  )
}

export default BlogPost
