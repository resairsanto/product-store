import { useState } from "react"

function LoginPage() {
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

   return (
      <>
         <div className="container top-margin">
            <div className="row justify-content-center">
               <div className="col-md-5 bg-white shadow pt-3 pb-3 rounded-1 ps-5 pe-5">
                  <div className="text-center custom-font mt-4">
                     <h3>SIGN <span className="text-primary">IN</span></h3>
                  </div>
                  <form>
                     <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label custom-font" >Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="example@mail.com" name="email" onChange={handleChange} />
                     </div>
                     <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label custom-font">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="******" onChange={handleChange} />
                     </div>
                     <button type="submit" className="form-control btn btn-primary mb-3">Submit</button>
                  </form>
                  <div className="text-center mb-3">
                     Not a member? Register
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default LoginPage