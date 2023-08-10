import Sidebar from '../../components/sidebar/Sidebar'
import Update from '../../components/update/Update'
import './settings.css'

const Settings = () => {
  return (

    <div className='settings'>
      <div className="update"><Update/></div>
      <div className="sidebar"><Sidebar/></div>
    </div>
  )
}

export default Settings
