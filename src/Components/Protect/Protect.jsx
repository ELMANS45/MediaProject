import { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import { Navigate } from 'react-router-dom'

export default function Protect(e) {
    const {user} = useContext(UserContext)
  if(localStorage.getItem('userToken')){
    return e.children
  }
  else{
     return <Navigate to={'/signin'}/>
  }
}
