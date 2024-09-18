import  { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import viteLogo from '../../assets/download-Photoroom.png'
import { UserContext } from '../../Context/UserContext'
import { ProfileContext } from '../../Context/ProfileContext'
export default function NavBar() {
  const{userForm , getProfile} = useContext(ProfileContext)
  const {user,setUser} = useContext(UserContext)
  const [navView, setNavView] = useState(false)
  const navigate = useNavigate()
  useEffect(()=>{
    getProfile()
},[userForm])
  const signOut = ()=>{
    if(user){
        setUser(null)
        localStorage.removeItem('userToken')
        navigate('/signin')            
    }
}
    const toggle = ()=>{
        setNavView(!navView)
    } 
  return (
    <>
        <div className="w-full bg-indigo-600 text-white" style={{ fontFamily: 'Open Sans, sans-serif'}}>
            <div className="container p-4 flex justify-between">
                <div className="flex justify-center items-center gap-x-5">
                    <img src={viteLogo} alt="vite" width={120}/>
                    {user &&<Link to="" className={navView ? 'md:inline hidden' : ''}>Home</Link>}
                </div>
                <div className={navView ? 'md:flex md:gap-x-5 flex flex-col' : 'md:flex md:gap-x-5 hidden'}>
                    {!user? <div className='gap-y-6 flex flex-col gap-x-9 md:flex-row'> <Link to="signin">Sign in</Link> <Link to="signup">Sign up</Link></div> : <div className='flex flex-col md:flex-row justify-center items-center gap-4'>
                    <Link to={'myprofile'}><img src={userForm?.photo} alt="" className="w-12 h-12 mx-auto rounded-full dark:bg-gray-500 aspect-square" /></Link> <Link to="changeavatar"><p className='cursor-pointer'>Change Avatar</p></Link><p onClick={signOut} className='cursor-pointer'>Sign out</p><Link to="changepassword"><p className='cursor-pointer'>Change Password</p></Link></div>}
                </div>
                <div className="md:hidden flex">
                <div onClick={toggle} className="mb-2"><button className="px-5 py-3 rounded-xl text-sm font-medium text-white outline-none focus:outline-none border-4 border-transparent hover:text-indigo-300  active:border-transparent active:text-grey-900 transition-all"><i className="mdi mdi-circle-outline text-xl align-middle leading-none"></i></button></div>
                </div>
              </div>
        </div>
    </>
  )
}
