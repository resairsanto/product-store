import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { submitLogin } from "../store/actions/actionCreator"
import { useDispatch, useSelector } from "react-redux"

function LoginPage() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { preloader } = useSelector(state => state.preloader)
   const [form, setForm] = useState({
      email: '',
      password: ''
   })

   function handleChange(e) {
      setForm({
         ...form,
         [e.target.name]: e.target.value
      })
   }

   async function handleLogin(e) {
      e.preventDefault()
      await dispatch(submitLogin(form))
      setForm({
         email: '',
         password: ''
      })
      navigate("/")
   }

   return (
      <>
         {preloader && <div className="preloader"></div>}
         <div className="container top-margin">
            <div className="row justify-content-center">
               <div className="col-md-5 bg-white shadow pt-3 pb-3 rounded-1 ps-5 pe-5">
                  <div className="text-center custom-font mt-4">
                     <h3>SIGN <span className="text-primary">IN</span></h3>
                  </div>
                  <form onSubmit={handleLogin}>
                     <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label custom-font" >Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="example@mail.com" name="email" onChange={handleChange} />
                        <p className="text-danger">email test: user@gmail.com</p>
                     </div>
                     <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label custom-font">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="******" onChange={handleChange} />
                        <p className="text-danger">password test: 12345</p>
                     </div>
                     <button type="submit" className="form-control btn btn-primary mb-3">Sign In</button>
                  </form>
                  <div className="text-center mb-3">
                     Not a member? <Link to="/register" style={{ textDecoration: 'none' }}>Register</Link>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default LoginPage