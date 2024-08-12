import { useParams } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";

function Success() {
    const { orderId } = useParams();
    const [orderData, setOrderData] = useState({});


    const getCart = async () => {
        const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`,
        );
        console.log(res);
        setOrderData(res.data.order)
    }
    useEffect(() => {
        getCart();
    }, [orderId])
    return (
        <div className="container">
            <div style={{
                minHeight: "400px", backgroundImage: "url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)",
                backgroundPosition: "center center",
            }}>
            </div>
            <div className="mt-5 mb-7">
                <div className="row">
                    <div className="col-md-6">
                        <h2>購買成功</h2>
                        <p>親愛的顧客，

                            感謝您的購買！您的訂單已成功完成。

                            我們將盡快處理並安排發貨。您可以隨時通過我們的網站追蹤訂單狀態。如果您有任何問題或需要進一步的協助，請隨時聯繫我們的客服團隊。
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
                                                    <img src={item.product.imageUrl} alt="" className="me-2" style={{ width: "60px", height: "60px", objectFit: "cover" }} />
                                                    <div className="w-100 d-flex flex-column">
                                                        <div className="d-flex justify-content-between fw-bold">
                                                            <h5>{item.product.title}</h5>
                                                            <p className="mb-0">x{item.qty}</p>
                                                        </div>
                                                        <div className="d-flex justify-content-between mt-auto">
                                                            <p className="text-muted mb-0"><small>NT${item.product.price}</small></p>
                                                            <p className="mb-0">NT${item.total}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })}
                                    
                                    <li className="list-group-item px-0 pb-0">
                                        <table className="table text-muted">
                                            <tbody>
                                                {/* <tr>
                                                    <th scope="row" className="border-0 px-0 pt-0 font-weight-normal">Payment</th>
                                                    <td className="text-end border-0 px-0 pt-0">ApplePay</td>
                                                </tr> */}
                                            </tbody>
                                        </table>
                                        <div className="d-flex justify-content-between mt-2">
                                            <p className="mb-0 h4 fw-bold">總金額</p>
                                            <p className="mb-0 h4 fw-bold">NT${orderData?.total}</p>
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