import { NavLink } from "react-router-dom"

function SidebarItem() {
   return (
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
         <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
            <span className="fs-4 d-none d-sm-inline fw-bold">Product Store</span>
         </a>
         <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            <li>
               <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                  <li className="w-100">
                     <NavLink to="/" className={({ isActive, isPending }) =>
                        isPending ? "nav-link" : isActive ? "nav-link px-0 text-light active ps-2 pe-2" : "nav-link px-0 text-secondary-emphasis ps-2 pe-2"}> <span className="d-none d-sm-inline"><i className="bi bi-house-fill"></i> Dashboard</span>
                     </NavLink>
                  </li>
                  <li>
                     <a href="#" className="nav-link px-0 text-secondary-emphasis ps-2 pe-2"> <span className="d-none d-sm-inline"><i className="bi bi-box-arrow-left"></i> Sign Out</span></a>
                  </li>
               </ul>
            </li>
         </ul>
      </div>
   )
}

export default SidebarItem