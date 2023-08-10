import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import './update.css'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useContext } from 'react'
import { Context } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
const Update = () => {
    const [updatePicture, setUpdatePicture] = useState(null)
    const [updateEmail, setUpdateEmail] = useState('')
    const [updateUsername, setUpdateUsername] = useState('')
    const [updatePassword, setUpdatePassword] = useState('')
    const navigate = useNavigate()
    const { user } = useContext(Context); 
    const handleUserSubmit = async (e) => {
        e.preventDefault();
        const updateUser = { updateUsername, updateEmail, updatePassword }
        if (updatePicture) {
            const data = new FormData();
            console.log(updatePicture)
            const filename = Date.now() + updatePicture.name
            data.append("name", filename)
            data.append("image", updatePicture)
            updateUser.picture = filename

            try {
                await axios.post("http://localhost:8800/api/upload", data)
            } catch (err) { }
        }
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            }
            await axios.put(`http://localhost:8800/users/${user.details._id}`,
                {
                    picture: updateUser.picture,
                    email: updateUser.updateEmail,
                    username: updateUser.updateUsername,
                    password: updateUser.updatePassword
                },
                config)
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
            navigate('/')
        } catch (err) { }
        console.log(updateUser)
    }
   
    const deleteClick=()=>{
        try{
            const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        }
            axios.delete(`http://localhost:8800/users/${user.details._id}`)
                .then(res=>{console.log(res)})
                .catch(err=>{console.log(err)})
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className='update'>
            <h1>Update Your Account</h1>
            <button className='deleteBtn' onClick={deleteClick}>Delete Account</button>
            <form onSubmit={handleUserSubmit}>
                <div className="updateForm">
                    <div className="profilePic">
                        <span>Profile Picture</span>
                        <div className="formImage">
                            {updatePicture && <img src={URL.createObjectURL(updatePicture)} alt="" />}
                            <form method="POST" encType="multipart/form-data" className="imgForm">
                                <label htmlFor="imgInput" ><FontAwesomeIcon icon={faCircleUser} style={{ color: "tomato", fontSize: 24, cursor: "pointer" }} /></label>
                                <input type="file" onChange={e => { setUpdatePicture(e.target.files[0]) }} name="image" id="imgInput" style={{ display: "none" }} />
                            </form>
                        </div>
                    </div>
                    <div className="username">
                        <span>Username</span>
                        <input type="text" placeholder='john' onChange={e => { setUpdateUsername(e.target.value) }} value={updateUsername} />
                    </div>
                    <div className="email">
                        <span>Email</span>
                        <input type="email" placeholder='john@gmail.com' onChange={e => { setUpdateEmail(e.target.value) }} value={updateEmail} />
                    </div>
                    <div className="password">
                        <span>Password</span>
                        <input type="password" placeholder='password' onChange={e => { setUpdatePassword(e.target.value) }} value={updatePassword} />
                    </div>
                </div>
                <div className="Btn">
                    <button className='updateBtn' type='submit'>Update</button>
                </div>
            </form>
        </div>
    )
}

export default Update
