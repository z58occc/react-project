import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function TestAPI() {
  
  const pay=async()=>{
    const res= await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/pay/-O75AkjRliB36gtDnUUM`)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
  }
   
  

  return (
    <div>
      <button onClick={pay}>
        test
      </button>
    </div>
  )
}

export default TestAPI