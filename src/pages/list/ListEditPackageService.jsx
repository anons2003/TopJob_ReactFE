import "./list.scss"
<<<<<<< HEAD
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import EditPackageService from "../editPackageService/EditPackageService"

const ListEditPackageService= () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
      <EditPackageService/>
      </div>
    </div>
  )
=======
import Sidebar from "../../components/sidebar/SidebarA"
import Navbar from "../../components/navbar/Navbar"
import EditPackageService from "../editPackageService/EditPackageService"

const ListEditPackageService = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <EditPackageService />
            </div>
        </div>
    )
>>>>>>> longVQH
}

export default ListEditPackageService;