import { useState } from "react"
import { fetchFilteredProducts } from "../store/actions/actionCreator"
import { useDispatch } from "react-redux"

function SearchBarItem() {
   const dispatch = useDispatch()
   const [inputSearch, setInputSearch] = useState("")

   function handleInputChange(e) {
      setInputSearch(e.target.value)
   }

   function submitSearch(e) {
      e.preventDefault()
      dispatch(fetchFilteredProducts(inputSearch))
      setInputSearch("")
   }
   return (
      <>
         <div className="col-md-8">
            <form className="d-flex" role="search" onSubmit={submitSearch}>
               <input
                  className="form-control me-2"
                  name="inputSearch"
                  value={inputSearch}
                  onChange={handleInputChange}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
               />
               <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
         </div>
      </>
   )
}

export default SearchBarItem