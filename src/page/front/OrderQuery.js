import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import { Modal } from "bootstrap";
import QueryModal from "../../components/QueryModal";
import Swal from "sweetalert2";

function OrderQuery() {
    const [order, setOrder] = useState({});
    const inputRef = useRef('');
    const [isLoading, setLoading] = useState(false);
    const queryModal = useRef(null);
    const handleKeyEnter = (e) => {
        if (e.code == 'Enter') {
            getOrder(inputRef.current.value.trim())
        }
    }


    const getOrder = async (id) => {
        setLoading(true);
        const orderRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/order/${id}`)
        if (orderRes.data.order == null) {
            setLoading(false);
            Swal.fire({
                title: "發生錯誤",
                html: "<small>找不到資料，請確認訂單編號是否正確</small>",
                icon: "error"
            });
            return
        }
        setOrder(orderRes.data.order);
        queryModal.current.show();
        console.log(orderRes);
        setLoading(false);
    }
    const closeQueryModal = () => {
        queryModal.current.hide();
    }
    useEffect(() => {
        queryModal.current = new Modal('#queryModal', {
            backdrop: 'static'
        })
    }, [])

    return (
        <div className="container vh-100 ">
            <Loading isLoading={isLoading}></Loading>
            <QueryModal
                tempOrder={order}
                closeOrderModal={closeQueryModal}
            ></QueryModal>
            <div className="row " >
                <span className="col-auto"
                    style={{
                        fontSize: "25px"
                    }}>
                    請輸入你的訂單編號：
                </span>
                <input type="text" className="col-auto col-form-control w-25" ref={inputRef}
                    onKeyUp={(e) => handleKeyEnter(e)}
                />
                <button type="button" className="col-auto ms-3 btn btn-outline-primary"
                    onClick={() => getOrder(inputRef.current.value.trim())}>查詢</button>
            </div>
        </div>
    )
}

export default OrderQuery