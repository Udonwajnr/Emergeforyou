import React,{useState,useEffect} from 'react'
import { getAuth, signInWithEmailAndPassword,onAuthStateChanged  } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserLogin } from '../features/users/userSlice';


const Login = () => {
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
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        console.log(response.user) 
        navigate('/admin')
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
        <h1 className='text-2xl text-center'>Welcome Back Please Login</h1>
        <div className='flex flex-col items-center justify-center w-full mt-4 md:mt-5'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 w-4/12 md:w-11/12'>
                <input type="text" name="email" placeholder='Email'  className='border w-full focus:outline-none h-10 p-2' onChange={(event)=>handleInput(event)} />
                <input type="password" name="password" placeholder='Password' className='border w-full focus:outline-none h-10 p-2' onChange={(event)=>handleInput(event)} />
                <button className='block bg-red-500 text-white hover:bg-red-700 transition duration-200 hover:duration-200 p-1 '>Submit</button>
            </form>
            <div>
              Don't have an account ?<Link to="/signup" className='text-blue-700'> Signup </Link>
            </div>
        </div>

    </div>
  )
}

export default Login