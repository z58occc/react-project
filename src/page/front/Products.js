import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import { useParams } from "react-router-dom";


function Products() {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [isLoading, setLoading] = useState(false);
    const { searchWord } = useParams();
    const regex = new RegExp(searchWord, 'i');
    const [searchRes, setSearchRes] = useState(true);

    const getProductsAll = async () => {
        const productAllRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products/all`)
        const searchArr = productAllRes.data.products.filter((item) => regex.test(item.title));
        if (searchArr.length == 0) {
            setSearchRes(false);
        }
        setProducts(searchArr);
    }
    const getProducts = async (page = 1) => {
        setLoading(true);
        const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}  `);
        setProducts(productRes.data.products);
        setPagination(productRes.data.pagination);
        setLoading(false);
    }

    const hadleChangeType = async (e) => {
        setLoading(true);

        const { htmlFor } = e.target;
        const category = htmlFor;
        const typeRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?category=${category}`);
        console.log(typeRes.data.products);
        setProducts(typeRes.data.products);
        setLoading(false);
    }


    useEffect(() => {
        if (searchWord) {
            getProductsAll();
        } else {
            getProducts(1);
        }
    }, [searchWord])
    return (
        <div className="container mt-md-5 mt-3 mb-7 ">
            <Loading isLoading={isLoading}></Loading>
            <div className="btn-group mb-3" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" defaultChecked />
                <label className="btn btn-outline-primary" htmlFor="btnradio1"
                    onClick={getProducts}
                >全部</label>
                <input type="radio" className="btn-check" name="btnradio" id="gameConsole" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="gameConsole"
                    onClick={hadleChangeType}
                >遊戲主機</label>
                <input type="radio" className="btn-check" name="btnradio" id="controller" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="controller"
                    onClick={hadleChangeType}
                >遊戲手把</label>

                <input type="radio" className="btn-check" name="btnradio" id="apple" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="apple"
                    onClick={hadleChangeType}
                >蘋果</label>

                <input type="radio" className="btn-check" name="btnradio" id="others" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="others"
                    onClick={hadleChangeType}
                >其他</label>
            </div>
            {!searchRes
                ?
                <div className="text-center  mt-10 mb-10">
                    <h1><i className="bi bi-emoji-surprise-fill me-3"
                    style={{
                        fontSize:'80px'//  9/8待調整
                    }}
                    ></i>目前您的購物車沒有商品</h1>
                </div> :
                <div className="row">
                    {products.map((product) => {
                        return (
                            <div key={product.id} className="col-md-3">
                                <div className="card border-0 mb-4 position-relative position-relative">
                                    <Link style={{ textDecoration: 'none' }} to={`/product/${product.id}`}>
                                        <img
                                            height={300}
                                            src={product.imageUrl} className="card-img-top rounded-0 object-cover" alt="..." />

                                        <div className="card-body p-0">
                                            <h4 className="mb-0 mt-2 text-center">
                                                {product.title}
                                            </h4>
                                        </div>
                                    </Link>

                                </div>
                            </div>
                        )
                    })}
                </div>
            }

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