import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './pages/home/Home';
import TopBar from './components/topBar/TopBar';
import BlogPage from './pages/blogPage/BlogPage';
import Settings from './pages/settings/Settings';
import NewPost from './components/newPost/NewPost';
import Login from './pages/login/Login';
import Register from './pages/register/Register'
import { useContext } from 'react';
import { Context } from './context/authContext';

function App() {
  const {user} = useContext(Context);
  
  return (
    <>
    <BrowserRouter>
    <TopBar/>
      <Routes>
        <Route exact path="/" element={user?<Home />:<Register/>} />
        <Route path="/post/:postId" element={<BlogPage/>} />
        <Route  path="/settings" element={user?<Settings />:<Register/>} />
        <Route  path="/newPost" element={user?<NewPost />:<Register/>} />
        <Route  path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
