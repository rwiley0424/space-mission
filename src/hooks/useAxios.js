import React, { useState, useEffect } from 'react';
import axios from 'axios';

function useAxios() {
    // this hols the result of an API call
    const [data,setData] = useState(null)

        // this can tellother components that the axios call is still working
    const[loading,setLoading] = useState(false)

    // this holds the url from a component; gives us control over when the call occurs
    const[url, setUrl] = useState("")

    // this handles an error status based on the results of an axios call (failure to get wanted results)
    const[error,setError] = useState(false)

     // OPTIONAL: Set an API key using setAuth()
     const [auth, setAuth] = useState(null)

    async function customFetch(){
        try {
            let payload
            if(auth){
                payload = await axios.get(url, {
                    'Authorization': auth
                })
            } else {
                payload = await axios.get(url)
            }

            setData(payload.data)
            setLoading(false)
            setError(null)
        } catch (error) {
            if(error.response.status === 404){
                setError("data could not be found")
                setData(null)
                setLoading(false)
            }else{
                setError(error.message)
                setData(null)
                setLoading(false)
            }
        }
    }

    // on the ocmponent side, use 'setLoading(true)' to trigger this hook
    useEffect(()=>{
        if(loading){
            customFetch()
        }
    },[loading])


    return [setUrl, data, loading, setLoading, error,setAuth];
}

export default useAxios;