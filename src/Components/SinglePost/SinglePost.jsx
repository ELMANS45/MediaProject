import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { ProfileContext } from '../../Context/ProfileContext'
import Loading from '../Loading/Loading'
import { format } from 'date-fns'
import defaultUser from '../../assets/default-avatar-profile-icon-of-social-media-user-vector.jpg'
import { ClipLoader } from 'react-spinners'

export default function SinglePost() {
    const {user} = useContext(UserContext)
    const {savePhoto,userForm,comment,getComments} = useContext(ProfileContext)
    const token = user
    const {id} = useParams()
    const [singlePost, setSinglePost] = useState(null)
    const [isView, setIsView] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [commentLoading , setCommentLoading] = useState(false)
    useEffect(()=>{
        getSinglePost()
        getComments(id);
    },[token])
    useEffect(()=>{
      const timer = setTimeout(()=>{
        setCommentLoading(false)
      },2000)
      return ()=>clearTimeout(timer)
    },[commentLoading])
    const viewComments = ()=>{
        setCommentLoading(!commentLoading)
        setIsView(!isView)
    }
    async function getSinglePost() {
            try{
                setIsLoading(true)
                let {data} = await axios.get(`https://linked-posts.routemisr.com/posts/${id}`,{
                    headers :{token}
                })
                setSinglePost(data.post)
            }
            catch(error){
                console.log(error)
            }
            setIsLoading(false)
    }
  return (
    <>
          {isLoading ? <Loading/> : <div className=" container flex flex-row flex-wrap mx-auto">
        <div className="transition-all duration-150 w-full flex px-4 py-6 justify-center md:w-1/3 container"  key={singlePost?.id}>
        <div className="flex flex-col items-stretch min-h-full w-full pb-4 mb-6 transition-all duration-150 bg-white rounded-lg shadow-lg hover:shadow-2xl">
          <div className="md:flex-shrink-0">
          <img src={singlePost?.image ? singlePost?.image : ''} alt="Blog Cover" className={singlePost?.image ? 'object-fill w-full rounded-lg rounded-b-none md:h-56' : 'hidden'}/>
            <h1 className={singlePost?.image? 'hidden' : 'object-fill w-full rounded-lg rounded-b-none md:h-56 flex justify-center items-center'}>No photo Here</h1>
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
              <div onClick={viewComments} className="text-xs font-medium cursor-pointer text-gray-500 flex flex-row items-center mr-2">
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
                <span>{comment?.length}</span>
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
              {singlePost?.body}
          </p>
          <hr className="border-gray-300" />
          <section className="px-4 py-2 mt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1">
              <Link onClick={()=>savePhoto(singlePost?.user.photo)} to={`/profile/${singlePost?.user.name}/${singlePost?.user._id}`}><img className="object-cover h-10 rounded-full aspect-square" src={singlePost?.user.photo} alt="Avatar"/></Link>
                <div className="flex flex-col mx-2">
                  <a href="#" className="font-semibold text-gray-700 hover:underline">
                    {singlePost?.user.name}
                  </a>
                  <span className="mx-1 text-xs text-gray-600">{isNaN(new Date(singlePost?.createdAt).getTime())? ''  : format(new Date(singlePost?.createdAt),'yyyy-mm-dd')}</span>
                </div>
              </div>
            </div>
          </section>
          <div className={isView ? 'flex flex-col items-start border-t-2 p-3' : 'hidden'}>
            {commentLoading ? <div className='flex justify-center items-center w-full my-5'><ClipLoader speedMultiplier={2} color='indigo'/></div> : comment?.map((comment)=><div className="flex items-start justify-center bg-white dark:bg-gray-800" key={comment?._id}>
  <div className="bg-white dark:bg-gray-800 text-black dark:text-gray-200 p-4 antialiased flex items-start max-w-lg">
    <img
      className="rounded-full h-11 w-11 mr-2 mt-1"
      src={!comment?.commentCreator.photo ? comment?.commentCreator.photo : defaultUser }
      alt="Profile"
    />
    <div>
      <div className="bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 pt-2 pb-2.5">
        <div className="font-semibold text-sm leading-relaxed">{comment?.commentCreator.name}</div>
        <div className="text-normal leading-snug md:leading-normal">
              {comment?.content}
        </div>
      </div>
      <div className=" flex text-sm ml-4 mt-0.5 text-gray-500 dark:text-gray-400 gap-3">
        {isNaN(new Date(comment?.createdAt).getTime())? '' : format(new Date(comment?.createdAt),'yyyy-mm-dd')}
        <div className={userForm?._id ==comment.commentCreator._id ? 'flex flex-row gap-3' : 'hidden'}>
          <Link to ={`/updatecomment/${comment._id}`}><h1 className='cursor-pointer'>update</h1></Link>
          </div>
        </div>
    </div>
  </div>
</div>
)}
          </div>
          </div>
          </div></div> }
    </>
  )
}
{/* <div className='flex justify-start w-full p-4 gap-8 bg-gray-400' key={comment._id}>
                <img className='border rounded-full' width={50} height={50} src={comment.commentCreator.photo}/>
                <div className='flex flex-col' key={comment.commentCreator._id}>
                <h1 className='text-black text-xl'>{comment.commentCreator.name}</h1>
            </div>
            <div className="flex flex-col">
            <p className='text-black'>{comment.content}</p> 
            </div>
      </div> */}




