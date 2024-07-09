import "./list.scss"
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
}

export default ListTransaction;