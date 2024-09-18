import { useFormik } from 'formik'
import axios from 'axios';
import { useContext, useEffect, useState} from 'react';
import { UserContext } from '../../Context/UserContext';
import { ProfileContext } from '../../Context/ProfileContext';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
export default function UpdateComment() {
    let {user} = useContext(UserContext)
    // let {userForm,getProfile} = useContext(ProfileContext)
    let {id} = useParams()
    const token = user
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate()
    async function upload(values){
        try{
            setLoading(true)
            const {data} = await axios.put(`https://linked-posts.routemisr.com/comments/${id}`,values,{
                headers : {token}
            })
            toast.success(data.message)
            navigate('/')
        }
        catch(error){
            console.log(error);
            
        }
        setLoading(false)
    }
    let formik = useFormik({
        initialValues:{
            content :''
        },
        onSubmit :upload
    })
  return (
    <>
            <div className='h-screen'>
            <form className="max-w-2xl bg-white rounded-lg border p-2 mx-auto mt-20" onSubmit={formik.handleSubmit}>
                <div className="px-3 mb-2 mt-2">
        <textarea placeholder="comment" name="content" id="content" value={formik.values.content} onChange={formik.handleChange} className="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"></textarea>
    </div>
                <div className="flex justify-end px-4">
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus: ring-blue-800">{loading ? <i className='fas fa-spinner fa-spin-pulse'></i> : 'change'}</button>
    </div>
            </form>
            </div>
    </>
  )

}

