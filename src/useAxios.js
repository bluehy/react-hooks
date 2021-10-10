import {useState, useEffect} from "react";
import defaultAxios from "axios";
// Axios: make HTTPrequest

// ++++++++++++++++++useAXios++++++++++++++++++

const useAxios = (opts, axiosInstance = defaultAxios) => {
   const [state, setState ] = useState({
      loading: true,
      error:null,
      data:null
   });

   const [trigger, setTrigger ] = useState(0);
   const refetch = () => {
      setState({
         ...state,
         loading:true
      });
      setTrigger(new Date());
      // new Date task 랜덤한 숫자를 생성해냄.
   }

   useEffect(()=> {
      axiosInstance(opts).then(data =>{
         setState({
            ...state,
            loading: false,
            data
         });
      }).catch(error => {
         setState({...state, loading:false, error});
      });
   },[trigger]);
   // trigger가 바뀌면 useEffect가 자동으로 다시 실행됨.

   if(!opts.url){
      return;
   }
   return {...state, refetch};
};

export default useAxios;