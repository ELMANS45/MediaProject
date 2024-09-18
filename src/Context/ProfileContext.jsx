import { createContext, useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext';
import axios from 'axios';
export const ProfileContext = createContext()
export default function ProfileContextProvider(e) {
    const [userForm, setuserForm] = useState(null)
    const [profilePosts, setProfilePosts] = useState(null)
    const [comment, setComment] = useState(null)
    const {user} = useContext(UserContext)
    const [photo, setPhoto] = useState(null)
    const token = user;
    useEffect(()=>{
        getProfile()
    },[userForm])
    async function getProfile(){
        try{
                let {data} = await axios.get('https://linked-posts.routemisr.com/users/profile-data',{
                    headers:{token}
                })
                setuserForm(data?.user)
        }
        catch(error){
            console.log(error)
        }
    }
    async function getAllPosts(id) {
        try{
            let {data} = await axios.get(`https://linked-posts.routemisr.com/users/${id}/posts?limit=3`,{
                headers :{token}
            })
            setProfilePosts(data?.posts)
        }
        catch(err){
            console.log(err)
        }
    }
    const savePhoto = (photo)=>{  
        setPhoto(photo)
      }
      async function deletePost(id) {
        try{
            let {data} = await axios.delete(`https://linked-posts.routemisr.com/posts/${id}`,{
                headers :{token}
            })
            console.log(data);
        }
        catch(err){
            console.log(err)
        }
    }
    async function getComments(id) {
        try{
            let {data} = await axios.get(`https://linked-posts.routemisr.com/posts/${id}/comments`,{
                headers :{token}
            })
            console.log(data);
            setComment(data?.comments)
        }
        catch(err){
            console.log(err)
        }
    }
    async function deleteComment(id) {
        console.log(id);
        
        try{
            let {data} = await axios.delete(`https://linked-posts.routemisr.com/comments/${id}`,{
                headers :{token}
            })
            console.log(data);
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <ProfileContext.Provider value={{getProfile,userForm , getAllPosts , profilePosts , setPhoto,photo,savePhoto,deletePost,getComments,comment,deleteComment}}>
        {e.children}
    </ProfileContext.Provider>
  )
}
