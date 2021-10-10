import {useState, useEffect} from "react";
import defaultAxios from "axios";
// Axios: HTTPrequest를 만들어주기 위한 것

// ++++++++++++++++++useAXios++++++++++++++++++

const useAxios = (opts, axiosInstance = defaultAxios) => {
   const [state, setState ] = useState({
      loading: true,
      error:null,
      data:null
   });
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
   },[]);

   if(!opts.url){
      return;
   }
   return state;
};

export default useAxios;