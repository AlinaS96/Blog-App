import { useState } from 'react'
import './register.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [regUser, setRegUser] = useState({
        username: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setRegUser({ ...regUser, [e.target.name]: e.target.value })
    }

    const handleClick = () => {
        const { name, email, password } = regUser
        
            axios.post('http://localhost:8800/auth/register', regUser)
                .then(() => { navigate('/login') })
                .catch(err => { console.log(err) })
        
    }

        return (
            <div className='registerWrapper'>
                <Link to="/login">
                    <button className="loginBtn">Login</button>
                </Link>
                <div className='register'>
                    <h1>Register</h1>
                    <div className="registerForm">
                        <div className="username">
                            <span>Username</span>
                            <input name="username" value={regUser.username} onChange={handleChange} type="text" placeholder='john' />
                        </div>
                        <div className="email">
                            <span>Email</span>
                            <input type="email" name="email" value={regUser.email} onChange={handleChange} placeholder='john@gmail.com' />
                        </div>
                        <div className="password">
                            <span>Password</span>
                            <input type="password" name="password" value={regUser.password} onChange={handleChange} placeholder='password' />
                        </div>
                        <button onClick={handleClick}>Register</button>
                    </div>
                </div>
            </div>
        )
    }

    export default Register
