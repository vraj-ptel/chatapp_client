import {Navigate, Outlet} from 'react-router-dom'
 export const Protectedroute=({children,user,redirect="/login"})=>{
    if(!user){
        return <Navigate to={redirect}></Navigate>
    }
    else{
        return children ? children : <Outlet/>
     
    }
}