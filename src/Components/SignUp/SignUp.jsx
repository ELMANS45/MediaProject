import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
export default function SignUp() {
  const [error, setError] = useState(null)
  const [load, setLoad] = useState(false)
  const navigate = useNavigate()
  async function signUp(values){
      try{
        console.log(values)
          setLoad(true)
          let { data } = await axios.post('https://linked-posts.routemisr.com/users/signup',values)
          navigate('/signin')
          console.log(data.message)
          setLoad(false)
      }
      catch(e) {
        setError(e.message);
        setLoad(false)
      }      
  }
  let validationSchema = Yup.object().shape({
    name : Yup.string().min(4,'min length is 5').max(30 , 'max length is 30').required('Name is required'),
    email : Yup.string().email('Invaild Email').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long').matches(/[A-Z]/, 'Password must contain at least one uppercase letter').matches(/[a-z]/, 'Password must contain at least one lowercase letter').matches(/\d/, 'Password must contain at least one digit').matches(/[@#$%^&*]/, 'Password must contain at least one special character'),
    rePassword:Yup.string().oneOf([Yup.ref('password')], 'Should be the same password').required('Password is Required'),
    dateOfBirth:Yup.date().max(new Date(), 'Date of birth cannot be in the future').required('Date is required'),
    gender: Yup.string().oneOf(['male', 'female'], 'Gender must be either male or female').required('Gender is required'),
  })
  const formik = useFormik({
    initialValues : {
      name:'',
      email:'',
      password:'',
      rePassword : '',
      dateOfBirth : '',
      gender : ''
    }, validationSchema : validationSchema,
      onSubmit:signUp
  })
  return (
    <>
        <div className="container">
        <h1 className='text-3xl text-center'>Sign Up</h1>
        {error&&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                  {error}
            </div>}
        <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
                        <div className="mb-5">
                          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                          <input onChange={formik.handleChange} type="name" name='name' value={formik.values.name} id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="" required />
                          {formik.errors.name&& formik.touched.name &&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            {formik.errors.name}
                          </div>}
                        </div>
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
                        <div className="mb-5">
                          <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                          <input onChange={formik.handleChange} type="password" name='rePassword' value={formik.values.rePassword} id="rePassword" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                          {formik.errors.rePassword&& formik.touched.rePassword &&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            {formik.errors.rePassword}
                          </div>}
                        </div>
                        <div className="mb-5">
                          <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
                          <input onChange={formik.handleChange} type="date" name='dateOfBirth' value={formik.values.dateOfBirth} id="dateOfBirth" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                          {formik.errors.dateOfBirth&& formik.touched.dateOfBirth &&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            {formik.errors.dateOfBirth}
                          </div>}
                        </div>
                        <div className="mb-5">
                          <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                          <input onChange={formik.handleChange} type="text" name='gender' value={formik.values.gender} id="gender" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                          {formik.errors.gender&& formik.touched.gender &&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            {formik.errors.gender}
                          </div>}
                        </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{load ? <i className='fas fa-spinner fa-spin-pulse'></i> : 'Register new account'}</button>
                </form>
        </div>
    </>
  )
}
