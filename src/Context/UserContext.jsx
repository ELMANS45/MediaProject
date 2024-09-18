import axios from 'axios'
import { createContext, useState } from 'react'
export const UserContext = createContext() 
export default function UserContextProvider(e) {
    const [user, setUser] = useState(()=>{
      return localStorage.getItem('userToken') || null
    })
  return (
    <UserContext.Provider value={{user , setUser}}>
        {e.children}
    </UserContext.Provider>
  )
}