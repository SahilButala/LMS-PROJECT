import { Fragment } from "react";
import { useLocation, Navigate } from "react-router-dom";



export default function RouteGuard({authinticated,user,element}){
             const location = useLocation()
             // if user not authinticated and try  to access home page or other routes then it will redirect auth page
             if(!authinticated && !location.pathname.includes("/auth")){
                  return <Navigate to='/auth' />
             }
             if(authinticated  && user.role !=='admin' && (location.pathname.includes("admin") ||
             location.pathname.includes("/auth"))){
               return <Navigate to="/home"/>
             }
            
             if(authinticated && user.role === 'admin' && !location.pathname.includes('/admin')) {
              return <Navigate to="/admin"/>
           }
             return  <Fragment>{element}</Fragment>
}