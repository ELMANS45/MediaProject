import { useFormik } from 'formik'
import axios from 'axios';
import { useContext, useEffect, useState} from 'react';
import { UserContext } from '../../Context/UserContext';
import { ProfileContext } from '../../Context/ProfileContext';
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
export default function ChangeAvatar() {
    let {user} = useContext(UserContext)
    let {userForm,getProfile} = useContext(ProfileContext)
    const token = user
    const [loading, setLoading] = useState(false)
    const [loadings, setLoadings] = useState(true)
    let navigate = useNavigate()
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setLoadings(false)
        },4000)
        return ()=>clearTimeout(timer)
    },[])
    useEffect(()=>{
        getProfile()
    },[userForm?.photo])
    async function upload(values){
        const formData = new FormData();
        formData.append('photo', values.photo);
        try{
            setLoading(true)
            const {data} = await axios.put('https://linked-posts.routemisr.com/users/upload-photo',formData,{
                headers : {token}
            })
            navigate('/')
            toast.success(data.message)
        }
        catch(error){
            console.log(error);
            
        }
        setLoading(false)
    }
    let formik = useFormik({
        initialValues:{
            photo: null
        },
        onSubmit :upload
    })
  return (
    <>
                {loadings ? <Loading/> :         <div className='flex justify-center items-center gap-4 h-screen'>
            <img src={userForm?.photo} alt="" className="w-28 h-28 rounded-full dark:bg-gray-500 aspect-square" />
            <form className='flex flex-col gap-y-7' onSubmit={formik.handleSubmit}>
                <input onChange={(event) => {formik.setFieldValue('photo', event.currentTarget.files[0]);}} type="file"id="photo" name="photo" accept="image/*" />
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus: ring-blue-800">{loading ? <i className='fas fa-spinner fa-spin-pulse'></i> : 'change'}</button>
            </form>
        </div>}
    </>
  )

}
