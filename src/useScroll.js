import React, {useState, useEffect} from "react";

// +++++useScroll+++++
const useScroll = () => {
   const [state, setState ] = useState({
     x: 0,
     y: 0
   });
 
   const onScroll = () => {
     console.log("y" , window.scrollY, "x" , window.scrollX);
     setState({
       x: window.scrollX,
       y: window.scrollY
     })
   };
 
   useEffect(() => {
     window.addEventListener("scroll", onScroll);
     return () => window.removeEventListener("scroll", onScroll);
     // event를 추가했으면, 같은 이름과 같은 handler로 지워주는 과정을 잊지 말것.
   });
 
   return state;
 };
 
 export default useScroll;