import axios from "axios";
import { useEffect, useState } from "react";

function Articles() {
    const [articles,setArticles]=useState([]);
    const getArticles = async () => {
        const articleRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/articles`);
        console.log(articleRes);
        setArticles(articleRes.data.articles);
        // setPagination(articleRes.data.pagination);
    }
    useEffect(()=>{
        getArticles();
    },[])
    return (
        <div className="vh-100 container">
            <div className="row">
                <div className="col-4">
                    <img className="img-fluid" src="https://images.theconversation.com/files/38926/original/5cwx89t4-1389586191.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=926&fit=clip" alt=""

                    />
                </div>
                <div className="col-8">
                    test
                </div>
            </div>
        </div>
    )
}

export default Articles