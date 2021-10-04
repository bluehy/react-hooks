import React from "react";
import ReactDOM from "react-dom";

  // ++++++++++++useConfirm++++++++++++++++++++
  // useEffect, useState를 사용하지 않는 함수형 function
const useConfirm = (message = "", onConfirm, onCancel) => {
   // onConfirm,onCancel이 존재하는지, function인지를 확인하는 단계
   if(!onConfirm || typeof onConfirm !== "function") {
     return;
     // 아무것도 return되지 않는 상태
      //   즉, onConfirm이 존재하고 function일 때만 onConfirm의 function이 작동하게 된다.
   }
   if(onCancel && typeof onCancel !== "function") {
      // onCancel은 없어도 되고, function이 아닌 경우 아무 작업도 일어나지 않는다.
      // onCancel이 있고, function인 경우에만 onCancel의 function 작업이 작동한다.
      return;
   }
//   if(typeof onConfirm !== "function"){
   //   return;
//   } 
   // 추가의견 : onConfirm이 없는 경우, typeof검사에서 undefined로 필터링되기 때문에 추가 조건없이 작성해줘도 된다.

   const confirmAction = () => {
     if(window.confirm(message)){
       onConfirm();
     }else{
        try{
           onCancel();
        }catch (error){
           return;
         }
         // onCancel의 존재유무는 실행의 필요조건이 아니기 때문에, onCancel이 없는 경우에 터질 에러를 예방.
     }
   };
   return confirmAction;
 };

 export default useConfirm;