import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    name:'',
    email:'',
    authentication:false,
}
export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserLogin:(state,action)=>{
            // firebase authentication
            state.name = action.payload.name
            state.email = action.payload.email
            state.authentication = true
        },

        setUserLogout:(state,action)=>{
            state.name = null
            state.email = null
            state.authentication = false
        }

    }
})
export const {setUserLogin,setUserLogout} = userSlice.actions

export default userSlice.reducer