import Carousel from "../../components/Carousel";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import { Link,useOutletContext } from "react-router-dom";


function Home() {


    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(false);







    const getProducts = async (page = 1) => {
        setLoading(true);
        const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`);
        setProducts(productRes.data.products);
        setLoading(false);

    }
    useEffect(() => {
        getProducts(1);
    }, [])
    return (
        <>

            <div className="container">
                <Loading isLoading={isLoading}></Loading>

                <div className="row flex-md-row-reverse flex-column"
                    style={{
                        display: 'flex',
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Carousel products={products} ></Carousel>
                </div>
                <div className="row m-5">
                    {products.slice(0, 4).map((product) => {
                        return (
                            <div className="col-md-6 mt-md-4" key={product.id}>
                                <div className="card border-0 mb-4 position-relative position-relative">
                                    <Link style={{textDecoration:'none'}} to={`./product/${product.id}`}>
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


                </div>
            </div>
        </>
    )
}
export default Home;