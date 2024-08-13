import { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../../slice/messageSlice";


function ProdeuctDetail() {
    const [product, setProducts] = useState({});
    const [cartQuantity, setCartQuantity] = useState(1);
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const { getCart } = useOutletContext();
    const dispatch = useDispatch();

    const getProduct = async (id) => {
        const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`);
        console.log(productRes);
        setProducts(productRes.data.product);

    };

    const addToCart = async () => {
        const data = {
            data: {
                product_id: product.id,
                qty: cartQuantity,
            }
        }
        setIsLoading(true);
        try {
            const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
                data,
            );
            console.log(res);
            dispatch(createAsyncMessage(res.data));
            getCart();
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
            dispatch(createAsyncMessage(error.response.data));


        }

    }

    useEffect(() => {
        getProduct(id);
    }, [id])

    return (
        <>
            <div className="container">
                <div className="row  m-1">
                    <div className="col-md-8" >
                        <div className="row">
                            <img
                                src={`${product.imageUrl}`} className="img-fluid object-cover"
                                style={{
                                    height: '500px'
                                }}
                            />
                        </div>
                        <div className="row g-1 mt-1">
                            {product?.imagesUrl?.map((img) => {
                                return (
                                    <div className="col">
                                        <img src={`${img}`} className="w-100" alt="..."
                                            style={{
                                                height: '100px'
                                            }}
                                        />
                                    </div>
                                )
                            })}
                        </div>


                    </div>
                    <div className="col-md-4 d-flex flex-column  mt-3 ">
                        <div className="">
                            <div
                                style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                }}
                                to={`./product/${product?.id}`}
                            >
                                <h2 className="mb-0">{product.title}</h2>
                                <p className="fw-bold">NT$ {product.price}</p>
                                <p>{product.description}</p>
                                <div className="input-group mb-3 border mt-3">
                                    <div className="input-group-prepend">
                                        <button className="btn btn-outline-dark rounded-0 border-0 py-3" type="button" id="button-addon1"
                                            onClick={() => setCartQuantity((pre) => pre === 1 ? pre : pre - 1)}
                                        >
                                            <i className="bi bi-dash-circle"></i>
                                        </button>
                                    </div>
                                    <input
                                        value={cartQuantity}
                                        readOnly
                                        type="number" className="form-control border-0 text-center my-auto shadow-none" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-dark rounded-0 border-0 py-3" type="button" id="button-addon2"
                                            onClick={() => setCartQuantity((pre) => pre + 1)}
                                        >
                                            <i className="bi bi-plus-circle"></i>
                                        </button>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    href="./checkout.html" className="btn btn-dark w-100 rounded-0 py-3"
                                    onClick={() => addToCart()}
                                    disabled={isLoading}
                                >
                                    加入購物車
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* <div style={{
                    minHeight: "400px", backgroundImage: `url(${product.imageUrl})`,
                    backgroundPosition: "center center",
                    backgroundSize: 'cover',
                }}>
                </div> */}
                <div className="row justify-content-between mt-4 mb-7">
                    <div className="col-md-7">
                        {/* <h2 className="mb-0">{product.title}</h2>
                        <p className="fw-bold">NT$ {product.price}</p>
                        <p>{product.description}</p> */}
                        {/* <div className="my-4">
                            {product?.imagesUrl?.map((img, i) => {
                                return (
                                    <img src={img} style={{
                                        minHeight: "400px",
                                        width: "700px"
                                    }}
                                        key={i}
                                        className="object-cover mt-5"
                                        alt="" />
                                )
                            })}
                        </div> */}
                        <div className="accordion  mb-3" id="accordionExample">
                            <div className="card border-0">
                                <div className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0" id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                    <div className="d-flex justify-content-between align-items-center pe-1">
                                        <h4 className="mb-0">
                                            商品說明
                                        </h4>
                                        <i className="bi bi-dash"></i>
                                    </div>
                                </div>
                                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="card-body pb-5">
                                        {product.content}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* <div className="col-md-4">
                        <div className="input-group mb-3 border mt-3">
                            <div className="input-group-prepend">
                                <button className="btn btn-outline-dark rounded-0 border-0 py-3" type="button" id="button-addon1"
                                    onClick={() => setCartQuantity((pre) => pre === 1 ? pre : pre - 1)}
                                >
                                    <i className="bi bi-dash-circle"></i>
                                </button>
                            </div>
                            <input
                                value={cartQuantity}
                                readOnly
                                type="number" className="form-control border-0 text-center my-auto shadow-none" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                            <div className="input-group-append">
                                <button className="btn btn-outline-dark rounded-0 border-0 py-3" type="button" id="button-addon2"
                                    onClick={() => setCartQuantity((pre) => pre + 1)}
                                >
                                    <i className="bi bi-plus-circle"></i>
                                </button>
                            </div>
                        </div>
                        <button
                            type="button"
                            href="./checkout.html" className="btn btn-dark w-100 rounded-0 py-3"
                            onClick={() => addToCart()}
                            disabled={isLoading}
                        >
                            加入購物車
                        </button>
                    </div> */}
                </div>
            </div>
        </>
    )
}
export default ProdeuctDetail;