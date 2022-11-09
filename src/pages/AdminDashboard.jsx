import React,{useState} from 'react'
import { app,db} from '../components/firebase/firebaseSetup'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { getAuth ,signOut} from "firebase/auth";
import { setUserLogout } from '../features/users/userSlice'
import '../assets/css/table.css'




const AdminDashboard = () => {
    const [data,setData] =  useState([])
    const email = useSelector((state)=>state.user.email)
    const auth = getAuth()
    const navigate = useNavigate()
     const dispatch = useDispatch()





    useEffect(()=>{
        const list = []
        const getAllData = async () =>{
        const querySnapshot = await getDocs(collection(db,'Emergency'));
        querySnapshot.forEach((doc)=>{
            list.push({...doc.data(), key:doc.id})
            })
            setData(list)
        }
        getAllData()
    },[])

    const logout =()=>{
    signOut(auth).then(() => {
        dispatch(setUserLogout())
        navigate('/login')
      }).catch((error) => {
          console.log(error.message)
});
    
  }

const onDelete = async(id) =>{
 await deleteDoc(doc(db, "Emergency", id))
 .then(()=>{
    alert('Deleted successfully');
     window.location.reload()

}
 ).catch((err)=>console.log(err.message))
}
console.log(data)
  return (
    <>
    <div className='h-screen overflow-scroll px-6 py-3 md:px-3'>
        <div className='text-center p-2'>
            <h2 className='text-3xl text-red-500'>Emergency</h2>
        </div>
        <table className='w-full border border-spacing-4 border-collapse  table-auto'>
        <thead>
            <tr>
                <th className='border border-slate-700'>No.</th>
                <th className='border border-slate-700'>Name</th>
                <th className='border border-slate-700'>Location</th>
                <th className='border border-slate-700'>Subject</th>
                <th className='border border-slate-700'>Emergency</th>
                <th className='border border-slate-700'>Messages</th>
                <th className='border border-slate-700'>More Option</th>
            </tr>
        </thead>
        <tbody className=''>
        {
             data?.map((item,index)=>{
            return(      
                <tr key={index} className='overflow-scroll w-full text-center'>
                        <td className='border border-slate-700'>{index+1}</td>
                        <td className='border border-slate-700'>{item.name}</td>
                        <td className='border border-slate-700'>{item.location}</td>
                        <td className='border border-slate-700'>{item.subject}</td>
                        <td className='border border-slate-700'>{item.emergency}</td>
                        <td className='border border-slate-700'>{item.message.length > 40? `${item.message.slice(0,40)}...`:item.message }</td>
                        <td className='border border-slate-700'>
                            <div className='flex justify-center gap-3'>
                                <Link to={`/admin/details/${item.subject}`} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded block"> 
                                    View Details
                                </Link>
                                <button className='bg-red-500 p-1 rounded text-white' onClick={()=>onDelete(item?.key)}>Delete</button>
                            </div>
                        </td>
                    </tr>
            )
          })
        }
        </tbody>
        </table>
    </div>
    <div className='my-2 flex justify-end'>
     <button className='bg-red-500 hover:red-blue-700 text-white font-bold py-2 px-4 rounded' onClick={logout}>Sign Out</button>
    </div>
    </>
  )
}

export default AdminDashboard