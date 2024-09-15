import axios from "axios";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";

function Articles() {
    const [articles, setArticles] = useState([]);
    const [pagination, setPagination] = useState({});
    const [isLoading, setLoading] = useState(false);


    const getArticles = async (page = 1) => {
        setLoading(true);
        const articleRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/articles?page=${page}`);
        console.log(articleRes);
        setArticles(articleRes.data.articles);
        setPagination(articleRes.data.pagination);
        setLoading(false);
    }
    useEffect(() => {
        getArticles();
    }, [])
    return (
        <div className=" container mb-10">
            <Loading isLoading={isLoading}></Loading>
            {articles.map((article) => {
                return (
                    <div className="row mt-5" key={article.id}>
                        <div className="col-4">
                            <Link to={`/article/${article.id}`}
                                style={{
                                    textDecoration: 'none'
                                }}>
                                <img className="img-fluid" src={article.image} alt=""
                                />
                            </Link>
                        </div>
                        <div className="col-8">
                            <div>
                                <h3>
                                    <Link to={`/article/${article.id}`}
                                        style={{
                                            textDecoration: 'none'
                                        }}>
                                        {article.title}
                                    </Link>
                                </h3>
                            </div>
                            <div>
                                <small>
                                    作者：{article.author} /{moment.unix(article.create_at).format('YYYY-MM-DD')}
                                </small>
                            </div>
                            <div>
                                <big>
                                    {article.description}...
                                </big>
                            </div>
                        </div>
                    </div>
                )
            })}
            <nav className="d-flex justify-content-center mt-5">
                <Pagination
                    pagination={pagination}
                    changePage={getArticles}>
                </Pagination>
            </nav>
        </div>
    )
}

export default Articles