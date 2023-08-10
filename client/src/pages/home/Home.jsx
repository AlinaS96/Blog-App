import { useState, useEffect, useContext } from 'react'
import Header from '../../components/header/Header'
import BlogPost from '../../components/blogPost/BlogPost'
import Sidebar from '../../components/sidebar/Sidebar'
import axios from 'axios'
import './home.css'
import { useLocation } from 'react-router-dom'
// import { CatContext } from '../../context/CatContext'

const Home = () => {
  const [blogs, setBlogs] = useState([])
  const location = useLocation()
  console.log(location)
  const url = "http://localhost:8800"

  useEffect(() => {
    const fetchData = async () => {
      console.log(location)
      try {
        
        if (location.state) {
          const res = await axios.get(url + `/blogs/?category=${location.state}`);
          setBlogs(res.data);
          console.log(res)
          // window.location.reload(false)
        } else {
          const res = await axios.get(url + '/blogs/?category=Life');
          setBlogs(res.data);
          console.log(res)
        }
        
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [location.state]);

  // const {cat} = useContext(CatContext)
  // console.log(cat)
  return (
    <div className='home'>

      <Header />
      <div className="homePosts">
        <div className="posts">
          {blogs.map(blog => (
            <BlogPost
              id={blog._id}
              image={blog.image}
              title={blog.title}
              desc={blog.desc}
              category={blog.category}
              time={blog.createdAt} />
          ))
          }
        </div>
        <div className="sidebar">
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default Home
