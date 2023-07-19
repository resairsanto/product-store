function NavbarItem() {
   return (
      <>
         <nav className="navbar navbar-expand-lg bg-body-white border-bottom">
            <div className="container">
               <a className="navbar-brand" href="#">Product Store</a>
               <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="navbarText">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                     <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Home</a>
                     </li>
                  </ul>
                  <span className="navbar-text">
                     Logout <i className="bi bi-box-arrow-right"></i>
                  </span>
               </div>
            </div>
         </nav>
      </>
   )
}

export default NavbarItem