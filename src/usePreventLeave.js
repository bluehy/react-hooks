import React from "react";

// +++++++++++++usePreventLeave++++++++++
const usePreventLeave = () => {
   const listener = (e) => {
     e.preventDefault();
     // 페이지를 나가기 전에 작동될 수 있게끔 해주고,
     e.returnValue = "";
     // 이 코드가 없는 경우, reload한 후에 해당 이벤트가 더 추가가 되지 않는다.
   }
   const enablePrevent = () => window.addEventListener("beforeunload", listener);
   const disablePrevent = () => window.removeEventListener("beforeunload", listener);
   return {enablePrevent, disablePrevent};
 };

 export default usePreventLeave;