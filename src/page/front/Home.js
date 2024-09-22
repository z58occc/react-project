import Carousel from "../../components/Carousel";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import { Link, useNavigate, } from "react-router-dom";
import heroImage from '../../heroImage.webp'

function Home() {


    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [searchWord, setSearchWord] = useState('');
    const mySearch = useRef();
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const randomNum = Math.floor(Math.random() * 6);



    const search = (e) => {
        setSearchWord(e.target.value);
    }


    const getArticles = async (page = 1) => {
        const articleRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/articles?page=${page}`);
        setArticles(articleRes.data.articles);
        setLoading(false);
    }



    const getProducts = async (page = 1) => {
        setLoading(true);
        const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`);
        setProducts(productRes.data.products);
    }
    const handleKeyEnter = (e) => {
        if (e.code == 'Enter') {
            navigate(`/products/${searchWord}`)
        }
    }
    useEffect(() => {
        getProducts(1);
        getArticles(1);
    }, [])
    return (
        <>

            <div className="container">
                <Loading isLoading={isLoading}></Loading>
                <div className="d-flex me-5 "
                    style={{
                        justifyContent: 'flex-end'
                    }}
                >

                </div>
                <div className="hero-image row flex-md-row-reverse flex-column m-5 mb-10">
                    <div className="col-md-8">
                        <img
                            src={heroImage} className="img-fluid object-cover"
                            style={{
                                height:'450px',
                            }}
                             />
                    </div>
                    <div className="col-md-4 d-flex flex-column justify-content-center mt-md-0 mt-3 ps-10">
                        <h5 className="font-weight-normal text-primary mt-2" >
                            這裡總有一款適合你的商品
                        </h5>
                        <div className=" mb-0 mt-3">
                            <div className="d-flex " role="search">
                                <input className="form-control w-50 me-2" type="search" placeholder="今天想來點..." aria-label="Search"
                                    onChange={search}
                                    ref={mySearch}
                                    onKeyUp={(e) => handleKeyEnter(e)}
                                />
                                <Link to={`/products/${searchWord}`} className="btn btn-outline-primary flex-shrink-0" type="submit"
                                >搜尋
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row flex-md-row-reverse flex-column mt-5"
                    style={{
                        display: 'flex',
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Carousel products={products} ></Carousel>
                </div>
                <div className="row m-5">
                    {products.slice(randomNum, randomNum + 4).map((product) => {
                        return (
                            <div className="col-md-6 mt-md-4" key={product.id}>
                                <div className="card border-0 mb-4 position-relative position-relative">
                                    <Link style={{ textDecoration: 'none' }} to={`./product/${product.id}`}>
                                        <img
                                            src={product.imageUrl}
                                            className="card-img-top rounded-0 object-cover"
                                            alt="..."
                                            style={{ height: "300px" }}
                                        />
                                        <div className="card-body p-0">
                                            <h4 className="mb-0 mt-4">{product.title}</h4>
                                            <div className="d-flex justify-content-between mt-3">
                                                <p className="product-description card-text text-muted mb-0 w-100">
                                                    {product.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}

                    <div className="container my-7">
                        <div className="row" >
                            {articles.slice(randomNum, randomNum + 3).map((article, i) => {
                                return (
                                    <div className="col-md-4" key={i}>
                                        <Link to={`/article/${article.id}`}>
                                            <img src={article.image} alt="" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                                        </Link>
                                        <Link to={`/article/${article.id}`}
                                            style={{
                                                textDecoration: 'none'
                                            }}>
                                            <h4 className="article-title mt-4">{article.title}</h4>
                                        </Link>
                                        <p className="home-article-description ">{article.description}</p>
                                    </div>
                                )
                            })}




                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;