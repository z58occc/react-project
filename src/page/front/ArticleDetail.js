import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import moment from "moment";

function ArticleDetail() {
    const [article, setArticle] = useState({});
    const { id } = useParams();
    const [articleNum, setArticleNum] = useState('');
    const [articleAll, setArticleAll] = useState([]);
    const [contentSize, setContentSize] = useState(false);

    const handleContentSize = (type) => {
        if (type) {
            setContentSize(true);
        } else {
            setContentSize(false);
        }
    }


    const getArticle = async (id) => {
        // setLoading(true);
        const articleRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/article/${id}`);
        setArticle(articleRes.data.article);
        console.log(articleRes.data.article);
        // setLoading(false);

        const articleAllRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/articles`)
        console.log(articleAllRes);
        setArticleAll(articleAllRes.data.articles);
        const articleArr = articleAllRes.data.articles;
        for (let index = 0; index < articleArr.length; index++) {
            if (articleArr[index].id == articleRes.data.article.id) {
                setArticleNum(articleArr[index].num)
                break;
            }
        }
    };


    useEffect(() => {
        getArticle(id);
    }, [id])
    return (
        <div className="container mb-5">
            <div>
                {article?.tag?.map((item, i) => {
                    return (
                        <button key={i} type="button" className="me-3  pt-0 pb-0  btn btn-secondary tag"
                            disabled
                        >
                            {item}
                        </button>
                    )
                })}
            </div>
            <div>
                <h1>
                    {article.title}
                </h1>
            </div>
            <div className="d-flex justify-content-between ">
                <big>
                    作者：{article.author} /{moment.unix(article.create_at).format('YYYY-MM-DD')}
                </big>
                <div className="me-10 ">
                        字級
                    <b style={{
                        fontSize: '25px'
                    }}
                        className="ms-2 me-1 font-size"
                        onClick={() => handleContentSize(true)}
                    >
                        A
                    </b>
                    <b className="font-size"
                        onClick={() => handleContentSize(false)}
                    >A</b>
                </div>
            </div>
            <hr />
            <div style={{
                fontSize: '20px'
            }}
                className="position-relative"
            >
                <div>
                    <img className="img-fluid object-cover w-100" src={article.image} alt=""
                        style={{
                            height: "500px"
                        }} />
                </div>
                <div className="mt-5"
                    style={{
                        fontSize: (contentSize ? '30px' : '20px')
                    }}
                >
                    {article.content}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus deserunt rerum earum doloribus! Vel dolore cupiditate recusandae et cumque, repellendus incidunt voluptatum nam odit perferendis distinctio nostrum sit facere earum.
                </div>
                <Link to={`/article`}>
                    <button className="btn btn-outline-secondary
                position-absolute botton-0 end-0    
                "
                    >回文章列表</button>
                </Link>
            </div>
            <div className="mt-7">
                <hr />
                <div className="row">
                    <div className="col">
                        <div className="d-flex justify-content-end me-5 text-primary">
                            <b>
                                PREVIOUS ARTICLE
                            </b>
                        </div>
                        <Link to={`/article/${articleAll[articleNum - 2]?.id}`}
                            style={{
                                textDecoration: 'none'
                            }}
                        >
                            <div className="d-flex justify-content-between me-5 ">
                                <i className="bi bi-chevron-double-left text-secondary"
                                    style={{ fontSize: '80px' }}
                                ></i>
                                <div className="mt-3 next-article text-black">
                                    {articleAll[articleNum - 2]?.title}
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col border-start border-black">
                        <div className="d-flex justify-content-start ms-5 text-primary">
                            <b>
                                NEXT ARTICLE
                            </b>
                        </div>
                        <Link to={`/article/${articleAll[articleNum]?.id}`}
                            style={{
                                textDecoration: 'none'
                            }}
                        >
                            <div className="d-flex justify-content-between ms-5 ">
                                <div className="mt-3 next-article text-black">
                                    {articleAll[articleNum]?.title}
                                </div>
                                <i className="bi bi-chevron-double-right text-secondary"
                                    style={{ fontSize: '80px' }}
                                ></i>
                            </div>
                        </Link>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default ArticleDetail