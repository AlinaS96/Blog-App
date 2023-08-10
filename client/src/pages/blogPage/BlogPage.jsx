import Sidebar from "../../components/sidebar/Sidebar"
import Blog from "../../components/blog/Blog"
import './blogPage.css'
const BlogPage = () => {
  return (
    <div className="blogPage">
      <div className="blog">
      <Blog/>
      </div>
      <div className="sidebar">
      <Sidebar/>
      </div>
    </div>
  )
}

export default BlogPage
