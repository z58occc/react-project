import axios from "axios";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../../slice/messageSlice";



function Cart() {
    const { cartData, getCart } = useOutletContext();
    const [loadingItems, setLoadingItem] = useState([]);
    const dispatch = useDispatch();

    const removeCartItem = async (id) => {
        try {
            const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`,)
            getCart();
            console.log(res);
        } catch (error) {
            console.log(error);
        }



    }
    const updateCartItem = async (item, quantity) => {
        const data = {
            data: {
                product_id: item.product_id,
                qty: quantity
            }
        };
        setLoadingItem([...loadingItems, item.id])
        try {
            const res = await axios.put(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`,
                data,
            )
            dispatch(createAsyncMessage(res.data));
            getCart();
            console.log(res);
            setLoadingItem(loadingItems.filter((loadingObject) => loadingObject !== item.id))
        } catch (error) {
            console.log(error);
            dispatch(createAsyncMessage(error.response.data));
            setLoadingItem(loadingItems.filter((loadingObject) => loadingObject !== item.id));

        }
    }
    const addFavorite = (item) => {
        const{product,id}=item
        console.log(product)
        let alreadyExists = false;
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        for (let index = 0; index < favorites.length; index++) {
            if (favorites[index].id == product.id) {
                alreadyExists = true;
                break;
            }
        }
        if (!alreadyExists) {
            favorites.push(product);
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        removeCartItem(id)
        


    }


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 bg-white py-5" style={{ minHeight: "calc(100vh - 56px - 76px)" }}>
                    <div className="d-flex justify-content-between">
                        <h2 className="mt-2"> 您的商品</h2>
                    </div>
                    {cartData?.carts?.map((item) => {
                        return (
                            <div className="d-flex mt-4 bg-light" key={item.id}>
                                <div>
                                    <img
                                        className="object-cover"
                                        src={item.product.imageUrl} alt="" style={{ width: "100px", height: '120px' }} />
                                </div>
                                <div className="w-100 p-3 position-relative ">
                                    <button
                                        type="button"
                                        className="position-absolute btn"
                                        style={{ top: "10px", right: "10px", }}
                                        onClick={() => { removeCartItem(item.id) }}
                                    >
                                        <i className="bi bi-x-circle-fill"></i>
                                    </button>
                                    <p className="mb-0 fw-bold">{item.product.title}</p>
                                    <p className="mb-1 text-muted" style={{ fontSize: "14px" }}>{item.product.description}</p>
                                    <div className="d-flex justify-content-between align-items-center w-100">
                                        <select name="" id="" className="form-select"
                                            value={item.qty}
                                            disabled={loadingItems.includes(item.id)}
                                            onChange={(e) => {
                                                updateCartItem(item, e.target.value * 1);
                                            }}
                                        >
                                            {[...(new Array(20))].map((i, num) => {
                                                return (
                                                    <option value={num + 1} key={num}>{num + 1}</option>
                                                )
                                            })
                                            }
                                        </select>
                                    </div>
                                    <p style={{ float: 'right' }} className="mb-0 ms-auto mt-3">NT$ {item.final_total}</p>
                                    <p style={{
                                        float: 'left',
                                        fontSize: '12px',
                                        textDecoration: 'underline',
                                        cursor: 'pointer'
                                    }}
                                        className="mb-0 ms-auto mt-3 text-secondary"
                                        onClick={() => addFavorite(item)}
                                    >
                                        放回下次再買
                                    </p>
                                </div>
                            </div>
                        )
                    })}

                    <div className="d-flex justify-content-between mt-4">
                        <p className="mb-0 h4 fw-bold"> 總金額</p>
                        <p className="mb-0 h4 fw-bold">NT$ {cartData.final_total}</p>
                    </div>
                    <NavLink to="./checkout" className="btn btn-dark w-100 mt-4 rounded-0 py-3">確認商品正確</NavLink>
                </div>
            </div>
        </div>
    )
}
export default Cart;