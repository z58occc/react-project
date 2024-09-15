import Carousel from "../../components/Carousel";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import { Link, useNavigate, } from "react-router-dom";


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
        console.log(articleRes);
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
                <div className="row flex-md-row-reverse flex-column m-5"
                    style={{
                        backgroundColor: 'black'
                    }}
                >

                    <div className="col-md-6">
                        <img
                            src="https://images.unsplash.com/photo-1527690789675-4ea7d8da4fe3?q=80&w=2892&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="img-fluid" />
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-center mt-md-0 mt-3 ps-10">
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
                    {products.slice(randomNum, randomNum+4).map((product) => {
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
                                                <p className="card-text text-muted mb-0 w-100">
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
                        <div className="row">
                            {articles.slice(randomNum, randomNum+2).map((article, i) => {
                                const isEven = i % 2 == 0;
                                return (
                                    <div key={i}>
                                        <div className={`row ${isEven ? '' : 'flex-row-reverse'}`}>
                                            <div className="col-md-6">
                                                <Link to={`/article/${article.id}`}>
                                                    <img src={article.image} alt="" className="img-fluid" />
                                                </Link>
                                            </div>
                                            <div className="col-md-4 m-auto text-center">
                                                <Link to={`/article/${article.id}`}
                                                    style={{
                                                        textDecoration: 'none'
                                                    }}>
                                                    <h4 className="mt-4">{article.title}</h4>
                                                </Link>
                                                <p className="text-muted">
                                                    {article.description}
                                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.</p>
                                            </div>
                                        </div>
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