import {createAsyncThunk} from "@reduxjs/toolkit"
import { server } from "../../components/constant/config";
import axios from "axios"
const adminLogin = createAsyncThunk("admin/login", async (secretKey) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }
        const {data} = await axios.post(`${server}/api/v1/admin/verify`, {secretKey}, config);
        return data.message;    
    } catch (error) {
            throw error.response.data.message;
    }
})
const getAdmin = createAsyncThunk("admin/getadmin", async () => {
    try {
       
        const {data} = await axios.get(`${server}/api/v1/admin/`,{withCredentials:true});
        // console.log('dataaa',data)
        return data.admin;    
    } catch (error) {
            throw error.response.data.message;
    }
})
const adminLogOut= createAsyncThunk("admin/logout", async () => {
    try {
       
        const {data} = await axios.get(`${server}/api/v1/admin/logout`,{withCredentials:true});
        console.log('dataaa',data)
        return data.message;    
    } catch (error) {
            throw error.response.data.message;
    }
})
export {adminLogin,getAdmin,adminLogOut};