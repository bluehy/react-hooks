import {useRef, useEffect} from "react";

  // ++++++++++Hooks_useClick++++++++++++++
  const useClick = (onClick) => {
   const element = useRef();
   useEffect(()=> {
     if(element.current){
       element.current.addEventListener("click", onClick);
     }
     // -> mount (deps가 없는 한 이벤트리스너가 계속 살아있게 됨. 이후 같은 동작이 이어지면 계속 추가된다.)
     return () => {
       if(element.current){
         element.current.removeEventListner("click", onClick);
       }
     }
     // -> unmount 되었을 때 이벤트리스너를 remove해주어야 이후 mount가 다시 시도되었을 떄 하나의 이벤트 리스너만 업데이트 된다.
   }, []);
   return element;
 }

 export default useClick;