import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareFacebook, faSquareInstagram, faSquarePinterest, faSquareTwitter } from '@fortawesome/free-brands-svg-icons'
import './sidebar.css'
import axios from 'axios'
import {  useState } from 'react'
// import { CatContext } from '../../context/CatContext'
import { Link, useNavigate } from 'react-router-dom'
const Sidebar = () => {
    const categories = ['Life','Music','Sport','Style','Tech','Drama']
    const navigate = useNavigate()
    // const {dispatch} =useContext(CatContext)
    const handleClick =  (cat) =>{
        // const res = await axios.get(`http://localhost:8800/blogs/?category=${cat}`)
        // // dispatch({type:"NEW_CAT", payload:{res}})
        // console.log(res)
        navigate('/', {state:cat})
    }
    return (
        <div className='sidebar'>
            <div className="aboutSection">
                <h1>ABOUT ME</h1>
                <img src="https://images.unsplash.com/photo-1519915149845-399e7e57e3c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d29tYW4lMjBob2xkaW5nJTIwZmxvd2Vyc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" alt="" />
                <p className='aboutDesc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel egestas dolor, nec dignissim metus. Donec augue elit, rhoncus ac sodales id, porttitor vitae est. Donec laoreet rutrum libero sed pharetra. Donec vel egestas dolor, nec dignissim metus.</p>
            </div>
            <div className="categoriesSection">
                <h1>CATEGORIES</h1>
                <div className="categories">
                    <ul>
                       
                       {categories.map((cat)=>(
                    //    <Link to={`/?category=${cat}`}>
                    //    <li>{cat}</li>
                    //    </Link>
                       <li onClick={()=>handleClick(cat)}>{cat}</li>
                       )) }

                        {/* <li>Music</li>
                        <li>Sport</li>
                        <li>Style</li>
                        <li>Tech</li>
                        <li>Cinema</li> */}
                    </ul>
                </div>
            </div>
            <div className="followUsSection">
                <h1>FOLLOW US</h1>
                <div className="socials">
                    <FontAwesomeIcon icon={faSquareFacebook} />
                    <FontAwesomeIcon icon={faSquareInstagram} />
                    <FontAwesomeIcon icon={faSquarePinterest} />
                    <FontAwesomeIcon icon={faSquareTwitter} />
                </div>
            </div>

        </div>
    )
}

export default Sidebar
