import { useOutletContext, useParams } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";

function Success() {
    const { orderId } = useParams();
    const [orderData, setOrderData] = useState({});
    const { getCart } = useOutletContext();




    const getOrder = async () => {
        const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`,
        );
        console.log(res);
        setOrderData(res.data.order)
    }



    useEffect(() => {
        getCart();
        getOrder();
    }, [orderId])
    return (
        <div className="container">
            <div
                className="object-cover "
                style={{
                    minHeight: "400px ",
                    backgroundImage: "url(https://images.unsplash.com/photo-1521791136064-7986c2920216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MjExMzl8MHwxfHNlYXJjaHw2fHxoYW5kc2hha2V8ZW58MHx8fHwxNzIzNjU1NTU5fDA&ixlib=rb-4.0.3&q=80&w=1080)",
                    backgroundPosition: "center center",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
            </div>
            <div className="mt-5 mb-7">
                <div className="row">
                    <div className="col-md-6">
                        <h1>購買成功</h1>
                        <h3>訂單編號：
                            <input type="text"
                                defaultValue={orderData.id}
                                disabled
                                className="w-50"
                            />
                        </h3>
                        <div>
                            <b className="text-primary">
                                您的訂單已成功完成，請記下您的訂單編號 ! ! !
                            </b>
                        </div>
                        <p> 以便隨時通過我們的網站追蹤訂單狀態。如果您有任何問題或需要進一步的協助，請隨時聯繫我們的客服團隊。
                            <br />
                            <br />

                            再次感謝您的支持！

                            祝您購物愉快！</p>
                        <a href="./index.html" className="btn btn-outline-dark me-2 rounded-0 mb-4">回到首頁</a>
                    </div>
                    <div className="col-md-6">
                        <div className="card rounded-0 py-4">
                            <div className="card-header border-bottom-0 bg-white px-4 py-0">
                                <h2> 選購商品細節</h2>
                            </div>
                            <div className="card-body px-4 py-0">
                                <ul className="list-group list-group-flush">
                                    {Object.values(orderData?.products || {}).map((item) => {
                                        return (

                                            <li className="list-group-item px-0" key={item.id}>
                                                <div className="d-flex mt-2">
                                                    <div>
                                                        <img src={item.product.imageUrl} alt="" className="me-2" style={{ width: "60px", height: "60px", objectFit: "cover" }} />
                                                    </div>
                                                    <div className="w-100 d-flex flex-column">
                                                        <div className="d-flex justify-content-between fw-bold">
                                                            <h5>{item.product.title}</h5>
                                                            <p className="mb-0">x{item.qty}</p>
                                                        </div>
                                                        <div className="d-flex justify-content-between mt-auto">
                                                            <p className="text-muted mb-0"><small>NT${item.product.price}</small></p>
                                                            <p className={`${item.total != item.final_total
                                                                ?
                                                                'text-secondary fs-7 text-decoration-line-through'
                                                                :
                                                                ''
                                                                }
                                                            mb-0`}>NT${item.total}</p>
                                                        </div>
                                                        <div className={`${item.total == item.final_total
                                                                ?
                                                                'd-none'
                                                                :
                                                                ''
                                                                }
                                                            text-end`}>
                                                            NT${item.final_total}
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })}

                                    <li className="list-group-item px-0 pb-0">
                                        <div className="d-flex justify-content-between mt-2">
                                            <p className="mb-0 h4 fw-bold">總金額</p>
                                            <p className="mb-0 h4 fw-bold">NT${orderData?.total}
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Success