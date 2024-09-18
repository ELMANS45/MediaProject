import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ProfileContext } from '../../Context/ProfileContext';
import Loading from '../Loading/Loading';
import { format } from 'date-fns';
import loadingImage from '../../assets/loading-bar-progress-icon-with-transparent-background-free-png.webp'
export default function Home() {
  // const [isView, setIsView] = useState(false)
  let {user} = useContext(UserContext)
  let {setPhoto}  = useContext(ProfileContext)
  const token = user;
//   const viewComments = ()=>{
//     setIsView(!isView)
// } 
    useEffect(()=>{
      refetch();
    },[])
    async function allPosts() {
    return axios.get('https://linked-posts.routemisr.com/posts?limit=50',{
      headers : {token}
    })
    }
    const {data ,isLoading , refetch} = useQuery({
    queryKey :['50Post'],
    queryFn : allPosts
    })
    const savePhoto = (e)=>{
        setPhoto(e)
    }
  return (
    <>
        {/* {isLoading ? <Loading/> : <div className="container flex justify-center flex-col gap-5 items-center">{data?.data.posts.map((post)=>
      <div className='w-2/3 border mt-7 border-blue-950' key={post.id}>
        <div className='flex justify-start w-full p-4'>
        <Link onClick={()=>savePhoto(post.user.photo)} to={`/profile/${post.user.name}/${post.user._id}`}><img src={post.user.photo} alt="" className="w-12 h-12  rounded-full dark:bg-gray-500 aspect-square" /></Link>
        <Link to={`/singlepost/${post.id}`}>
    <div className='text-gray-500' key={post.user._id}>
      <h1 className='text-black'>{post.user.name}</h1> <h1>{post.createdAt}</h1>
      </div>
      </Link>
      </div>
      <div className='flex flex-col'>
        <p className='p-4'>{post.body}</p>
        <div className="w-full h-full">
        <img src={post.image} className='w-full h-full object-cover' alt="" />
        <div className="flex justify-between flex-row p-5">
          <i className='fas fa-heart'></i>
          <Link to ={`/comment/${post.id}`}><i className='fas fa-comment'></i></Link>
          <i className='fas fa-share'></i>
        </div>
        </div>
      </div>
      </div>)}</div>} */}
        {isLoading ? <Loading/> : <div className=" container flex flex-row items-end flex-wrap mx-auto">{data?.data.posts.map((post)=> 
              <div className="transition-all duration-150 flex w-full h-full px-4 py-6 md:w-1/2 lg:w-1/4" key={post.id}>
              <div className="flex flex-col items-stretch  w-full pb-4 mb-6 transition-all duration-150 bg-white rounded-lg shadow-lg hover:shadow-2xl">
                <div className="md:flex-shrink-0">
                <Link to={`/singlepost/${post.id}`}><img src={post.image ? post.image : loadingImage} alt="Blog Cover" className={post.image ? 'object-fill w-full rounded-lg rounded-b-none h-full' : 'hidden'}/></Link>
                  <h1 className={post.image? 'hidden' : 'object-fill w-full rounded-lg rounded-b-none md:h-56 flex justify-center items-center'}>No photo Here</h1>
                </div>
                <div className="flex items-center justify-between px-4 py-2 overflow-hidden">
                  <span className="text-xs font-medium text-blue-600 uppercase"></span>
                  <div className="flex flex-row items-center">
                    <div className="text-xs font-medium text-gray-500 flex flex-row items-center mr-2">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        ></path>
                      </svg>
                    </div>
                    <div className="text-xs font-medium text-gray-500 flex flex-row items-center mr-2">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        ></path>
                      </svg>
                      <Link to ={`/comment/${post.id}`}><span>{post.comments.length}</span></Link>
                    </div>
                    <div className="text-xs font-medium text-gray-500 flex flex-row items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <hr className="border-gray-300" />
                <div className="flex flex-wrap items-center px-4 py-1 text-center mx-auto">
                </div>
                <p className="flex flex-row flex-wrap w-full px-4 py-2 overflow-hidden text-sm text-justify text-gray-700">
                    {post.body}
                </p>
                <hr className="border-gray-300" />
                <section className="px-4 py-2 mt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                    <Link onClick={()=>savePhoto(post.user.photo)} to={`/profile/${post.user.name}/${post.user._id}`}><img className="object-cover h-10 rounded-full aspect-square" src={post.user.photo} alt="Avatar"/></Link>
                      <div className="flex flex-col mx-2">
                        <a href="#" className="font-semibold text-gray-700 hover:underline">
                          {post.user.name}
                        </a>
                        <span className="mx-1 text-xs text-gray-600">{isNaN(new Date(post.createdAt).getTime())? ''  : format(new Date(post.createdAt),'yyyy-mm-dd')}</span>
                      </div>
                    </div>
                  </div>
                </section>
                </div>
                </div>)}</div>} 

    </>
  )
}

