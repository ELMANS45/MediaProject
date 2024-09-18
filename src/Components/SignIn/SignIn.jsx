import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { UserContext } from '../../Context/UserContext'
import Loading from '../Loading/Loading'
export default function SignIn() {
  const {setUser}  = useContext(UserContext)
  const [error, setError] = useState(null)
  const [load, setLoad] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(()=>{
    const timer = setTimeout(()=>{
        setLoading(false)
    },4000)
    return ()=>clearTimeout(timer)
},[])
  async function signIn(values){
      try{
        console.log(values)
          setLoad(true)
          let { data } = await axios.post('https://linked-posts.routemisr.com/users/signin',values)
          localStorage.setItem('userToken',data.token)
          setUser(data.token)
          navigate('/')
          setLoad(false)
      }
      catch(e) {
        setError(e.message);
        setLoad(false)
      }      
  }
  let validationSchema = Yup.object().shape({
    email : Yup.string().email('Invaild Email').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long').matches(/[A-Z]/, 'Password must contain at least one uppercase letter').matches(/[a-z]/, 'Password must contain at least one lowercase letter').matches(/\d/, 'Password must contain at least one digit').matches(/[@#$%^&*]/, 'Password must contain at least one special character'),
  })
  const formik = useFormik({
    initialValues : {
      email:'',
      password:'',
    }, validationSchema : validationSchema,
      onSubmit:signIn
  })
  return (
    <>
        {loading ? <Loading/> : <div className="container h-screen mt-20">
        <h1 className='text-3xl text-center'>Sign in</h1>
        {error&&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                  {error}
            </div>}
        <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
                        <div className="mb-5">
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                          <input onChange={formik.handleChange} type="email" name='email' value={formik.values.email} id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="" required />
                          {formik.errors.email&& formik.touched.email &&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            {formik.errors.email}
                          </div>}
                        </div>
                        <div className="mb-5">
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                          <input onChange={formik.handleChange} type="password" name='password' value={formik.values.password} id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                          {formik.errors.password&& formik.touched.password &&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            {formik.errors.password}
                          </div>}
                        </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{load ? <i className='fas fa-spinner fa-spin-pulse'></i> : 'Sign in'}</button>
                </form>
        </div>}
    </>
  )
}