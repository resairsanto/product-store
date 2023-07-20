import { useEffect, useState, useRef } from "react"
import {
   createProduct,
   deleteProduct,
   editProduct,
   fetchProductDetail,
   fetchProducts,
   uploadImage
} from "../store/actions/actionCreator"
import { useDispatch, useSelector } from "react-redux"
import SearchBarItem from "./SearchBarItem"

function ProductTable() {
   const dispatch = useDispatch()
   const fileInputRef = useRef(null)
   const { products } = useSelector(state => state.product)
   const { productDetail } = useSelector(state => state.productDetail)
   const [currentPage, setCurrentPage] = useState("1")
   const [imageOk, setImageOk] = useState("")
   const [form, setForm] = useState({
      image: null,
      name: "",
      purchasePrice: 0,
      sellPrice: 0,
      stock: 0
   })
   const [messageError, setMessageError] = useState([])
   const [pageName, setPageName] = useState("")
   const count = Math.ceil(products.count / 5)
   const pageNumber = Array.from({ length: count })
   const startNumber = (parseInt(currentPage) - 1) * 5 + 1

   useEffect(() => {
      dispatch(fetchProducts(currentPage))
   }, [])

   useEffect(() => {
      if (productDetail !== "") {
         setForm({
            ...form,
            image: productDetail.image,
            name: productDetail.name,
            purchasePrice: productDetail.buyPrice,
            sellPrice: productDetail.sellPrice,
            stock: productDetail.stock
         })
      }
   }, [productDetail])

   const handleInputChange = (e) => {
      let temp = { ...form }
      temp[e.target.name] = e.target.value

      let tempError = ["", "", "", ""]
      if (isNaN(temp.purchasePrice)) {
         tempError[1] = "Input must be a number."
      }

      if (isNaN(temp.sellPrice)) {
         tempError[2] = "Input must be a number."
      }

      if (isNaN(temp.stock)) {
         tempError[3] = "Input must be a number."
      }

      if (temp.image && e.target.type === "file") {
         const file = e.target.files[0]
         if (file) {
            const fileSize = file.size / 1024
            if (fileSize > 100) {
               tempError[0] = "Max image size is 100KB"
               setImageOk("")
            } else if (file.type !== "image/jpeg" && file.type !== "image/png") {
               tempError[0] = "Image format must be JPG or PNG"
               setImageOk("")
            } else {
               const formUploadImage = new FormData()
               formUploadImage.append("image", file)
               uploadImage(formUploadImage)
                  .then((imageUrl) => {
                     temp.image = imageUrl;
                     setForm(temp);
                  })
                  .catch((error) => {
                     console.log(error);
                  });
               setImageOk("ok")
            }
         }
      }

      setForm(temp)
      setMessageError(tempError)
   }

   function showModal() {
      setPageName("addProduct")
      setForm({
         image: null,
         name: "",
         purchasePrice: 0,
         sellPrice: 0,
         stock: 0
      })
      fileInputRef.current.value = null;
   }

   const createSubmitProduct = async (e) => {
      e.preventDefault()
      let messageLength = messageError.join("").length
      if (messageLength === 0) {
         if (pageName === "addProduct") {
            await dispatch(createProduct(form))
            setForm({
               image: null,
               name: "",
               purchasePrice: 0,
               sellPrice: 0,
               stock: 0
            })
            dispatch(fetchProducts(currentPage))
         } else if (pageName === "editProduct") {
            await dispatch(editProduct(form, productDetail.id))
            setForm({
               image: null,
               name: "",
               purchasePrice: 0,
               sellPrice: 0,
               stock: 0
            })
            dispatch(fetchProducts(currentPage))
         }

      } else {
         setForm({
            image: null,
            name: "",
            purchasePrice: 0,
            sellPrice: 0,
            stock: 0
         })
         setMessageError([])
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Input format is not valid!',
         })
      }
   }

   const getProductDetail = async (id) => {
      fileInputRef.current.value = null;
      setPageName("editProduct")
      await dispatch(fetchProductDetail(id))
   }

   const handleDeleteProduct = (id) => {
      Swal.fire({
         title: 'Are you sure to delete this item?',
         showDenyButton: true,
         showCancelButton: true,
         confirmButtonText: 'Delete',
         denyButtonText: `Don't Delete`,
      }).then(async (result) => {
         if (result.isConfirmed) {
            await dispatch(deleteProduct(id))
            dispatch(fetchProducts(currentPage))
            Swal.fire('Deleted!', '', 'success')
         } else if (result.isDenied) {
            Swal.fire('Canceled delete this item', '', 'info')
         }
      })
   }

   const handlePageByNum = (num) => {
      const selectedPage = (num).toString()
      setCurrentPage(selectedPage)
      dispatch(fetchProducts(selectedPage))
   }

   const handlePageByNext = () => {
      const selectedPage = (Number(currentPage) + 1).toString()
      setCurrentPage(selectedPage)
      dispatch(fetchProducts(selectedPage))
   }

   const handlePageByPrevious = () => {
      const selectedPage = (Number(currentPage) - 1).toString()
      setCurrentPage(selectedPage)
      dispatch(fetchProducts(selectedPage))
   }

   if (products.length === 0) {
      return (
         <>
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-md-10 text-center">
                     <h1>Loading...</h1>
                  </div>
               </div>
            </div>
         </>
      )
   }

   return (
      <>

         <div className="container-fluid top-margin">

            <div className="row justify-content-center mb-3">
               <div className="col-md-2">
                  <button type="button" className="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={showModal}>
                     <i className="bi bi-plus-circle"></i> Add Product
                  </button>
               </div>
               <SearchBarItem />
            </div>

            <div className="row justify-content-center">
               <div className="col-md-10">
                  <table className="table">
                     <thead className="table-dark">
                        <tr>
                           <th scope="col" style={{ width: "5%" }}>No.</th>
                           <th scope="col">Image</th>
                           <th scope="col">Name</th>
                           <th scope="col">Purchase Price</th>
                           <th scope="col">Sell Price</th>
                           <th scope="col">Stock</th>
                           <th scope="col">Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        {products.rows.map((el, i) => (
                           <tr key={el.id}>
                              <th scope="row">{i + startNumber}</th>
                              <td>{<img src={el.image} alt={el.name} style={{ width: '7rem' }} />}</td>
                              <td>{el.name}</td>
                              <td>Rp. {el.buyPrice.toLocaleString()}</td>
                              <td>Rp. {el.sellPrice.toLocaleString()}</td>
                              <td>{el.stock}</td>
                              <td>
                                 <button className="btn btn-warning btn-sm" onClick={() => getProductDetail(el.id)} data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="bi bi-pencil"></i></button>
                                 <button className="btn btn-danger btn-sm ms-1" onClick={() => handleDeleteProduct(el.id)}><i className="bi bi-trash"></i></button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

            <div className="row justify-content-center">
               <div className="col-md-10">
                  <nav aria-label="Page navigation example">
                     <ul className="pagination">
                        <li className="page-item">
                           <a
                              className={`page-link ${parseInt(currentPage) === 1 ? "disabled" : ""}`}
                              href="#"
                              onClick={handlePageByPrevious}
                           >
                              Previous
                           </a>
                        </li>
                        {pageNumber.map((el, i) => (
                           <li key={i} className="page-item">
                              <a
                                 className={`page-link ${i + 1 === parseInt(currentPage) ? "active" : ""}`}
                                 href="#"
                                 onClick={() => handlePageByNum(i)}
                              >
                                 {++i}
                              </a>
                           </li>
                        ))}
                        <li className="page-item">
                           <a
                              className={`page-link ${parseInt(currentPage) === count ? "disabled" : ""}`}
                              href="#"
                              onClick={handlePageByNext}
                           >
                              Next
                           </a>
                        </li>
                     </ul>
                  </nav>
               </div>
            </div>
         </div>

         <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     {pageName === "addProduct" && <h1 className="modal-title fs-5" id="exampleModalLabel">Add Product</h1>}
                     {pageName === "editProduct" && <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Product</h1>}
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                     <form onSubmit={createSubmitProduct} type="submit">
                        <div className="mb-3">
                           <label htmlFor="exampleInputEmail1" className="form-label">Image</label>
                           <input type="file" ref={fileInputRef} className="form-control" name="image" onChange={handleInputChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                           {messageError[0] && <p className="text-danger">{messageError[0]}</p>}
                           {imageOk && <p className="text-primary"><i className="bi bi-check-circle"></i></p>}
                        </div>
                        <div className="mb-3">
                           <label htmlFor="name" className="form-label">Name</label>
                           <input type="text" className="form-control" value={form.name} name="name" onChange={handleInputChange} id="name" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                           <label htmlFor="purchasePrice" className="form-label">Purchase Price</label>
                           <input type="text" className="form-control" value={form.purchasePrice} name="purchasePrice" onChange={handleInputChange} id="purchasePrice" aria-describedby="emailHelp" />
                           {messageError[1] && <p className="text-danger">input must be a number</p>}
                        </div>
                        <div className="mb-3">
                           <label htmlFor="sellPrice" className="form-label">Sell Price</label>
                           <input type="text" className="form-control" value={form.sellPrice} name="sellPrice" onChange={handleInputChange} id="sellPrice" aria-describedby="emailHelp" />
                           {messageError[2] && <p className="text-danger">input must be a number</p>}
                        </div>
                        <div className="mb-3">
                           <label htmlFor="stock" className="form-label">Stock</label>
                           <input type="text" className="form-control" value={form.stock} name="stock" onChange={handleInputChange} id="stock" aria-describedby="emailHelp" />
                           {messageError[3] && <p className="text-danger">input must be a number</p>}
                        </div>
                        <div className="modal-footer mt-4">
                           <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                           <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default ProductTable