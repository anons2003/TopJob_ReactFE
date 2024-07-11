import "./list.scss"
<<<<<<< HEAD
import Sidebar from "../../components/sidebar/Sidebar"
=======
import Sidebar from "../../components/sidebar/SidebarA"
>>>>>>> longVQH
import Navbar from "../../components/navbar/Navbar"
import DatatableAdmin from "../../components/datatable/DatatableAdmin"

const ListAdmins = () => {
<<<<<<< HEAD
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableAdmin/>
      </div>
    </div>
  )
=======
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <DatatableAdmin />
            </div>
        </div>
    )
>>>>>>> longVQH
}

export default ListAdmins;