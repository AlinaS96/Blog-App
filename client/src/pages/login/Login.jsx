import { useState, useContext } from 'react'
import './login.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../context/authContext'

const Login = () => {
    const navigate = useNavigate()
    const [error,setError]=useState(null)
    const [loginUser, setLoginUser] = useState({
        email: "",
        password: ""
    })
    
    const { dispatch, isFetching, user} = useContext(Context)
    const handleChange = e => {
        const { name, value } = e.target
        setLoginUser({
            ...loginUser,//spread operator 
            [name]: value
        })
    }
    
    const handleClick = async () => {
        dispatch({type:"LOGIN_START"})
        try {
            const config = { headers: { "Content-Type": "application/json" }, withCredentials: true }        
            const res = await axios.post("http://localhost:8800/auth/login", loginUser, config)
            // localStorage.setItem('access_token', res.data.token);
            dispatch({type:"LOGIN_SUCCESS",payload:res.data})
            navigate("/")
        } catch (err) { console.log(err) 
            setError(err)
            dispatch({type:"LOGIN_FAILURE"})
        }
    }
    
    return (<div className='loginWrapper'>
        <Link to='/register'>
            <button className='registerBtn'>Register</button>
        </Link>
        <div className='login'>
            <h1>Login</h1>
            <div className="loginForm">
                <div className="email">
                    <span>Email</span>
                    <input name="email" type="email" placeholder='john@gmail.com' value={loginUser.email} onChange={handleChange} />
                </div>
                <div className="password">
                    <span>Password</span>
                    <input name="password" type="password" placeholder='password' value={loginUser.password} onChange={handleChange} />
                </div>

                <button onClick={handleClick}>Login</button>

                {error && <span style={{color:'red'}}>Incorrect Username or password!</span>}
            </div>

        </div>
    </div>
    )
}

export default Login
