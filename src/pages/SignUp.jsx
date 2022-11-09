import React,{useState,useEffect} from 'react'
import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged  } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserLogin } from '../features/users/userSlice';


const SignUp = () => {
const email = useSelector((state)=>state.user.email)
const dispatch = useDispatch()
const navigate = useNavigate()
const auth = getAuth();
const [data,setData] = useState([]);

const handleInput=(event)=>{
    const newInput = {[event.target.name]: event.target.value};
    setData({...data, ...newInput});
};


const handleSubmit =(e)=>{
    e.preventDefault()
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        console.log(response.user) 
        navigate('/login')

      }).catch((err)=>{
        alert(err.message)
      })
}
useEffect(()=>{
  onAuthStateChanged(auth,async(user)=>{
    if(user){
      setUser(user)
      navigate('/admin')
    }
  })
},[email])


const setUser=(user)=>{
  dispatch(
    setUserLogin({
    //   name:user.displayName,
      email:user.email,
    })
  )
}

  return (
    <div className='h-screen items-center justify-center flex flex-col w-full'>
        <h1 className='text-2xl text-center'>Register To become an Admin</h1>
        <div className='flex flex-col items-center justify-center w-full mt-4 md:mt-5'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 w-4/12 md:w-11/12'>
                <input type="text" name="email" placeholder='Email'className='border w-full focus:outline-none h-10 p-2'   onChange={(event)=>handleInput(event)} />
                <input type="text" name="password" placeholder='Password' className='border w-full focus:outline-none h-10 p-2' onChange={(event)=>handleInput(event)} />
                <button className='block bg-red-500 text-white hover:bg-red-700 transition duration-200 hover:duration-200 p-1 '>Submit</button>                
            </form>
            <div>
              already registered?<Link to="/login" className='text-blue-700'>Login</Link>
            </div>
        </div>
    </div>
  )
}

export default SignUp