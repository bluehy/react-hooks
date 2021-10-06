import React, {useEffect} from "react";


// ++++++++++++useBeforeLeave+++++++++++++
const useBeforeLeave = (onBefore) => {
   const handle = (event) => {
     // console.log("leaving");
     // console.log(event);
     const { clientY } = event;
     if(clientY <= 0 ) {
       // 위로 벗어났을 때(clientY<=0)에만 function이 작동하게 된다.
       onBefore();
     }
   }
   useEffect(() => {
     document.addEventListener("mouseleave", handle);
     return () => document.removeEventListener("mouseleave",handle);
   },[]);
 
   if(typeof onBefore !== "function") {
     return;
   }
 };

 export default useBeforeLeave;