{/* <div className="flex items-center justify-center w-screen h-screen bg-white dark:bg-gray-800">
  <div className="bg-white dark:bg-gray-800 text-black dark:text-gray-200 p-4 antialiased flex max-w-lg">
    <img
      className="rounded-full h-8 w-8 mr-2 mt-1"
      src="https://picsum.photos/id/1027/200/200"
      alt="Profile"
    />
    <div>
      <div className="bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 pt-2 pb-2.5">
        <div className="font-semibold text-sm leading-relaxed">Jon Doe</div>
        <div className="text-normal leading-snug md:leading-normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </div>
      <div className="text-sm ml-4 mt-0.5 text-gray-500 dark:text-gray-400">14 w</div>
      <div className="bg-white dark:bg-gray-700 border border-white dark:border-gray-700 rounded-full float-right -mt-8 mr-0.5 flex shadow items-center">
        <svg
          className="p-0.5 h-5 w-5 rounded-full z-20 bg-white dark:bg-gray-700"
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          viewBox='0 0 16 16'
        >
          <defs>
            <linearGradient id='a1' x1='50%' x2='50%' y1='0%' y2='100%'>
              <stop offset='0%' stopColor='#18AFFF' />
              <stop offset='100%' stopColor='#0062DF' />
            </linearGradient>
            <filter id='c1' width='118.8%' height='118.8%' x='-9.4%' y='-9.4%' filterUnits='objectBoundingBox'>
              <feGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1' />
              <feOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1' />
              <feComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1' />
              <feColorMatrix in='shadowInnerInner1' values='0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0' />
            </filter>
          </defs>
          <g fill='none'>
            <use fill='url(#a1)' xlinkHref='#b1' />
            <use fill='black' filter='url(#c1)' xlinkHref='#b1' />
            <path fill='white' d='M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z' />
          </g>
        </svg>
        <svg
          className="p-0.5 h-5 w-5 rounded-full -ml-1.5 bg-white dark:bg-gray-700"
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          viewBox='0 0 16 16'
        >
          <defs>
            <linearGradient id='a2' x1='50%' x2='50%' y1='0%' y2='100%'>
              <stop offset='0%' stopColor='#FF6680' />
              <stop offset='100%' stopColor='#E61739' />
            </linearGradient>
            <filter id='c2' width='118.8%' height='118.8%' x='-9.4%' y='-9.4%' filterUnits='objectBoundingBox'>
              <feGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1' />
              <feOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1' />
              <feComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1' />
              <feColorMatrix in='shadowInnerInner1' values='0 0 0 0 0.710144928 0 0 0 0 0 0 0 0 0 0.117780134 0 0 0 0.349786932 0' />
            </filter>
          </defs>
          <g fill='none'>
            <use fill='url(#a2)' xlinkHref='#b2' />
            <use fill='black' filter='url(#c2)' xlinkHref='#b2' />
            <path fill='white' d='M10.473 4C8.275 4 8 5.824 8 5.824S7.726 4 5.528 4c-2.114 0-2.73 2.222-2.472 3.41C3.736 10.55 8 12.75 8 12.75s4.265-2.2 4.945-5.34c.257-1.188-.36-3.41-2.472-3.41' />
          </g>
        </svg>
        <span className="text-sm ml-1 pr-1.5 text-gray-500 dark:text-gray-300">3</span>
      </div>
    </div>
  </div>
</div> */}




      // <div className="container flex justify-center flex-col gap-5 items-center">
      // <div className='w-2/3 border mt-7 border-blue-950' key={singlePost?.id}>
      //     <div className='flex justify-between w-full p-4'>
      //   <div className="flex">
      //   <Link onClick={()=>savePhoto(singlePost?.user.photo)} to={`/profile/${singlePost?.user.name}/${singlePost?.user._id}`}><img src={singlePost?.user.photo} alt="" className="w-12 h-12 mx-auto rounded-full dark:bg-gray-500 aspect-square" /></Link>
      // <div className='text-gray-500' key={singlePost?.user._id}>
      //   <h1 className='text-black'>{singlePost?.user.name}</h1> <h1>{singlePost?.createdAt}</h1>
      //   </div>
      //   </div>
      //   </div>
      //   <div className='flex flex-col'>
      //     <p className='p-4'>{singlePost?.body}</p>
      //     <div className="w-full h-full">
      //     <img src={singlePost?.image} className='w-full h-full object-cover' alt="" />
      //     <div className="flex justify-between flex-row p-5  ">
      //       <i className='fas fa-heart'></i>
      //       <i onClick={viewComments} className='fas fa-comment cursor-pointer'></i>
      //       <i className='fas fa-share'></i>
      //     </div>
      //     <div className={isView ? "flex border border-t-orange-500 justify-between gap-10 p-8 flex-col" : "hidden"}>
      //     {comment?.map((comment)=>       <div className='container border w-2/3 rounded border-green-500' key={comment._id}>
      //   <div className='flex justify-between w-full p-4 gap-4' key={comment._id}>
      //   <div className="flex">
      // <img className='w-12 h-12  rounded-full dark:bg-gray-500 aspect-square' src={comment.commentCreator.photo}/>
      //   <div className='text-gray-500' key={comment.commentCreator._id}>
      //     <h1 className='text-black'>{comment.commentCreator.name}</h1>
      //     </div>
      //     </div>
      //     <div className={userForm?._id ==comment.commentCreator._id ? 'flex flex-col gap-3' : 'hidden'}>
      //     <Link to ={`/updatecomment/${comment._id}`}><h1 className='cursor-pointer'>update</h1></Link></div>
      //     </div>
      //     <div className='flex flex-col mb-5'>
      //       <p className='m-4 text-center'>{comment.content}</p>
      //       </div>
      //       </div>)}
      //     </div>
      //     </div>
      //   </div>
      //   </div>
      //   </div>



          // useEffect(()=>{
    //   const datee = new Date(singlePost?.createdAt)
    //   if(!isNaN(datee.getTime())){
    //     const formatDate = format(datee ,'yyy-mm-dd')
    //     setFormattedDate(formatDate)
    //   }
    // },[])