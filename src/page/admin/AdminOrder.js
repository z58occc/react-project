import axios from "axios";
import { useEffect, useRef, useState } from "react";
import OrderModal from "../../components/OrderModal";
import { Modal } from "bootstrap";
import Pagination from "../../components/Pagination";


function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [tempOrder,setTempOrder]=useState({})
    const orderModal = useRef(null);
    const [pagination, setPagination] = useState({});
    useEffect(() => {
        orderModal.current = new Modal('#orderModal', {
            backdrop: 'static'
        });
        
        getOrders();


    }, [])

    const openOrderModal = (order) => {
        orderModal.current.show();
        setTempOrder(order);
    }

    const closeOrderModal = () => {
        orderModal.current.hide();
    }

    const getOrders = async (page=1) => {
        const orderRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${page}`)
        console.log(orderRes);
        setOrders(orderRes.data.orders);
        setPagination(orderRes.data.pagination);
    }



    return (
        <>
            <OrderModal 
            orders={orders} 
            closeOrderModal={closeOrderModal}
            tempOrder={tempOrder}
            getOrders={getOrders}
            ></OrderModal>
            {/* Products */}
            <div className="p-3">
                <h3>訂單列表</h3>
                <hr />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">訂單id</th>
                            <th scope="col">購買用戶</th>
                            <th scope="col">訂單金額</th>
                            <th scope="col">付款狀態</th>
                            <th scope="col">付款日期</th>
                            <th scope="col">留言</th>
                            <th scope="col">編輯</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            return (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.user.email}</td>
                                    <td>{order.total}</td>
                                    <td>{order.is_paid.toString()}</td>
                                    <td>{order.is_paid.toString()}</td>
                                    <td></td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm"
                                            onClick={() => openOrderModal(order)}
                                        >
                                            查看
                                        </button>

                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>

                <Pagination pagination={pagination} changePage={getOrders} ></Pagination>
            </div>
            {/* Products end */}
        </>

    );
}

export default AdminOrders;