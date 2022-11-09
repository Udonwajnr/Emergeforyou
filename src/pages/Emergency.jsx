import React,{useRef} from 'react'
import { app,db } from '../components/firebase/firebaseSetup'
import { useSelector,useDispatch } from 'react-redux'
import { collection, addDoc } from 'firebase/firestore'
import { useState,useEffect } from 'react'
import { updateDoc,getDocs } from 'firebase/firestore'

const initialState={
    name:'',
    subject:'',
    location:'',
    message:'',
    emergency:'',
}

const Emergency = () => {
     const [state,setState] = useState(initialState)
    const {name, subject, location,message,emergency} = state
  const form=useRef()


    const handleInput = (e) =>{
    const {name ,value} = e.target
    setState({...state, [name]:value})
  }

    const handleSubmit =(e)=>{
    e.preventDefault()
    if(!name || !subject || !location || !message || !emergency){
      alert('please provide value in each input'); 
    }
    else{
      addDoc(collection(db,"Emergency"),
    {name:name,
     subject:subject,
     location:location,
     message:message,
     emergency:emergency
    }
    ).then(()=>{
      alert(`A ${emergency} personnel is coming to your location`);
        setState(initialState)
    })
    .catch(error=>alert(error.message1))
    }
  }
  console.log(state)
  return (
    <main className='h-screen'>
        <div>
         <p className='text-center text-lg mt-4 '>Fill the form below for the emergency needed</p>
        <div className='flex justify-center mt-4 md:mt-5'>
            <form ref={form} className='flex flex-col gap-y-4 w-5/12 md:w-11/12' onSubmit={handleSubmit}>
                <div>
                    <input  id='name' type="text" name='name' value={name || ''}  placeholder='Name' className='border w-full focus:outline-none h-10 p-2' onChange={handleInput}/>
                </div>
                <div>
                    <input type="text" name='subject' value={subject || '' }  placeholder='Subject' className='border w-full focus:outline-none h-10 p-2' onChange={handleInput}/>
                </div>
                <div>
                    <input type="text" name='location' value={location || ''}  placeholder='Location of emergency' className='border w-full focus:outline-none h-10 p-2' onChange={handleInput}/>
                </div>
                <div>
                    <select id="emergency" name="emergency" value={emergency || ''} className='border w-full focus:outline-none h-10 p-2' onChange={handleInput}>
                        <option value=""></option>
                        <option value="Health">Health</option>
                        <option value="Security">Security</option>
                        <option value="Fire Outbreak">Fire Outbreak</option>
                        </select>
                    </div>
                <div>
                    <textarea type="text" name='message' value={message || ''}  placeholder='Message' className='border w-full resize-none h-48 focus:outline-none p-2' onChange={handleInput}/>
                </div>
                <button className='block bg-red-500 text-white hover:bg-red-700 transition duration-200 hover:duration-200 p-1 '>Submit</button>
            </form>
        </div>
        <p className='text-center mt-7 text-lg md:mt-4'>For Quick response</p>
        <div className='md:w-full'>
            <div className='border-2 p-1 border-dashed w-96 block m-auto md:w-full'>
                <ul >
                    <li className='my-3'>
                        <div className='flex  justify-between'>
                            <span >08070628237</span>
                            <span>Health Care</span>
                            <a href="tel:08070628237" className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded md:text-xs md:px-2'>Call Asap</a>

                        </div>   
                    </li>
                    <li className='my-3'>
                        <div className='flex justify-between'>
                            <span >08070628237</span>
                            <span>Security</span>
                            <a href="tel:08070628237" className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded md:text-xs md:px-2'>Call Asap</a>
                        </div>   
                    </li>
                    <li className='my-3 block'>
                        <div className='flex justify-between'>
                            <span >08070628237</span>
                            <span>Fire Service</span>
                            <a href="tel:08070628237" className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded md:text-xs md:px-2'>Call Asap</a>
                        </div>   
                    </li>
                </ul>
            </div>
        </div>

        </div>
    </main>
  )
    }


export default Emergency