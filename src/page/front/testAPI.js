import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function TestAPI() {
  const [tempData, setTempData] = useState({
    title: "",
    category: "",
    origin_price: 100,
    price: 300,
    unit: "",
    description: "",
    content: "",
    is_enabled: 1,
    imageUrl: "",
    imagesUrl: [
      '',
      '',
      '',
      '',
      ''
    ]

  });
  // setTempData({...tempData,imagesUrl:[

  // ]}

  // )
  const getToken = async () => {
    const TokenRes = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&grant_type=client_credentials`,);
    // console.log(TokenRes);
    // console.log(TokenRes.data.access_token);
    // const getImg = async () => {
    //   const ImgRes = await axios.post(`https://api.igdb.com/v4/games`, {
    //     headers: {
    //       "Client-ID": process.env.REACT_APP_CLIENT_ID,
    //       "Authorization": `Bearer ${TokenRes.data.access_token}`,
    //     },
    //     "body": "fields *;"
    //   }
    //   )
    //   console.log(ImgRes);
    // }
    fetch(
      "https://api.igdb.com/v4/age_ratings",
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          "Client-ID": process.env.REACT_APP_CLIENT_ID,
          "Authorization": `Bearer ${TokenRes.data.access_token}`,
        },
        body: "fields category,checksum,content_descriptions,rating,rating_cover_url,synopsis;"
      })
      .then(response => {
        console.log(response.json());
      })
      .catch(err => {
        console.error(err);
      });
    // getImg();
  }



  useEffect(() => {
    getToken();

  }, [])

  return (
    <div>TestAPI</div>
  )
}

export default TestAPI