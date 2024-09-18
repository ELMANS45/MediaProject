import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { UserContext } from '../../Context/UserContext'
import Loading from '../Loading/Loading'
import toast from 'react-hot-toast'

export default function ChangePassword() {
    const {setUser,user}  = useContext(UserContext)
    const [error, setError] = useState(null)
    const [load, setLoad] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const token = user
    useEffect(()=>{
      const timer = setTimeout(()=>{
          setLoading(false)
      },4000)
      return ()=>clearTimeout(timer)
  },[])
    async function Change(values){
        try{
          console.log(values)
            setLoad(true)
            let { data } = await axios.patch('https://linked-posts.routemisr.com/users/change-password',values,{
                headers:{token}
            })
            localStorage.setItem('userToken',data.token)
            toast.success(data.message)
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
        password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long').matches(/[A-Z]/, 'Password must contain at least one uppercase letter').matches(/[a-z]/, 'Password must contain at least one lowercase letter').matches(/\d/, 'Password must contain at least one digit').matches(/[@#$%^&*]/, 'Password must contain at least one special character'),
      newPassword: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long').matches(/[A-Z]/, 'Password must contain at least one uppercase letter').matches(/[a-z]/, 'Password must contain at least one lowercase letter').matches(/\d/, 'Password must contain at least one digit').matches(/[@#$%^&*]/, 'Password must contain at least one special character'),
    })
    const formik = useFormik({
      initialValues : {
        password:'',
        newPassword:'',
      }, validationSchema : validationSchema,
        onSubmit:Change
    })
    return (
      <>
          {loading ? <Loading/> : <div className="container h-screen my-auto mt-7">
          <h1 className='text-3xl text-center mb-7'>Change Password</h1>
          {error&&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                    {error}
              </div>}
          <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
                          <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input onChange={formik.handleChange} type="password" name='password' value={formik.values.password} id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="" required />
                            {formik.errors.password&& formik.touched.password &&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                              {formik.errors.password}
                            </div>}
                          </div>
                          <div className="mb-5">
                            <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your newPassword</label>
                            <input onChange={formik.handleChange} type="password" name='newPassword' value={formik.values.newPassword} id="newPassword" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                            {formik.errors.newPassword&& formik.touched.newPassword &&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                              {formik.errors.newPassword}
                            </div>}
                          </div>
                      <button type="submit" className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">{load ? <i className='fas fa-spinner fa-spin-pulse'></i> : 'Change'}</button>
                  </form>
          </div>}
      </>
    )
}
