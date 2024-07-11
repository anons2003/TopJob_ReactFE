import "./list.scss"
<<<<<<< HEAD
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatatableTransaction from "../../components/datatable/DatatableTransaction"

const ListTransaction= () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
      <DatatableTransaction/>
      </div>
    </div>
  )
=======
import Sidebar from "../../components/sidebar/SidebarA"
import Navbar from "../../components/navbar/Navbar"
import DatatableTransaction from "../../components/datatable/DatatableTransaction"

const ListTransaction = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <DatatableTransaction />
            </div>
        </div>
    )
>>>>>>> longVQH
}

export default ListTransaction;