import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faSquareFacebook, faSquareInstagram, faSquarePinterest, faSquareTwitter } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
import './topBar.css'
import { useContext } from 'react'
import { Context } from '../../context/authContext'

const TopBar = () => {
  const {user,dispatch} = useContext(Context);
  const handleLogout =()=>{
    dispatch({type:"LOGOUT"})
  }
  console.log(user)
  return (
    <div className="topbar">
      <div className="socials">
        <FontAwesomeIcon icon={faSquareFacebook} />
        <FontAwesomeIcon icon={faSquareInstagram} />
        <FontAwesomeIcon icon={faSquarePinterest} />
        <FontAwesomeIcon icon={faSquareTwitter} />
      </div>
      <div className="tpOptions">
        <ul className="tpOptions">
          <Link to="/" style={{ color: "gray", textDecoration: "none", fontFamily: "Josefin Sans" }}>
            <li>HOME</li>
          </Link>
          <li>ABOUT</li>
          <li>CONTACT</li>
          <Link to="/newPost">
            <li>WRITE</li>
          </Link>
          {user && <li onClick={handleLogout}>LOGOUT</li>}
        </ul>
      </div>
      <div className="tpSearch">
        <Link to="/settings">
          <div className="userIcon">
            {
              user ? (
              <img src={user.details?.picture} alt="" />
              ) : (
              <ul className='tpOptions'>
                <li>
                  <Link to="/register" style={{ textDecoration: "none", color: "gray" }}>REGISTER</Link>
                </li>
                <li>
                  <Link to="/login" style={{ textDecoration: "none", color: "gray" }}>LOGIN</Link>
                </li>
              </ul>
              )
            }
          </div>
        </Link>
        <div className="search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      </div>
    </div>
  )
}

export default TopBar
