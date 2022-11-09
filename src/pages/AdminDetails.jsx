import React,{useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { app,db } from '../components/firebase/firebaseSetup'
import { useSelector,useDispatch } from 'react-redux'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { getAuth ,signOut} from "firebase/auth";
import { setUserLogout } from '../features/users/userSlice'
import '../assets/css/details.css'



const AdminDetails = () => {
    const [data,setData] =  useState([])
    const {subject} = useParams()
     const dispatch = useDispatch()
    const email = useSelector((state)=>state.user.email)
    const auth = getAuth()
    const navigate = useNavigate()


    useEffect(()=>{
        const list = []
        const getAllData = async () =>{
        const querySnapshot = await getDocs(collection(db,'Emergency'));
        querySnapshot.forEach((doc)=>{
            list.push({...doc.data(), key:doc.id})
            })
            setData(list)
            // console.log(list)
        }
        getAllData()
    },[])

    

    

  return (
    <main className='h-screen'>
        <div className=' my-10 p-4 overflow-y-scroll'>
           {
            data.filter(data=> data.subject === subject).map((data)=>{
                return(
                    <div>
                        <div className='w-8/12 md:w-11/12 m-auto this p-5 md:p-2'>
                            <h2 className='text-3xl text-center capitalize text-red-500'>{data.subject}</h2>
                            <p className='text-center capitalize'>{data.location}</p>
                            <article className='text-center mt-5'>
                                {data.message}
                            </article>
                            <div className='mt-5 flex justify-between items-center'>
                                <Link to={'/admin'} className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded md:text-xs md:px-2 block'>Go Back</Link>
                                <small className='text-center mt-3'>{data.name}</small>
                            </div>
                        </div>
                        
                    </div>
                )
            })
           }
        </div>
    </main>
  )
}

export default AdminDetails