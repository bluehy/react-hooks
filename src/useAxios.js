import {useState, useEffect} from "react";
import defaultAxios from "axios";
// Axios: make HTTPrequest
// Axios allows you to create an instance, for example to set defaults like baseUrl, or headers,
// https://github.com/axios/axios#creating-an-instance

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
   // Trigger will re render that hook, use you change the state it will re render the whole component and maybe you don't want that.

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