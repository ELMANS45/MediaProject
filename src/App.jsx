import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import LayOut from './Components/LayOut/LayOut'
import Home from './Components/Home/Home'
import SignIn from './Components/SignIn/SignIn'
import SignUp from './Components/SignUp/SignUp'
import NotFound from './Components/NotFound/NotFound'
import { Toaster } from 'react-hot-toast'
import UserContextProvider from './Context/UserContext'
import Protect from './Components/Protect/Protect'
import ChangeAvatar from './Components/ChangeAvatar/ChangeAvatar'
import ProfileContextProvider from './Context/ProfileContext'
import ChangePassword from './Components/ChangePassword/ChangePassword'
import SinglePost from './Components/SinglePost/SinglePost'
import MyProfile from './Components/MyProfile/MyProfile'
import Posts from './Components/Posts/Posts'
import Profile from './Components/Profile/Profile'
import AddPost from './Components/AddPost/AddPost'
import UpdatePost from './Components/UpdatePost/UpdatePost'
import Comment from './Components/Comment/Comment'
import UpdateComment from './Components/UpdateComment/UpdateComment'
import Loading from './Components/Loading/Loading'


function App() {
    const query = new QueryClient()
    const route = createHashRouter([
      {path : '', element : <LayOut/> , children: [
        {index :true , element : <Protect><Home/></Protect>},
        {path:'singlepost/:id', element: <Protect><SinglePost/></Protect>},
        {path:'loading', element: <Protect><Loading/></Protect>},
        {path:'changeavatar', element: <Protect><ChangeAvatar/></Protect>},
        {path:'myprofile', element: <Protect><MyProfile/></Protect>},
        {path:'profile/:name/:id', element: <Protect><Profile/></Protect>},
        {path:'update/:id', element: <Protect><UpdatePost/></Protect>},
        {path:'addpost', element: <Protect><AddPost/></Protect>},
        {path:'comment/:id', element: <Protect><Comment/></Protect>},
        {path:'updatecomment/:id', element: <Protect><UpdateComment/></Protect>},
        {path:'changepassword', element: <Protect><ChangePassword/></Protect>},
        {path :'signin' , element : <SignIn/>},
        {path :'signup' , element : <SignUp/>},
        {path : '*' , element : <NotFound/>}
      ]}
    ])
  return (
    <>  
      <QueryClientProvider client={query}>  
        <UserContextProvider>
        <ProfileContextProvider>
        <RouterProvider router={route}>
        <Toaster/>
        </RouterProvider>
        </ProfileContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </> 
  )
}

export default App
