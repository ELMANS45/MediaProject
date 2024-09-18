import axios from 'axios'
import { useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import { useQuery } from '@tanstack/react-query';

export default function useProfile() {
    const {user} = useContext(UserContext)
    const token = user;
    async function userProfile() {
            return axios.get('https://linked-posts.routemisr.com/users/profile-data',{
                headers:{token}
            })
    }
    let response = useQuery({
        queryKey:['profile'],
        queryFn : userProfile,
        refetchOnWindowFocus : true,
        staleTime :1000*60,
    })
  return response;
}
