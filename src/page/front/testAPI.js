import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function TestAPI() {
  const api = 'https://api.unsplash.com/search/photos/';
  const accessKey = 'Yo_kzLVGm0KQwhCmxu3UhDHNoL830EX5-z-7BUkhV2E';
  const filterString='animal'

  const [imgs,setImgs]=useState([]);


  
  const getPhoto=async()=>{
    const res=await axios.get(`https://api.unsplash.com/search/photos/?client_id=Yo_kzLVGm0KQwhCmxu3UhDHNoL830EX5-z-7BUkhV2E&query=handshake`)
    console.log(res);
    setImgs(res.data.results);
  }
   
  



  useEffect(() => {
    getPhoto();
  }, [])

  return (
    <div>
      <img src={imgs[5]?.urls?.regular} 
      className="border-triangle"
      alt="" />
      {/* {imgs?.map((img)=>{
        return(
          <img src={img.urls.regular}
          style={{width:'300px'}}
          ></img>
        )
      })} */}
    </div>
  )
}

export default TestAPI