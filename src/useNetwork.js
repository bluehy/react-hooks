import {useState, useEffect} from "react";

// +++++++++++++useNetwork+++++++++++++++
const useNetwork = onChange => {
   const [status, setStatus] = useState(navigator.onLine);
   const handleChange = () => {
     if(typeof onChange === "function"){
       onChange(navigator.onLine);
       // onChange function 수행
     }
     setStatus(navigator.onLine);
     // set status
   };
 
   useEffect(()=>{
     window.addEventListener("online", handleChange);
     window.addEventListener("offline", handleChange);
     return () => {
       window.removeEventListener("online", handleChange);
       window.removeEventListener("offline", handleChange);
     }
   },[]);
   // event발생한 대로 function 수행
 
   return status;
 };
 
 export default useNetwork;