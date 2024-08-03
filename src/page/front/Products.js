import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";


function Products() {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [isLoading, setLoaging] = useState(false);

    const getProducts = async (page = 1) => {
        setLoaging(true);
        const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`);
        console.log(productRes);
        setProducts(productRes.data.products);
        setPagination(productRes.data.pagination);
        setLoaging(false);
    }
    useEffect(() => {
        getProducts(1);
    }, [])
    return (
        <div className="container mt-md-5 mt-3 mb-7">
           <Loading isLoading={isLoading}></Loading>
            <div className="row">
                {products.map((product) => {
                    return (
                        <div key={product.id} className="col-md-3">
                            <div className="card border-0 mb-4 position-relative position-relative">
                                <img
                                    height={300}
                                    src={product.imageUrl} className="card-img-top rounded-0 object-cover" alt="..." />

                                <div className="card-body p-0">
                                    <h4 className="mb-0 mt-2"><Link to={`/product/${product.id}`}>{product.title}</Link></h4>
                                    <p className="card-text text-muted mb-0">{product.content}</p>
                                    <p className="text-muted mt-1">{product.price}</p>
                                </div>

                            </div>
                        </div>
                    )
                })}




            </div>
            <nav className="d-flex justify-content-center">
                <Pagination
                    pagination={pagination}
                    changePage={getProducts}>
                </Pagination>
            </nav>
        </div>
    )
}
export default Products;