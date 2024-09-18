import { useFormik } from 'formik'
import axios from 'axios';
import { useContext, useEffect, useState} from 'react';
import { UserContext } from '../../Context/UserContext';
import { ProfileContext } from '../../Context/ProfileContext';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import toast from 'react-hot-toast';
export default function UpdatePost() {
    let {user} = useContext(UserContext)
    // let {userForm,getProfile} = useContext(ProfileContext)
    let {id} = useParams()
    console.log(id)
    const token = user
    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setIsLoading(false)
        },4000)
        return ()=>clearTimeout(timer)
    },[])
    let navigate = useNavigate()
    async function upload(values){
        const formData = new FormData();
        formData.append('image', values.image);
        formData.append('body', values.body);
        
        try{
            setLoading(true)
            const {data} = await axios.put(`https://linked-posts.routemisr.com/posts/${id}`,formData,{
                headers : {token}
            })
            toast.success(data.message)
            navigate('/myprofile')
        }
        catch(error){
            console.log(error);
            
        }
        setLoading(false)
    }
    let formik = useFormik({
        initialValues:{
            body :'',
            image: null
        },
        onSubmit :upload
    })
  return (
    <>
    {isLoading ? <Loading/> :         <div className='flex justify-center items-center gap-4 h-screen'>
        <form className='className="max-w-2xl w-11/12 my-12 bg-white rounded-lg border border-indigo-400 p-2 mx-auto mt-20 pb-7' onSubmit={formik.handleSubmit}>
            <div className="px-3 mb-6 mt-2">
        <textarea placeholder="body" name="body" id="body" value={formik.values.body} onChange={formik.handleChange} className="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"></textarea>
            </div>
                <input onChange={(event) => {formik.setFieldValue('image', event.currentTarget.files[0]);}} type="file"id="image" name="image" accept="image/*" />
                <button type="submit" className="text-white float-end bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus: ring-blue-800">{loading ? <i className='fas fa-spinner fa-spin-pulse'></i> : 'change'}</button>
            </form>
        </div>}
    </>
  )

}
