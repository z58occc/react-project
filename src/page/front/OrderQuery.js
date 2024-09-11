import { useRef, useState } from "react";
import axios from "axios";
import moment from "moment";
import Loading from "../../components/Loading";

function OrderQuery() {
    const [order, setOrder] = useState({});
    const inputRef = useRef('');
    const [isLoading, setLoading] = useState(false);

    const getOrder = async (id) => {
        setLoading(true);
        const orderRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/order/${id}`)
        setOrder(orderRes.data.order);
        console.log(orderRes);
        setLoading(false);
    }

    return (
        <div className="container vh-100 ">
            <Loading isLoading={isLoading}></Loading>
            <div className="row " >
                <span className="col-auto ">
                    請輸入你的訂單編號：
                </span>
                <input type="text" className="col-auto col-form-control w-25" ref={inputRef} />
                <button type="button" className="col-auto ms-3 btn btn-outline-primary"
                    onClick={() => getOrder(inputRef.current.value.trim())}>查詢</button>
            </div>
            {!Object.keys(order).length == 0
                ?
                <div className="mt-5">
                    <div>
                        訂單編號：{order.id}
                    </div>
                    <div>
                        購買日期：{moment.unix(order.create_at).format('ll')}
                    </div>
                    <div>
                        總金額：{order.total}
                    </div>
                    <div>
                        訂單進度：{order.status}
                    </div>
                </div>
                :
                ''
            }

        </div>
    )
}

export default OrderQuery