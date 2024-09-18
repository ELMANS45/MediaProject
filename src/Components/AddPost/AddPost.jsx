import { useFormik } from 'formik'
import axios from 'axios';
import { useContext, useEffect, useState} from 'react';
import { UserContext } from '../../Context/UserContext';
import { ProfileContext } from '../../Context/ProfileContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import toast from 'react-hot-toast';
export default function AddPost() {
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setLoading(false)
        },4000)
        return ()=>clearTimeout(timer)
    },[])
    let {user} = useContext(UserContext)
    // let {userForm,getProfile} = useContext(ProfileContext)
    const token = user
    const [loading, setLoading] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    let navigate = useNavigate()
    async function upload(values){
        const formData = new FormData();
        formData.append('image', values.image);
        formData.append('body', values.body);
        
        try{
            setIsLoading(true)
            const {data} = await axios.post('https://linked-posts.routemisr.com/posts',formData,{
                headers : {token}
            })
            toast.success(data.message)
            navigate('/myprofile')
        }
        catch(error){
            console.log(error);
            
        }
        setIsLoading(false)
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
        {loading ? <Loading/> : <div className='h-screen'>
            <form className='className="max-w-2xl w-11/12 my-12 bg-white rounded-lg border border-indigo-400 p-2 mx-auto mt-20 pb-7' onSubmit={formik.handleSubmit}>
            <div className="px-3 mb-6 mt-2">
        <textarea placeholder="body" name="body" id="body" value={formik.values.body} onChange={formik.handleChange} className="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"></textarea>
            </div>
                <input onChange={(event) => {formik.setFieldValue('image', event.currentTarget.files[0]);}} type="file"id="image" name="image" accept="image/*" />
                <button type="submit" className="text-white float-end bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus: ring-blue-800">{isLoading ? <i className='fas fa-spinner fa-spin-pulse'></i> : 'change'}</button>
            </form>
        </div>}
    </>
  )

}


// import { useFormik } from 'formik'
// import axios from 'axios';
// import { useContext, useState } from 'react';
// import { UserContext } from '../../Context/UserContext';

// export default function AddPost() {
//     let { user } = useContext(UserContext);
//     const token = user; // Use the token directly as per the API documentation

//     const [loading, setLoading] = useState(false);

//     async function upload(values) {
//         const formData = new FormData();
//         formData.append('image', values.image); // Append the image
//         formData.append('body', values.body);   // Append the body text

//         try {
//             setLoading(true);
            // const { data } = await axios.post('https://linked-posts.routemisr.com/posts', formData, {
            //     headers: {
            //         token: token // Pass the token in the headers as 'token'
            //     }
            // });
//             console.log(data); // Log the response data (success)
//         } catch (error) {
//             console.log(error); // Handle any errors (like 401 Unauthorized)
//         }
//         setLoading(false);
//     }

//     let formik = useFormik({
//         initialValues: {
//             body: '',  // For the post content
//             image: null // For the image file
//         },
//         onSubmit: upload
//     });

//     return (
//         <>
//             <div className='flex justify-center items-center gap-4 h-screen'>
//                 <form className='flex flex-col gap-y-7' onSubmit={formik.handleSubmit}>
//                     <div className="mb-5">
//                         <label htmlFor="body" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post Content</label>
//                         <input
//                             onChange={formik.handleChange}
//                             type="text"
//                             name='body'
//                             value={formik.values.body}
//                             id="body"
//                             className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//                             placeholder="Write your post content here"
//                             required
//                         />
//                     </div>
//                     <input
//                         onChange={(event) => { formik.setFieldValue('image', event.currentTarget.files[0]); }}
//                         type="file"
//                         id="image"
//                         name="image"
//                         accept="image/*"
//                     />
//                     <button
//                         type="submit"
//                         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus: ring-blue-800">
//                         {loading ? <i className='fas fa-spinner fa-spin-pulse'></i> : 'Submit'}
//                     </button>
//                 </form>
//             </div>
//         </>
//     );
// }