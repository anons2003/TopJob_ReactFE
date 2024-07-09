import "./list.scss"
import Sidebar from "../../components/sidebar/SidebarA"
import Navbar from "../../components/navbar/Navbar"
import DatatableEn from "../../components/datatable/DatatableEn"

const ListUsers = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableEn/>
      </div>
    </div>
  )
}

export default ListUsers;